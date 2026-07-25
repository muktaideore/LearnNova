// function RoomHeader({ room, currentUserId, onLeaveRoom, onDeleteRoom, onRemoveMember }) {

//    const uniqueMembers = room.members
//       ? room.members.filter(
//            (member, index, self) =>
//               index === self.findIndex((m) => m._id === member._id)
//         )
//       : [];

//    const isHost = room.host?._id === currentUserId;

//    return (
//       <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

//          <div className="flex justify-between items-center flex-wrap gap-4">
//             <div>
//                <h1 className="text-3xl font-bold text-gray-800">
//                   📚 {room.roomName}
//                </h1>
//                <p className="text-gray-500 mt-2">
//                   {room.description || "No description available."}
//                </p>
//             </div>

//             <div className="text-right flex flex-col items-end gap-2">
//                <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-semibold">
//                   👤 Host: {room.host?.name || "Unknown"}
//                </div>

//                <div className="flex gap-2">
//                   {isHost ? (
//                      <button
//                         onClick={onDeleteRoom}
//                         className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
//                      >
//                         🗑 Delete Room
//                      </button>
//                   ) : (
//                      <button
//                         onClick={onLeaveRoom}
//                         className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
//                      >
//                         🚪 Leave Room
//                      </button>
//                   )}
//                </div>
//             </div>
//          </div>

//          <div className="mt-6 border-t pt-4">
//             <h3 className="font-bold text-lg mb-3">
//                👥 Members ({uniqueMembers.length})
//             </h3>

//             <div className="flex flex-wrap gap-3">
//                {uniqueMembers.length > 0 ? (
//                   uniqueMembers.map((member) => {
//                      const isMemberHost = member._id === room.host?._id;
//                      return (
//                         <div
//                            key={member._id}
//                            className="bg-gray-100 px-4 py-2 rounded-full shadow-sm flex items-center gap-2"
//                         >
//                            <span>{member.name}</span>

//                            {isHost && !isMemberHost && (
//                               <button
//                                  onClick={() => onRemoveMember(member._id)}
//                                  className="text-red-500 hover:text-red-700 text-xs font-bold"
//                                  title="Remove member"
//                               >
//                                  ✕
//                               </button>
//                            )}
//                         </div>
//                      );
//                   })
//                ) : (
//                   <p className="text-gray-500">No members have joined yet.</p>
//                )}
//             </div>
//          </div>

//       </div>
//    );
// }

// export default RoomHeader;

function RoomHeader({
   room,
   currentUserId,
   onLeaveRoom,
   onDeleteRoom,
   onRemoveMember,
}) {
   const uniqueMembers = room.members
      ? room.members.filter(
           (member, index, self) =>
              index ===
              self.findIndex(
                 (m) => m._id === member._id
              )
        )
      : [];

   const isHost =
      room.host?._id === currentUserId;

   return (
      <div className="rounded-2xl border border-[#B9DDDF] bg-white p-5 shadow-sm md:p-7">

         {/* TOP SECTION */}
         <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

            {/* ROOM INFORMATION */}
            <div className="flex gap-4">

               {/* ICON */}
               <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E8F5F5] text-2xl sm:flex">
                  📚
               </div>

               <div>

                  <div className="flex flex-wrap items-center gap-3">

                     <h1 className="text-2xl font-bold text-[#163B3D] md:text-3xl">
                        {room.roomName}
                     </h1>

                     {isHost && (
                        <span className="rounded-full bg-[#E8F5F5] px-3 py-1 text-xs font-semibold text-[#16838A]">
                           HOST
                        </span>
                     )}

                  </div>

                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base">
                     {room.description ||
                        "No description available."}
                  </p>

               </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col items-stretch gap-3 sm:items-end">

               {/* HOST */}
               <div className="flex items-center gap-3 rounded-xl border border-[#B9DDDF] bg-[#F4FAFA] px-4 py-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#16838A] text-sm font-bold text-white">
                     {room.host?.name
                        ?.charAt(0)
                        ?.toUpperCase() || "?"}
                  </div>

                  <div>

                     <p className="text-xs text-slate-400">
                        Hosted by
                     </p>

                     <p className="text-sm font-semibold text-[#163B3D]">
                        {room.host?.name ||
                           "Unknown"}
                     </p>

                  </div>

               </div>

               {/* ACTION BUTTON */}
               {isHost ? (

                  <button
                     onClick={onDeleteRoom}
                     className="rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                  >
                     🗑 Delete Room
                  </button>

               ) : (

                  <button
                     onClick={onLeaveRoom}
                     className="rounded-xl bg-[#E8F5F5] px-5 py-2.5 text-sm font-semibold text-[#16838A] transition hover:bg-[#D5EEEE]"
                  >
                     🚪 Leave Room
                  </button>

               )}

            </div>

         </div>


         {/* DIVIDER */}
         <div className="my-6 h-px bg-[#D9EEEE]"></div>


         {/* MEMBERS HEADER */}
         <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <div>

               <h3 className="text-lg font-bold text-[#163B3D]">
                  👥 Room Members
               </h3>

               <p className="text-sm text-slate-500">
                  {uniqueMembers.length}{" "}
                  {uniqueMembers.length === 1
                     ? "member"
                     : "members"}{" "}
                  in this study room
               </p>

            </div>

            <div className="w-fit rounded-full bg-[#E8F5F5] px-3 py-1 text-sm font-medium text-[#16838A]">
               {uniqueMembers.length} Members
            </div>

         </div>


         {/* MEMBERS */}
         {uniqueMembers.length > 0 ? (

            <div className="flex flex-wrap gap-3">

               {uniqueMembers.map((member) => {

                  const isMemberHost =
                     member._id ===
                     room.host?._id;

                  return (

                     <div
                        key={member._id}
                        className="group flex items-center gap-3 rounded-xl border border-[#D9EEEE] bg-[#F4FAFA] px-3 py-2.5 transition hover:border-[#16838A] hover:bg-[#E8F5F5]"
                     >

                        {/* AVATAR */}
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#16838A] text-sm font-bold text-white">
                           {member.name
                              ?.charAt(0)
                              ?.toUpperCase() ||
                              "?"}
                        </div>


                        {/* NAME */}
                        <div className="flex flex-col">

                           <span className="text-sm font-semibold text-[#163B3D]">
                              {member.name}
                           </span>

                           {isMemberHost && (

                              <span className="text-[11px] text-[#5C7779]">
                                 Room Host
                              </span>

                           )}

                        </div>


                        {/* REMOVE */}
                        {isHost &&
                           !isMemberHost && (

                              <button
                                 onClick={() =>
                                    onRemoveMember(
                                       member._id
                                    )
                                 }
                                 className="ml-1 flex h-6 w-6 items-center justify-center rounded-full text-slate-400 transition hover:bg-red-100 hover:text-red-600"
                                 title="Remove member"
                              >
                                 ✕
                              </button>

                           )}

                     </div>

                  );

               })}

            </div>

         ) : (

            <div className="rounded-xl border border-dashed border-[#B9DDDF] bg-[#F4FAFA] px-5 py-8 text-center">

               <p className="text-sm text-slate-500">
                  No members have joined yet.
               </p>

            </div>

         )}

      </div>
   );
}

export default RoomHeader;