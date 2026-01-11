import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8080/api";

const ExamDashboardPage = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await fetch(`${API_BASE}/exams`);
        const data = await res.json();
        setExams(data);
      } catch (e) {
        setError("Failed to load exams");
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pt-24 pb-16">
      <div className="w-full max-w-5xl px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 bg-clip-text text-transparent">
          Available Exams
        </h1>
        <p className="text-slate-300 mb-10 max-w-2xl">
          Choose an exam to start a fully proctored, server-controlled session.
        </p>
        {loading && <p className="text-slate-400">Loading exams…</p>}
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <div className="grid gap-6 md:grid-cols-2">
          {exams.map((exam) => (
            <button
              key={exam.id}
              onClick={() => navigate(`/exam/${exam.id}`)}
              className="group relative overflow-hidden rounded-2xl bg-slate-900/70 border border-slate-700/60 hover:border-cyan-400/80 transition-all duration-300 shadow-xl hover:shadow-cyan-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-sky-500/5 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-6 flex flex-col items-start">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-cyan-300 transition-colors">
                  {exam.name}
                </h2>
                <p className="text-sm text-slate-300 mb-3">
                  Duration: {exam.durationMinutes} minutes
                </p>
                <p className="text-xs text-slate-400">
                  Total Marks: {exam.totalMarks} · Negative marking enabled
                </p>
                <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 text-cyan-300 px-4 py-2 text-sm font-medium group-hover:bg-cyan-500/20">
                  Start Exam
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamDashboardPage;


