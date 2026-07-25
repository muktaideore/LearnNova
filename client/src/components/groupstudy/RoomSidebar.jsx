// function RoomSidebar({
//    room,
//    onlineUsers,
//    inviteEmail,
//    setInviteEmail,
//    sendInvitation,
// }) {
//    return (
//       <div className="bg-white rounded-2xl shadow-lg p-5">

//          {/* Room Info */}
//          <div>
//             <h2 className="text-xl font-bold mb-4">
//                📖 Room Info
//             </h2>

//             <div className="space-y-3 text-gray-700">
//                <p>
//                   <strong>Room:</strong> {room.roomName}
//                </p>

//                <p>
//                   <strong>Host:</strong>{" "}
//                   {room.host?.name || "Unknown"}
//                </p>

//                <p>
//                   <strong>Total Members:</strong>{" "}
//                   {room.members?.length || 0}
//                </p>
//             </div>
//          </div>

//          {/* Online Users */}
//          <div className="mt-8">
//             <h2 className="text-xl font-bold mb-4">
//                🟢 Online Users ({onlineUsers.length})
//             </h2>

//             {onlineUsers.length === 0 ? (
//                <p className="text-gray-500">
//                   Nobody is online.
//                </p>
//             ) : (
//                <div className="space-y-3">
//                   {onlineUsers.map((user) => (
//                      <div
//                         key={user.userId}
//                         className="flex items-center justify-between bg-green-50 rounded-lg p-3"
//                      >
//                         <div className="flex items-center gap-2">
//                            <span className="w-3 h-3 rounded-full bg-green-500"></span>

//                            <span className="font-medium">
//                               {user.userName}
//                            </span>
//                         </div>

//                         {room.host?._id === user.userId && (
//                            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
//                               Host
//                            </span>
//                         )}
//                      </div>
//                   ))}
//                </div>
//             )}
//          </div>

//          {/* Invite Member */}
//          <div className="mt-8">
//             <h2 className="text-xl font-bold mb-4">
//                📧 Invite Member
//             </h2>

//             <input
//                type="email"
//                placeholder="Enter email"
//                value={inviteEmail}
//                onChange={(e) => setInviteEmail(e.target.value)}
//                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             <button
//                onClick={sendInvitation}
//                className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
//             >
//                Send Invitation
//             </button>
//          </div>

//       </div>
//    );
// }

// export default RoomSidebar;

function RoomSidebar({
   room,
   onlineUsers,
   inviteEmail,
   setInviteEmail,
   sendInvitation,
}) {
   return (
      <div className="h-full bg-white p-5">

         {/* ROOM INFO */}
         <div>

            <div className="mb-4 flex items-center gap-3">

               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5F5] text-xl text-[#16838A]">
                  📖
               </div>

               <div>
                  <h2 className="text-lg font-bold text-slate-900">
                     Room Info
                  </h2>

                  <p className="text-xs text-slate-500">
                     Study room details
                  </p>
               </div>

            </div>

            <div className="space-y-3 rounded-xl border border-[#D5E7E8] bg-[#F4FAFA] p-4">

               <div className="flex items-start justify-between gap-3">
                  <span className="text-sm text-slate-500">
                     Room
                  </span>

                  <span className="max-w-[150px] text-right text-sm font-semibold text-slate-800">
                     {room.roomName}
                  </span>
               </div>

               <div className="h-px bg-[#D5E7E8]" />

               <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-500">
                     Host
                  </span>

                  <span className="text-sm font-semibold text-slate-800">
                     {room.host?.name || "Unknown"}
                  </span>
               </div>

               <div className="h-px bg-[#D5E7E8]" />

               <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-500">
                     Members
                  </span>

                  <span className="rounded-full bg-[#E8F5F5] px-2.5 py-1 text-xs font-bold text-[#16838A]">
                     {room.members?.length || 0}
                  </span>
               </div>

            </div>

         </div>


         {/* ONLINE USERS */}
         <div className="mt-8">

            <div className="mb-4 flex items-center justify-between">

               <div className="flex items-center gap-2">

                  <span className="relative flex h-3 w-3">
                     <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                     <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                  </span>

                  <h2 className="text-lg font-bold text-slate-900">
                     Online Users
                  </h2>

               </div>

               <span className="rounded-full bg-[#E8F5F5] px-2.5 py-1 text-xs font-bold text-[#16838A]">
                  {onlineUsers.length}
               </span>

            </div>

            {onlineUsers.length === 0 ? (

               <div className="rounded-xl border border-dashed border-[#B9D9DB] bg-[#F4FAFA] p-5 text-center">

                  <p className="text-sm text-slate-500">
                     Nobody is online.
                  </p>

               </div>

            ) : (

               <div className="space-y-2">

                  {onlineUsers.map((user) => (

                     <div
                        key={user.userId}
                        className="flex items-center justify-between rounded-xl border border-[#CDE6E7] bg-[#F4FAFA] p-3 transition hover:border-[#16838A] hover:bg-[#E8F5F5]"
                     >

                        <div className="flex min-w-0 items-center gap-3">

                           <div className="relative">

                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#16838A] text-sm font-bold text-white">
                                 {user.userName
                                    ?.charAt(0)
                                    ?.toUpperCase() || "U"}
                              </div>

                              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />

                           </div>

                           <span className="truncate text-sm font-semibold text-slate-800">
                              {user.userName}
                           </span>

                        </div>

                        {room.host?._id === user.userId && (
                           <span className="rounded-full bg-[#E8F5F5] px-2 py-1 text-[10px] font-bold text-[#16838A]">
                              Host
                           </span>
                        )}

                     </div>

                  ))}

               </div>

            )}

         </div>


         {/* INVITE MEMBER */}
         <div className="mt-8">

            <div className="mb-4 flex items-center gap-3">

               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5F5] text-xl text-[#16838A]">
                  📧
               </div>

               <div>
                  <h2 className="text-lg font-bold text-slate-900">
                     Invite Member
                  </h2>

                  <p className="text-xs text-slate-500">
                     Add someone to your study room
                  </p>
               </div>

            </div>

            <div className="rounded-xl border border-[#D5E7E8] bg-[#F4FAFA] p-3">

               <input
                  type="email"
                  placeholder="Enter email address"
                  value={inviteEmail}
                  onChange={(e) =>
                     setInviteEmail(e.target.value)
                  }
                  className="w-full rounded-xl border border-[#CDE6E7] bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#16838A] focus:ring-2 focus:ring-[#16838A]/20"
               />

               <button
                  onClick={sendInvitation}
                  className="mt-3 w-full rounded-xl bg-[#16838A] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#116B70] active:scale-[0.98]"
               >
                  ✉️ Send Invitation
               </button>

            </div>

         </div>

      </div>
   );
}

export default RoomSidebar;