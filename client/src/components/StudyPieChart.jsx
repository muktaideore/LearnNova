// import {
//    PieChart,
//    Pie,
//    Cell,
//    Tooltip,
//    ResponsiveContainer,
// } from "recharts";

// const COLORS = [
//    "#3B82F6",
//    "#F97316",
//    "#10B981",
//    "#EC4899",
//    "#A855F7",
//    "#FACC15",
// ];

// function StudyPieChart({ data = [] }) {

//    return (
//       <div className="bg-white rounded-xl shadow p-5">

//          <h2 className="text-xl font-bold mb-4">
//             🥧 Course Distribution
//          </h2>

//          <ResponsiveContainer width="100%" height={320}>
//             <PieChart>

//                <Pie
//                   data={data}
//                   dataKey="minutes"
//                   nameKey="name"
//                   outerRadius={120}
//                   label
//                >

//                   {data.map((entry,index)=>(
//                      <Cell
//                         key={index}
//                         fill={COLORS[index % COLORS.length]}
//                      />
//                   ))}

//                </Pie>

//                <Tooltip />

//             </PieChart>
//          </ResponsiveContainer>

//       </div>
//    );
// }
// export default StudyPieChart;
import {
   PieChart,
   Pie,
   Cell,
   Tooltip,
   ResponsiveContainer,
} from "recharts";

const COLORS = [
   "#3B82F6",
   "#F97316",
   "#10B981",
   "#EC4899",
   "#A855F7",
   "#FACC15",
];

function StudyPieChart({ data = [] }) {

   return (
      <div className="card bg-base-100 shadow-xl p-4 sm:p-5">

         <h2 className="text-xl font-bold mb-4 text-base-content">

            🥧 Course Distribution

         </h2>

         <ResponsiveContainer width="100%" height={320}>

            <PieChart>

               <Pie
                  data={data}
                  dataKey="minutes"
                  nameKey="name"
                  outerRadius={120}
                  label
               >

                  {data.map((entry, index) => (

                     <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                     />

                  ))}

               </Pie>

               <Tooltip />

            </PieChart>

         </ResponsiveContainer>

      </div>
   );
}

export default StudyPieChart;