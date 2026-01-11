import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE = "http://localhost:8080/api";

const ExamPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [session, setSession] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [remainingMs, setRemainingMs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchExamAndSession = useCallback(async () => {
    try {
      setLoading(true);
      const [examRes, questionsRes] = await Promise.all([
        fetch(`${API_BASE}/exams/${examId}`),
        fetch(`${API_BASE}/quiz/${examId}/questions`),
      ]);
      const examData = await examRes.json();
      const questionsData = await questionsRes.json();
      setExam(examData);
      setQuestions(questionsData);

      const sessionRes = await fetch(`${API_BASE}/exam-sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": "demo-user",
        },
        body: JSON.stringify({
          examId: examData.id,
          durationMinutes: examData.durationMinutes,
        }),
      });
      const sessionData = await sessionRes.json();
      setSession(sessionData);
      setRemainingMs(sessionData.endsAt - Date.now());

      // initial proctoring events: fullscreen + visibility listeners
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }

      const handleVisibility = async () => {
        if (!sessionData.id) return;
        const type =
          document.visibilityState === "hidden"
            ? "VISIBILITY_HIDDEN"
            : "VISIBILITY_VISIBLE";
        await fetch(`${API_BASE}/proctor/events`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: sessionData.id, type }),
        });
      };

      document.addEventListener("visibilitychange", handleVisibility);

      window.addEventListener("blur", () => {
        if (!sessionData.id) return;
        fetch(`${API_BASE}/proctor/events`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: sessionData.id, type: "TAB_BLUR" }),
        });
      });

      navigator.mediaDevices
        ?.getUserMedia({ video: true, audio: true })
        .then(() => {
          fetch(`${API_BASE}/proctor/events`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId: sessionData.id,
              type: "WEBCAM_OK",
            }),
          });
        })
        .catch(() => {
          fetch(`${API_BASE}/proctor/events`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId: sessionData.id,
              type: "WEBCAM_DENIED",
            }),
          });
        });
    } catch (e) {
      setError("Failed to initialise exam session");
    } finally {
      setLoading(false);
    }
  }, [examId]);

  useEffect(() => {
    fetchExamAndSession();
  }, [fetchExamAndSession]);

  useEffect(() => {
    if (!session) return;
    const interval = setInterval(() => {
      const msLeft = session.endsAt - Date.now();
      setRemainingMs(msLeft);
      if (msLeft <= 0) {
        clearInterval(interval);
        handleSubmit(true);
      }
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const handleAnswerChange = (questionId, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    if (!session) return;
    fetch(`${API_BASE}/quiz/${examId}/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: session.id,
        questionId,
        selectedIndex: optionIndex,
      }),
    }).catch(() => {});
  };

  const handleSubmit = async (auto = false) => {
    if (!session || submitting) return;
    setSubmitting(true);
    try {
      await fetch(`${API_BASE}/exam-sessions/${session.id}/end`, {
        method: "POST",
      });
      await fetch(`${API_BASE}/violations/compute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: session.id }),
      });
      const res = await fetch(`${API_BASE}/results`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: session.id, examId }),
      });
      if (!res.ok) {
        throw new Error("Result calculation failed");
      }
      navigate(`/results/${session.id}/${examId}`, {
        state: { autoSubmitted: auto },
      });
    } catch (e) {
      setError("Failed to submit exam. Please contact support.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-slate-200">
        Loading exam…
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-red-400">
        {error || "Exam not found"}
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pt-20 pb-10">
      <div className="mx-auto w-full max-w-5xl px-4 flex-1 flex flex-col gap-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-400/80 mb-1">
              Live Proctored Session
            </p>
            <h1 className="text-2xl md:text-3xl font-bold">
              {exam.name}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-cyan-500/30 animate-pulse" />
              <div className="relative z-10 px-5 py-2 rounded-full bg-slate-900 border border-cyan-400/60 shadow-lg shadow-cyan-500/40 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-lg">
                  {minutes}:{seconds}
                </span>
              </div>
            </div>
          </div>
        </header>

        {error && (
          <div className="rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {currentQuestion && (
          <main className="flex flex-col lg:flex-row gap-6 flex-1">
            <section className="flex-1 rounded-2xl bg-slate-900/70 border border-slate-700/60 p-6 shadow-xl shadow-slate-900/60">
              <p className="text-xs text-slate-400 mb-2">
                Question {currentIndex + 1} of {questions.length}
              </p>
              <h2 className="text-lg md:text-xl font-semibold mb-4">
                {currentQuestion.text}
              </h2>
              <div className="space-y-3 mt-4">
                {currentQuestion.options.map((opt, idx) => {
                  const selected = answers[currentQuestion.id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() =>
                        handleAnswerChange(currentQuestion.id, idx)
                      }
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 ${
                        selected
                          ? "border-cyan-400 bg-cyan-500/10 text-cyan-100 shadow-lg shadow-cyan-500/20"
                          : "border-slate-700 bg-slate-900/60 hover:border-cyan-300/60 hover:bg-slate-900"
                      }`}
                    >
                      <span className="font-medium mr-2">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <aside className="w-full lg:w-64 flex flex-col gap-4">
              <div className="rounded-2xl bg-slate-900/70 border border-slate-700/60 p-4">
                <h3 className="text-sm font-semibold mb-3 text-slate-100">
                  Question Palette
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((q, idx) => {
                    const answered = answers[q.id] !== undefined;
                    const active = idx === currentIndex;
                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-8 w-8 rounded-full text-xs font-semibold flex items-center justify-center transition-all ${
                          active
                            ? "bg-cyan-500 text-slate-900 shadow-md shadow-cyan-500/40"
                            : answered
                            ? "bg-emerald-500/80 text-slate-900"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-900/70 border border-slate-700/60 p-4 flex flex-col gap-3">
                <p className="text-xs text-slate-400">
                  All actions are logged. Leaving fullscreen, switching tabs, or
                  denying camera may impact your score.
                </p>
                <button
                  onClick={() => handleSubmit(false)}
                  disabled={submitting}
                  className="mt-1 inline-flex items-center justify-center rounded-xl bg-emerald-500 text-slate-950 font-semibold px-4 py-2 text-sm hover:bg-emerald-400 transition-colors disabled:opacity-60"
                >
                  {submitting ? "Submitting…" : "Submit & Finish"}
                </button>
              </div>
            </aside>
          </main>
        )}
      </div>
    </div>
  );
};

export default ExamPage;


