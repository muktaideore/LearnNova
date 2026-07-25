// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../services/api";

// function AcceptInvitation() {
//    const { id } = useParams();
//    const navigate = useNavigate();

//    const [loading, setLoading] = useState(true);
//    const [message, setMessage] = useState("Accepting invitation...");
//    const [roomId, setRoomId] = useState(null);

//    useEffect(() => {
//       acceptInvite();
//    }, []);

//    const acceptInvite = async () => {
//       try {
//          const res = await API.put(`/invitation/accept/${id}`);

//          setMessage("Invitation accepted successfully!");
//          setRoomId(res.data.roomId);

//          setTimeout(() => {
//             navigate(`/group-study/${res.data.roomId}`);
//          }, 1500);

//       } catch (err) {
//          console.log(err);
//          setMessage(
//             err.response?.data?.message || "Unable to accept invitation."
//          );
//       } finally {
//          setLoading(false);
//       }
//    };

//    return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//          <div className="bg-white p-8 rounded-xl shadow-lg w-[450px] text-center">
//             <h1 className="text-3xl font-bold mb-6">📚 Learnify</h1>

//             {loading ? (
//                <p className="text-lg text-blue-600">Accepting invitation...</p>
//             ) : (
//                <>
//                   <p className="text-lg mb-6">{message}</p>

//                   {roomId && (
//                      <button
//                         onClick={() => navigate(`/group-study/${roomId}`)}
//                         className="bg-blue-600 text-white px-6 py-2 rounded"
//                      >
//                         Open Study Room
//                      </button>
//                   )}
//                </>
//             )}
//          </div>
//       </div>
//    );
// }

// export default AcceptInvitation;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function AcceptInvitation() {

   const { id } = useParams();

   const navigate = useNavigate();

   const [loading, setLoading] = useState(true);

   const [message, setMessage] = useState(
      "Accepting invitation..."
   );

   const [roomId, setRoomId] = useState(null);


   useEffect(() => {

      acceptInvite();

   }, []);


   const acceptInvite = async () => {

      try {

         const res = await API.put(
            `/invitation/accept/${id}`
         );

         setMessage(
            "Invitation accepted successfully!"
         );

         setRoomId(res.data.roomId);


         setTimeout(() => {

            navigate(
               `/group-study/${res.data.roomId}`
            );

         }, 1500);


      } catch (err) {

         console.log(err);

         setMessage(
            err.response?.data?.message ||
            "Unable to accept invitation."
         );


      } finally {

         setLoading(false);

      }

   };


   return (

      <div className="
         min-h-screen
         flex
         items-center
         justify-center
         bg-base-200
         p-4
      ">

         <div className="
            card
            w-full
            max-w-md
            bg-base-100
            shadow-2xl
         ">

            <div className="
               card-body
               items-center
               text-center
            ">


               {/* Logo / Title */}

               <h1 className="
                  text-3xl
                  font-bold
                  text-primary
               ">

                  📚 Learnify

               </h1>


               {/* Loading */}

               {loading ? (

                  <div className="
                     flex
                     flex-col
                     items-center
                     gap-4
                     mt-6
                  ">

                     <span className="
                        loading
                        loading-spinner
                        loading-lg
                        text-primary
                     "></span>


                     <p className="
                        text-lg
                        text-base-content
                     ">

                        Accepting invitation...

                     </p>

                  </div>


               ) : (

                  <>

                     {/* Status Message */}

                     <div className={`
                        alert
                        mt-6
                        ${
                           roomId
                              ? "alert-success"
                              : "alert-error"
                        }
                     `}>

                        <span>

                           {message}

                        </span>

                     </div>


                     {/* Open Room Button */}

                     {roomId && (

                        <button
                           onClick={() =>
                              navigate(
                                 `/group-study/${roomId}`
                              )
                           }
                           className="
                              btn
                              btn-primary
                              mt-6
                           "
                        >

                           🚀 Open Study Room

                        </button>

                     )}

                  </>

               )}

            </div>

         </div>

      </div>

   );

}

export default AcceptInvitation;