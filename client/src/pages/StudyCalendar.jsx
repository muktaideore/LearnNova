

// import { useEffect, useState } from "react";
// import API from "../services/api";
// import CalendarHeatmap from "react-calendar-heatmap";
// import "react-calendar-heatmap/dist/styles.css";

// function StudyCalendar() {
//    const [calendarData, setCalendarData] = useState([]);

//    useEffect(() => {
//       fetchCalendar();
//    }, []);

//    const fetchCalendar = async () => {
//       try {
//          const res = await API.get("/study-calendar");

//          const values = res.data.map((item) => ({
//             date: item.date,
//             count: item.minutes,
//          }));

//          setCalendarData(values);
//       } catch (error) {
//          console.log(error);
//       }
//    };

//    const today = new Date();

//    const oneYearAgo = new Date();

//    oneYearAgo.setFullYear(today.getFullYear() - 1);

//    return (
//       <div className="min-h-screen bg-base-200 p-4 sm:p-6 md:p-10">

//          <div className="max-w-6xl mx-auto">

//             <div className="card bg-base-100 shadow-xl">

//                <div className="card-body p-4 sm:p-6 md:p-8">

//                   <div className="text-center mb-8">

//                      <h1 className="text-3xl sm:text-4xl font-bold text-base-content">

//                         📅 Study Calendar

//                      </h1>

//                      <p className="text-base-content/60 mt-2">

//                         Track your daily learning progress

//                      </p>

//                   </div>

//                   <div className="w-full overflow-x-auto">

//                      <CalendarHeatmap
//                         startDate={oneYearAgo}
//                         endDate={today}
//                         values={calendarData}
//                         showWeekdayLabels={true}
//                         gutterSize={4}
//                         classForValue={(value) => {
//                            if (!value) {
//                               return "color-empty";
//                            }

//                            if (value.count <= 30) {
//                               return "color-scale-1";
//                            }

//                            if (value.count <= 60) {
//                               return "color-scale-2";
//                            }

//                            if (value.count <= 120) {
//                               return "color-scale-3";
//                            }

//                            return "color-scale-4";
//                         }}
//                         tooltipDataAttrs={(value) => {
//                            if (!value || !value.date) {
//                               return {
//                                  "data-tip": "No Study",
//                               };
//                            }

//                            return {
//                               "data-tip": `${value.date} : ${value.count} Minutes`,
//                            };
//                         }}
//                      />

//                   </div>

//                   <div className="divider"></div>

//                   <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4">

//                      <div className="flex items-center gap-2">

//                         <div className="w-5 h-5 bg-base-300 rounded"></div>

//                         <span className="text-sm">

//                            No Study

//                         </span>

//                      </div>

//                      <div className="flex items-center gap-2">

//                         <div className="w-5 h-5 bg-green-200 rounded"></div>

//                         <span className="text-sm">

//                            1-30 min

//                         </span>

//                      </div>

//                      <div className="flex items-center gap-2">

//                         <div className="w-5 h-5 bg-green-400 rounded"></div>

//                         <span className="text-sm">

//                            31-60 min

//                         </span>

//                      </div>

//                      <div className="flex items-center gap-2">

//                         <div className="w-5 h-5 bg-green-600 rounded"></div>

//                         <span className="text-sm">

//                            61-120 min

//                         </span>

//                      </div>

//                      <div className="flex items-center gap-2">

//                         <div className="w-5 h-5 bg-green-900 rounded"></div>

//                         <span className="text-sm">

//                            120+ min

//                         </span>

//                      </div>

//                   </div>

//                </div>

//             </div>

//          </div>

//       </div>
//    );
// }

// export default StudyCalendar;

import { useEffect, useState } from "react";
import API from "../services/api";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

