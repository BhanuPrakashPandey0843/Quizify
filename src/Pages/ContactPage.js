import React from "react";

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pt-20 pb-16">
      <div className="w-full max-w-5xl mx-auto px-4">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-3">Contact</p>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 bg-clip-text text-transparent">
            Talk to our team
          </h1>
          <p className="text-slate-300 mt-4 max-w-2xl">
            Need a custom exam workflow, proctoring rules, or integrations? Reach out and we’ll help you ship exam-grade assessments.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 shadow-xl shadow-slate-900/50">
            <h2 className="text-xl font-semibold mb-3 text-cyan-200">Message us</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1">Name</label>
                <input className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:border-cyan-400" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Email</label>
                <input type="email" className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:border-cyan-400" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Message</label>
                <textarea rows="4" className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:border-cyan-400" placeholder="Tell us what you need"></textarea>
              </div>
              <button type="button" className="w-full rounded-xl bg-cyan-500 text-slate-950 font-semibold py-2 hover:bg-cyan-400 transition-colors">
                Send
              </button>
            </form>
          </div>
          <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 shadow-xl shadow-slate-900/50 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-cyan-200">Quick links</h2>
            <div className="space-y-2 text-sm text-slate-300">
              <p>Support: support@quizify.local</p>
              <p>Sales: sales@quizify.local</p>
              <p>Security: security@quizify.local</p>
            </div>
            <div className="mt-4">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300 mb-2">Uptime & Status</p>
              <div className="flex items-center gap-2 rounded-xl bg-slate-800/70 border border-slate-700 px-3 py-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                All systems operational
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-300 mb-2">Escalation</p>
              <p className="text-sm text-slate-300">
                Critical exam incidents are auto-escalated to our on-call rotation with <span className="text-amber-200 font-semibold">15 min</span> SLA.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;


