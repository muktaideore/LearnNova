// import {
//    LineChart,
//    Line,
//    XAxis,
//    YAxis,
//    CartesianGrid,
//    Tooltip,
//    ResponsiveContainer,
// } from "recharts";

// function StudyLineChart({ data }) {
//    return (
//       <div className="bg-white rounded-xl shadow p-5">

//          <h2 className="text-xl font-bold mb-4">
//             📈 Weekly Study Time
//          </h2>

//          <ResponsiveContainer
//             width="100%"
//             height={300}
//          >

//             <LineChart data={data}>

//                <CartesianGrid strokeDasharray="3 3" />

//                <XAxis dataKey="day" />

//                <YAxis />

//                <Tooltip />

//                <Line
//                   type="monotone"
//                   dataKey="minutes"
//                   stroke="#3B82F6"
//                   strokeWidth={3}
//                />

//             </LineChart>

//          </ResponsiveContainer>

//       </div>
//    );
// }

// export default StudyLineChart;

import {
   LineChart,
   Line,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
} from "recharts";

function StudyLineChart({ data }) {
   return (
      <div className="card bg-base-100 shadow-xl p-4 sm:p-5">

         <h2 className="text-xl font-bold mb-4 text-base-content">

            📈 Weekly Study Time

         </h2>

         <ResponsiveContainer
            width="100%"
            height={300}
         >

            <LineChart data={data}>

               <CartesianGrid strokeDasharray="3 3" />

               <XAxis dataKey="day" />

               <YAxis />

               <Tooltip />

               <Line
                  type="monotone"
                  dataKey="minutes"
                  stroke="#3B82F6"
                  strokeWidth={3}
               />

            </LineChart>

         </ResponsiveContainer>

      </div>
   );
}

export default StudyLineChart;