function StudyCalendar() {
   const [calendarData, setCalendarData] = useState([]);

   useEffect(() => {
      fetchCalendar();
   }, []);

   const fetchCalendar = async () => {
      try {
         const res = await API.get("/study-calendar");

         const values = res.data.map((item) => ({
            date: item.date,
            count: item.minutes,
         }));

         setCalendarData(values);
      } catch (error) {
         console.log(error);
      }
   };

   const today = new Date();

   const oneYearAgo = new Date();
   oneYearAgo.setFullYear(today.getFullYear() - 1);

   return (
      <div className="min-h-screen bg-[#080706] text-[#f5f0e8] relative overflow-hidden">

         {/* ================= BACKGROUND GLOW ================= */}

         <div className="fixed inset-0 pointer-events-none overflow-hidden">

            <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-[#c9a227]/10 blur-[140px]" />

            <div className="absolute top-1/3 -right-40 h-[420px] w-[420px] rounded-full bg-[#8b6f2f]/10 blur-[140px]" />

            <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-[#e6c875]/5 blur-[120px]" />

         </div>


         {/* ================= MAIN CONTENT ================= */}

         <main className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 md:px-10 lg:py-10">


            {/* ================= HEADER ================= */}

            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

               <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/10 text-2xl shadow-lg shadow-[#d4af37]/10">
                     📅
                  </div>

                  <div>

                     <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37]">
                        Learning activity
                     </p>

                     <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                        Study Calendar
                     </h1>

                     <p className="mt-1 text-sm text-[#9b958b]">
                        Build consistency. Track progress. Keep growing.
                     </p>

                  </div>

               </div>


               <div className="rounded-2xl border border-[#d4af37]/20 bg-[#15130f] px-5 py-4">

                  <p className="text-xs uppercase tracking-wider text-[#817a6d]">
                     Tracking period
                  </p>

                  <p className="mt-1 font-semibold text-[#e6c875]">
                     Last 365 Days
                  </p>

               </div>

            </div>


            {/* ================= MAIN CARD ================= */}

            <div className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#11100e] shadow-2xl">


               {/* CARD HEADER */}

               <div className="border-b border-white/[0.08] bg-gradient-to-r from-[#18150f] to-[#11100e] p-6 sm:p-8">

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                     <div>

                        <h2 className="text-xl font-semibold sm:text-2xl">
                           Your learning journey
                        </h2>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-[#938d82]">
                           Every square represents your daily study activity. The darker the square, the more time you invested in learning.
                        </p>

                     </div>


                     <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/10 text-3xl">
                        📈
                     </div>

                  </div>

               </div>


               {/* ================= HEATMAP ================= */}

               <div className="p-5 sm:p-8 md:p-10">

                  <div className="rounded-3xl border border-white/[0.06] bg-[#0b0a09] p-4 shadow-inner sm:p-6">

                     <div className="mb-5 flex items-center justify-between">

                        <div>

                           <p className="text-xs uppercase tracking-[0.2em] text-[#d4af37]">
                              Activity overview
                           </p>

                           <h3 className="mt-1 text-lg font-semibold">
                              Daily study consistency
                           </h3>

                        </div>

                        <span className="hidden rounded-full border border-[#d4af37]/20 bg-[#d4af37]/10 px-3 py-1 text-xs text-[#d4af37] sm:block">
                           365 DAYS
                        </span>

                     </div>


                     <div className="calendar-wrapper w-full overflow-x-auto pb-3">

                        <CalendarHeatmap
                           startDate={oneYearAgo}
                           endDate={today}
                           values={calendarData}
                           showWeekdayLabels={true}
                           gutterSize={4}

                           classForValue={(value) => {

                              if (!value) {
                                 return "color-empty";
                              }

                              if (value.count <= 30) {
                                 return "color-scale-1";
                              }

                              if (value.count <= 60) {
                                 return "color-scale-2";
                              }

                              if (value.count <= 120) {
                                 return "color-scale-3";
                              }

                              return "color-scale-4";

                           }}

                           tooltipDataAttrs={(value) => {

                              if (!value || !value.date) {

                                 return {
                                    "data-tip": "No Study",
                                 };

                              }

                              return {
                                 "data-tip": `${value.date} : ${value.count} Minutes`,
                              };

                           }}

                        />

                     </div>

                  </div>


                  {/* ================= LEGEND ================= */}

                  <div className="mt-8 rounded-2xl border border-white/[0.06] bg-[#15130f] p-5">

                     <div className="mb-4 flex items-center justify-between">

                        <h3 className="font-semibold">
                           Activity intensity
                        </h3>

                        <span className="text-xs text-[#817a6d]">
                           Minutes studied per day
                        </span>

                     </div>


                     <div className="flex flex-wrap gap-x-6 gap-y-4">

                        <Legend
                           color="bg-[#24211b]"
                           label="No Study"
                        />

                        <Legend
                           color="bg-[#77652d]"
                           label="1–30 min"
                        />

                        <Legend
                           color="bg-[#a88b3f]"
                           label="31–60 min"
                        />

                        <Legend
                           color="bg-[#d4af37]"
                           label="61–120 min"
                        />

                        <Legend
                           color="bg-[#f0d77a]"
                           label="120+ min"
                        />

                     </div>

                  </div>

               </div>

            </div>


            {/* ================= MOTIVATION CARD ================= */}

            <div className="mt-6 rounded-3xl border border-[#d4af37]/15 bg-gradient-to-r from-[#18150f] via-[#12100d] to-[#18150f] p-6 sm:p-8">

               <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#d4af37]/10 text-3xl">
                     ✨
                  </div>

                  <div>

                     <h2 className="text-lg font-semibold text-[#f0d77a]">
                        Consistency beats intensity.
                     </h2>

                     <p className="mt-1 text-sm leading-6 text-[#938d82]">
                        Even a small amount of focused study every day can create powerful long-term results.
                     </p>

                  </div>

               </div>

            </div>

         </main>


         {/* ================= CUSTOM HEATMAP STYLES ================= */}

         <style>{`

            .calendar-wrapper .react-calendar-heatmap {
               width: 100%;
               min-width: 700px;
            }

            .calendar-wrapper .react-calendar-heatmap text {
               fill: #817a6d;
               font-size: 10px;
            }

            .calendar-wrapper .react-calendar-heatmap rect {
               rx: 4;
               ry: 4;
               stroke: #11100e;
               stroke-width: 2;
            }

            .calendar-wrapper .react-calendar-heatmap .color-empty {
               fill: #24211b;
            }

            .calendar-wrapper .react-calendar-heatmap .color-scale-1 {
               fill: #77652d;
            }

            .calendar-wrapper .react-calendar-heatmap .color-scale-2 {
               fill: #a88b3f;
            }

            .calendar-wrapper .react-calendar-heatmap .color-scale-3 {
               fill: #d4af37;
            }

            .calendar-wrapper .react-calendar-heatmap .color-scale-4 {
               fill: #f0d77a;
            }

            .calendar-wrapper .react-calendar-heatmap rect:hover {
               stroke: #f0d77a;
               stroke-width: 2;
               filter: drop-shadow(0 0 6px rgba(212, 175, 55, 0.5));
               cursor: pointer;
            }

         `}</style>

      </div>
   );
}


// ================= LEGEND =================

function Legend({ color, label }) {

   return (

      <div className="flex items-center gap-2">

         <div
            className={`h-4 w-4 rounded-md ${color}`}
         />

         <span className="text-sm text-[#aaa398]">
            {label}
         </span>

      </div>

   );

}

export default StudyCalendar;