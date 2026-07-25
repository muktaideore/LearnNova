// import { useEffect, useState } from "react";
// import API from "../services/api";

// function Invitations() {

//    const [invites, setInvites] = useState([]);

//    useEffect(() => {

//       fetchInvitations();

//    }, []);

//    const fetchInvitations = async () => {

//       try {

//          const res = await API.get(
//             "/invitation/my-invitations"
//          );

//          setInvites(res.data);

//       } catch (error) {

//          console.log(error);

//       }

//    };

//    const acceptInvite = async (id) => {

//       try {

//          await API.put(
//             `/invitation/accept/${id}`
//          );

//          fetchInvitations();

//          alert("Invitation Accepted");

//       } catch (error) {

//          console.log(error);

//       }

//    };

//    const rejectInvite = async (id) => {

//       try {

//          await API.put(
//             `/invitation/reject/${id}`
//          );

//          fetchInvitations();

//       } catch (error) {

//          console.log(error);

//       }

//    };

//    return (

//       <div className="min-h-screen bg-gray-100 p-10">

//          <h1 className="text-4xl font-bold mb-8">

//             📩 My Invitations

//          </h1>

//          {

//             invites.length === 0 ?

//             (

//                <h2>No Invitations</h2>

//             )

//             :

//             (

//                invites.map((invite) => (

//                   <div

//                      key={invite._id}

//                      className="
//                         bg-white
//                         rounded-xl
//                         shadow
//                         p-6
//                         mb-5
//                      "

//                   >

//                      <h2 className="text-2xl font-bold">

//                         {invite.roomId.roomName}

//                      </h2>

//                      <p>

//                         Invited By :

//                         {invite.sender.name}

//                      </p>

//                      <div className="mt-4 flex gap-4">

//                         <button

//                            onClick={() =>
//                               acceptInvite(invite._id)
//                            }

//                            className="
//                               bg-green-600
//                               text-white
//                               px-5
//                               py-2
//                               rounded
//                            "

//                         >

//                            Accept

//                         </button>

//                         <button

//                            onClick={() =>
//                               rejectInvite(invite._id)
//                            }

//                            className="
//                               bg-red-600
//                               text-white
//                               px-5
//                               py-2
//                               rounded
//                            "

//                         >

//                            Reject

//                         </button>

//                      </div>

//                   </div>

//                ))

//             )

//          }

//       </div>

//    );

// }

// export default Invitations;

import { useEffect, useState } from "react";
import API from "../services/api";

function Invitations() {

   const [invites, setInvites] = useState([]);

   useEffect(() => {

      fetchInvitations();

   }, []);

   const fetchInvitations = async () => {

      try {

         const res = await API.get(
            "/invitation/my-invitations"
         );

         setInvites(res.data);

      } catch (error) {

         console.log(error);

      }

   };

   const acceptInvite = async (id) => {

      try {

         await API.put(
            `/invitation/accept/${id}`
         );

         fetchInvitations();

         alert("Invitation Accepted");

      } catch (error) {

         console.log(error);

      }

   };

   const rejectInvite = async (id) => {

      try {

         await API.put(
            `/invitation/reject/${id}`
         );

         fetchInvitations();

      } catch (error) {

         console.log(error);

      }

   };

   return (

      <div className="min-h-screen bg-base-200 p-4 sm:p-6 md:p-10">

         <div className="max-w-4xl mx-auto">

            <div className="mb-8">

               <h1 className="text-3xl sm:text-4xl font-bold text-base-content">

                  📩 My Invitations

               </h1>

               <p className="text-base-content/60 mt-2">

                  Manage your study group invitations

               </p>

            </div>

            {

               invites.length === 0 ?

               (

                  <div className="card bg-base-100 shadow-xl">

                     <div className="card-body items-center text-center py-16">

                        <div className="text-6xl mb-4">

                           📭

                        </div>

                        <h2 className="card-title text-2xl">

                           No Invitations

                        </h2>

                        <p className="text-base-content/60">

                           You don't have any pending invitations.

                        </p>

                     </div>

                  </div>

               )

               :

               (

                  <div className="space-y-5">

                     {

                        invites.map((invite) => (

                           <div

                              key={invite._id}

                              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"

                           >

                              <div className="card-body">

                                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                                    <div>

                                       <h2 className="card-title text-xl sm:text-2xl">

                                          🎓 {invite.roomId.roomName}

                                       </h2>

                                       <p className="text-base-content/70 mt-2">

                                          Invited By :

                                          <span className="font-semibold ml-1">

                                             {invite.sender.name}

                                          </span>

                                       </p>

                                    </div>

                                 </div>

                                 <div className="card-actions flex-col sm:flex-row gap-3 mt-4">

                                    <button

                                       onClick={() =>
                                          acceptInvite(invite._id)
                                       }

                                       className="btn btn-success text-white w-full sm:w-auto"

                                    >

                                       ✓ Accept

                                    </button>

                                    <button

                                       onClick={() =>
                                          rejectInvite(invite._id)
                                       }

                                       className="btn btn-error text-white w-full sm:w-auto"

                                    >

                                       ✕ Reject

                                    </button>

                                 </div>

                              </div>

                           </div>

                        ))

                     }

                  </div>

               )

            }

         </div>

      </div>

   );

}

export default Invitations;