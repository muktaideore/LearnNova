// import { useState, useEffect } from "react";

// function PomodoroTimer() {
//    const [time, setTime] = useState(25 * 60);
//    const [running, setRunning] = useState(false);

//    useEffect(() => {
//       let timer;

//       if (running && time > 0) {
//          timer = setInterval(() => {
//             setTime((prev) => prev - 1);
//          }, 1000);
//       }

//       return () => clearInterval(timer);
//    }, [running, time]);

//    const minutes = Math.floor(time / 60);
//    const seconds = time % 60;

//    return (
//       <div className="bg-white p-5 rounded shadow">
//          <h2 className="text-xl font-bold mb-3">
//             🍅 Pomodoro Timer
//          </h2>

//          <h1 className="text-5xl font-bold">
//             {String(minutes).padStart(2, "0")}:
//             {String(seconds).padStart(2, "0")}
//          </h1>

//          <div className="mt-4 flex gap-2">
//             <button
//                onClick={() => setRunning(true)}
//                className="bg-green-500 text-white px-4 py-2 rounded"
//             >
//                Start
//             </button>

//             <button
//                onClick={() => setRunning(false)}
//                className="bg-yellow-500 text-white px-4 py-2 rounded"
//             >
//                Pause
//             </button>

//             <button
//                onClick={() => {
//                   setTime(25 * 60);
//                   setRunning(false);
//                }}
//                className="bg-red-500 text-white px-4 py-2 rounded"
//             >
//                Reset
//             </button>
//          </div>
//       </div>
//    );
// }

// export default PomodoroTimer;

import { useState, useEffect } from "react";

function PomodoroTimer() {
   const [time, setTime] = useState(25 * 60);
   const [running, setRunning] = useState(false);

   useEffect(() => {
      let timer;

      if (running && time > 0) {
         timer = setInterval(() => {
            setTime((prev) => prev - 1);
         }, 1000);
      }

      return () => clearInterval(timer);
   }, [running, time]);

   const minutes = Math.floor(time / 60);
   const seconds = time % 60;

   return (
      <div className="rounded-3xl border border-[#D7E8E8] bg-white p-6 shadow-sm">

         {/* HEADER */}
         <div className="mb-5 flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E5F4F4] text-xl">
               🍅
            </div>

            <div>
               <h2 className="text-lg font-bold text-slate-800">
                  Pomodoro Timer
               </h2>

               <p className="text-xs text-slate-500">
                  Focus deeply and study smarter
               </p>
            </div>

         </div>


         {/* TIMER */}
         <div className="rounded-2xl border border-[#D7E8E8] bg-gradient-to-br from-[#F4FBFB] to-[#E7F5F5] py-7 text-center">

            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#16838A]">
               Focus Session
            </p>

            <h1 className="font-mono text-5xl font-black tracking-tight text-[#16838A] sm:text-6xl">
               {String(minutes).padStart(2, "0")}:
               {String(seconds).padStart(2, "0")}
            </h1>

            <p className="mt-3 text-xs text-slate-500">
               {running
                  ? "Stay focused. You've got this!"
                  : "Ready to start your focus session?"}
            </p>

         </div>


         {/* BUTTONS */}
         <div className="mt-5 grid grid-cols-3 gap-2">

            {/* START */}
            <button
               onClick={() => setRunning(true)}
               className="rounded-xl bg-[#16838A] px-3 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#16838A]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#126F75] hover:shadow-lg active:scale-95"
            >
               ▶ Start
            </button>


            {/* PAUSE */}
            <button
               onClick={() => setRunning(false)}
               className="rounded-xl border border-[#F0C98A] bg-[#FFF8EA] px-3 py-2.5 text-sm font-semibold text-[#A66A16] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FFF0D2] active:scale-95"
            >
               ⏸ Pause
            </button>


            {/* RESET */}
            <button
               onClick={() => {
                  setTime(25 * 60);
                  setRunning(false);
               }}
               className="rounded-xl border border-[#F0B8B8] bg-[#FFF3F3] px-3 py-2.5 text-sm font-semibold text-[#C04B4B] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FFE5E5] active:scale-95"
            >
               ↻ Reset
            </button>

         </div>

      </div>
   );
}

export default PomodoroTimer;