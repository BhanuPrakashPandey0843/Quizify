import React from "react";
import WhyQuizify from "../Components/WhyQuizify/WhyQuizify";
import SupportSection from "../Components/SupportSection/SupportSection";

const WhyPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pt-20 pb-16">
      <div className="w-full max-w-6xl mx-auto px-4">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-3">Why Quizify</p>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 bg-clip-text text-transparent">
            Built for exam-grade reliability and proctoring
          </h1>
          <p className="text-slate-300 mt-4 max-w-2xl">
            Zero-trust backend, microservices, real-time proctoring hooks, and server-side timers ensure fairness and integrity.
          </p>
        </header>
      </div>
      <WhyQuizify />
      <SupportSection />
    </div>
  );
};

export default WhyPage;


