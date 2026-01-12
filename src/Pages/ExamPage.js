import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const ExamPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [session, setSession] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchExamAndSession = useCallback(async () => {
    try {
      setLoading(true);
      const [examRes, questionsRes] = await Promise.all([
        api.get(`/exams/${examId}`),
        api.get(`/quiz/${examId}/questions`),
      ]);
      
      const examData = examRes.data;
      const questionsData = questionsRes.data;
      
      setExam(examData);
      setQuestions(questionsData);

      // Create session
      const sessionRes = await api.post("/sessions", {
        examId: examData.id,
        durationMinutes: examData.durationMinutes,
      });
      
      const sessionData = sessionRes.data;
      setSession(sessionData);

      // Initial proctoring events
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
      
      // ... existing proctoring logic ...
    } catch (e) {
      console.error(e);
      setError("Failed to initialise exam session. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [examId]);

  useEffect(() => {
    fetchExamAndSession();
  }, [fetchExamAndSession]);

  const handleOptionSelect = (questionId, optionId) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async () => {
    if (!window.confirm("Are you sure you want to submit?")) return;
    try {
      // Submit answers (if backend supports it, or just end session)
      // For now, just end session
      if (session) {
        await api.post(`/sessions/${session.id}/end`);
      }
      navigate("/dashboard"); // Or result page
    } catch (e) {
      alert("Failed to submit");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white bg-slate-900">Loading Exam...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500 bg-slate-900">{error}</div>;
  if (!exam || !questions.length) return <div className="min-h-screen flex items-center justify-center text-white bg-slate-900">No questions found.</div>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Header */}
      <header className="bg-slate-800 p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold text-cyan-400">{exam.name}</h1>
        <div className="flex items-center gap-4">
          <span className="bg-slate-700 px-3 py-1 rounded text-sm">
            Time Left: {session?.endsAt ? Math.max(0, Math.floor((session.endsAt - Date.now()) / 60000)) : 0} min
          </span>
          <button 
            onClick={handleSubmit}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white font-bold transition"
          >
            Submit Exam
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6 h-[calc(100vh-80px)]">
        {/* Sidebar - Question Palette */}
        <aside className="w-full md:w-64 bg-slate-800 rounded-xl p-4 overflow-y-auto">
          <h3 className="font-bold mb-4 text-gray-300">Questions</h3>
          <div className="grid grid-cols-4 gap-2">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-10 h-10 rounded-lg font-bold transition ${
                  currentIndex === idx 
                    ? "bg-cyan-500 text-white" 
                    : answers[q.id] 
                      ? "bg-green-600 text-white" 
                      : "bg-slate-700 text-gray-400 hover:bg-slate-600"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </aside>

        {/* Question Area */}
        <main className="flex-1 bg-slate-800 rounded-xl p-8 flex flex-col">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-6">
              <span className="text-cyan-400 mr-2">Q{currentIndex + 1}.</span>
              {currentQuestion.text}
            </h2>
            <div className="space-y-3">
              {currentQuestion.options && currentQuestion.options.map((opt) => (
                <label 
                  key={opt.id}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition ${
                    answers[currentQuestion.id] === opt.id 
                      ? "border-cyan-500 bg-cyan-500/10" 
                      : "border-slate-600 hover:border-slate-500"
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${currentQuestion.id}`}
                    value={opt.id}
                    checked={answers[currentQuestion.id] === opt.id}
                    onChange={() => handleOptionSelect(currentQuestion.id, opt.id)}
                    className="hidden"
                  />
                  <span className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                     answers[currentQuestion.id] === opt.id ? "border-cyan-500" : "border-slate-400"
                  }`}>
                    {answers[currentQuestion.id] === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />}
                  </span>
                  <span>{opt.text}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-6 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={currentIndex === questions.length - 1}
              className="px-6 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExamPage;
