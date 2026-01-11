import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8080/api";

const ResultPage = () => {
  const { sessionId, examId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await fetch(`${API_BASE}/results`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, examId }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to load result");
        }
        setResult(data);
      } catch (e) {
        setError("Unable to load result data.");
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [sessionId, examId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-slate-200">
        Calculating result…
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-red-400">
        {error || "Result not available"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col pt-24 pb-16">
      <div className="mx-auto w-full max-w-3xl px-4 space-y-8">
        <div className="rounded-3xl border border-emerald-400/60 bg-slate-900/80 shadow-2xl shadow-emerald-500/30 p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/80 mb-2">
              Exam Completed
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
              Your Performance
            </h1>
            {location.state?.autoSubmitted && (
              <p className="text-xs text-amber-300 mb-2">
                This exam was auto-submitted due to timer expiry or violations.
              </p>
            )}
            <div className="mt-6 grid grid-cols-2 gap-4 md:gap-6">
              <div className="rounded-2xl bg-slate-950/60 border border-slate-700/60 px-4 py-3">
                <p className="text-xs text-slate-400 mb-1">Final Score</p>
                <p className="text-2xl font-bold text-emerald-400">
                  {result.finalScore.toFixed(2)}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-950/60 border border-slate-700/60 px-4 py-3">
                <p className="text-xs text-slate-400 mb-1">Raw Score</p>
                <p className="text-xl font-semibold text-slate-100">
                  {result.rawScore.toFixed(2)}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-950/60 border border-slate-700/60 px-4 py-3">
                <p className="text-xs text-slate-400 mb-1">Attempted</p>
                <p className="text-xl font-semibold text-slate-100">
                  {result.attempted}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-950/60 border border-slate-700/60 px-4 py-3">
                <p className="text-xs text-slate-400 mb-1">Correct</p>
                <p className="text-xl font-semibold text-emerald-300">
                  {result.correct}
                </p>
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-slate-950/60 border border-slate-700/60 px-4 py-3">
              <p className="text-xs text-slate-400 mb-1">Violation Impact</p>
              <p className="text-sm text-slate-200">
                Proctoring score:{" "}
                <span className="font-semibold text-amber-300">
                  {result.violationScore}
                </span>{" "}
                (higher means more suspicious behaviour).
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={() => navigate("/exams")}
            className="inline-flex items-center justify-center rounded-xl border border-slate-600 bg-slate-900/80 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-800 transition-colors"
          >
            Back to Exams
          </button>
          <button
            onClick={() => navigate("/home")}
            className="inline-flex items-center justify-center rounded-xl bg-cyan-500 text-slate-950 px-4 py-2 text-sm font-semibold hover:bg-cyan-400 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;


