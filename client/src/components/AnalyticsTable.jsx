// function AnalyticsTable({ sessions = [] }) {

//    return (

//       <div className="bg-white rounded-xl shadow p-5">

//          <h2 className="text-xl font-bold mb-4">

//             📋 Recent Study Sessions

//          </h2>

//          <table className="w-full border">

//             <thead>

//                <tr className="bg-gray-200">

//                   <th className="border p-2">
//                      Course
//                   </th>

//                   <th className="border p-2">
//                      Video
//                   </th>

//                   <th className="border p-2">
//                      Minutes
//                   </th>

//                   <th className="border p-2">
//                      Date
//                   </th>

//                </tr>

//             </thead>

//             <tbody>

//                {sessions.map(
//                   (session, index) => (

//                      <tr key={index}>

//                         <td className="border p-2">
//                            {session.course}
//                         </td>

//                         <td className="border p-2">
//                            {session.video}
//                         </td>

//                         <td className="border p-2">
//                            {session.duration}
//                         </td>

//                         <td className="border p-2">
//                            {session.date}
//                         </td>

//                      </tr>

//                   )
//                )}

//             </tbody>

//          </table>

//       </div>

//    );
// }

// export default AnalyticsTable;

function AnalyticsTable({ sessions = [] }) {

   return (

      <div className="card bg-base-100 shadow-xl p-4 sm:p-5">

         <h2 className="text-xl font-bold mb-4 text-base-content">

            📋 Recent Study Sessions

         </h2>

         <div className="overflow-x-auto">

            <table className="table table-zebra w-full">

               <thead>

                  <tr>

                     <th>
                        Course
                     </th>

                     <th>
                        Video
                     </th>

                     <th>
                        Minutes
                     </th>

                     <th>
                        Date
                     </th>

                  </tr>

               </thead>

               <tbody>

                  {sessions.map(
                     (session, index) => (

                        <tr key={index}>

                           <td>
                              {session.course}
                           </td>

                           <td>
                              {session.video}
                           </td>

                           <td>
                              {session.duration}
                           </td>

                           <td>
                              {session.date}
                           </td>

                        </tr>

                     )
                  )}

               </tbody>

            </table>

         </div>

      </div>

   );
}

export default AnalyticsTable;