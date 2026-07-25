import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Study Rooms",
      desc: "Create a room, invite your friends, and learn together in real time.",
      icon: "👥",
    },
    {
      title: "Synced Video",
      desc: "Watch YouTube, Vimeo, or any lecture together — perfectly in sync, always.",
      icon: "🎬",
    },
  
    {
      title: "Save Notes",
      desc: "One page, everyone's thoughts. Notes that live inside the room.",
      icon: "📝",
    },
    {
      title: "Streaks & Focus",
      desc: "Pomodoro timers and daily streaks that keep momentum, not pressure.",
      icon: "🔥",
    },
    {
      title: "Certificates",
      desc: "Finish a course, get proof. Simple as that.",
      icon: "🏆",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">

      {/* NAV */}
      <nav className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <span className="text-lg font-semibold tracking-tight">LearnNova</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-gray-300 hover:text-white transition"
            >
              Log in
            </button>
            <button
              onClick={() => navigate("/register")}
              className="text-sm bg-violet-600 hover:bg-violet-500 text-white font-medium px-4 py-2 rounded-lg transition"
            >
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs uppercase tracking-widest text-violet-400 font-medium mb-4">
            Study, out loud
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
            Nobody studies alone
            <span className="text-violet-400"> anymore.</span>
          </h1>
          <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-md">
            Learnova turns solo studying into a room full of people who
            actually show up — synced video, live notes, and a chat
            that doesn't go quiet.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={() => navigate("/register")}
              className="bg-violet-600 hover:bg-violet-500 text-white font-medium px-6 py-3 rounded-lg transition"
            >
              Start a room — free
            </button>
            <button
              onClick={() => navigate("/login")}
              className="text-gray-300 hover:text-white text-sm font-medium transition"
            >
              I already have an account →
            </button>
          </div>
        </div>

        {/* SIGNATURE: live room mockup */}
        <div className="relative">
          <div className="rounded-2xl border border-white/10 bg-[#111111] shadow-2xl overflow-hidden">

            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">React Study</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Live
                </span>
              </div>
              <div className="flex -space-x-2">
                {["M", "A", "R"].map((letter, i) => (
                  <div
                    key={i}
                    className="relative w-6 h-6 rounded-full bg-violet-600 border-2 border-[#111111] flex items-center justify-center text-[10px] font-semibold"
                  >
                    {letter}
                    <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border border-[#111111] animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            <div className="aspect-video bg-black/40 flex items-center justify-center relative">
              <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                <div className="w-0 h-0 border-l-[14px] border-l-white border-y-[9px] border-y-transparent ml-1" />
              </div>
              <span className="absolute bottom-3 left-3 text-[10px] text-gray-400 bg-black/50 px-2 py-1 rounded">
                synced for 3 people
              </span>
            </div>

            <div className="p-3 space-y-2 bg-[#0d0d0d]">
              <div className="flex items-start gap-2">
                <span className="text-[11px] font-medium text-violet-400 shrink-0">Aisha</span>
                <span className="text-[11px] text-gray-300">wait pause it for a sec</span>
              </div>
              <div className="flex items-start gap-2 opacity-60">
                <span className="text-[11px] font-medium text-emerald-400 shrink-0">Rohan</span>
                <span className="text-[11px] text-gray-300">on it 👍</span>
              </div>
            </div>

          </div>

          <div className="absolute -z-10 top-8 -right-8 w-64 h-64 bg-violet-600/20 blur-[100px] rounded-full" />
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="text-2xl font-semibold tracking-tight mb-2">
          Everything a study session needs
        </h2>
        <p className="text-gray-500 mb-10">No app-switching, no losing the thread.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-[#111111] p-6 hover:border-violet-500/30 transition"
            >
              <span className="text-2xl">{f.icon}</span>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/20 to-transparent p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Your next study session doesn't have to be alone.
          </h2>
          <button
            onClick={() => navigate("/register")}
            className="mt-6 bg-violet-600 hover:bg-violet-500 text-white font-medium px-6 py-3 rounded-lg transition"
          >
            Create your first room
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} Learnova</span>
          <div className="flex gap-6">
            <button onClick={() => navigate("/login")} className="hover:text-white transition">Log in</button>
            <button onClick={() => navigate("/register")} className="hover:text-white transition">Sign up</button>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Landing;