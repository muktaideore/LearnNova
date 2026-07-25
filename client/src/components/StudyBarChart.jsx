// import {
//    ResponsiveContainer,
//    BarChart,
//    Bar,
//    XAxis,
//    YAxis,
//    Tooltip,
//    CartesianGrid,
// } from "recharts";

// function StudyBarChart({ data }) {
//    return (
//       <div className="bg-white rounded-xl shadow p-5">

//          <h2 className="text-xl font-bold mb-4">
//             📊 Monthly Study Time
//          </h2>

//          <ResponsiveContainer
//             width="100%"
//             height={300}
//          >

//             <BarChart data={data}>

//                <CartesianGrid strokeDasharray="3 3" />

//                <XAxis dataKey="month" />

//                <YAxis />

//                <Tooltip />

//                <Bar
//                   dataKey="minutes"
//                   fill="#10B981"
//                />

//             </BarChart>

//          </ResponsiveContainer>

//       </div>
//    );
// }

// export default StudyBarChart;

import {
   ResponsiveContainer,
   BarChart,
   Bar,
   XAxis,
   YAxis,
   Tooltip,
   CartesianGrid,
} from "recharts";

function StudyBarChart({ data }) {
   return (
      <div className="card bg-base-100 shadow-xl p-4 sm:p-5">

         <h2 className="text-xl font-bold mb-4 text-base-content">

            📊 Monthly Study Time

         </h2>

         <ResponsiveContainer
            width="100%"
            height={300}
         >

            <BarChart data={data}>

               <CartesianGrid strokeDasharray="3 3" />

               <XAxis dataKey="month" />

               <YAxis />

               <Tooltip />

               <Bar
                  dataKey="minutes"
                  fill="#10B981"
               />

            </BarChart>

         </ResponsiveContainer>

      </div>
   );
}

export default StudyBarChart;