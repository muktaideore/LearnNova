// function ChatBox({
//   messages,
//   message,
//   setMessage,
//   sendMessage,
//   onlineUsers,
//   currentUserId,
//   isHost,
//   onDeleteMessage,
//   onClearChat,
// }) {
//   return (
//     <div className="bg-white rounded-2xl shadow-lg h-full flex flex-col">
//       <div className="border-b p-4 flex justify-between items-start">
//         <div>
//           <h2 className="text-xl font-bold">💬 Group Chat</h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Online: {onlineUsers.length > 0 ? onlineUsers.map((u) => u.userName).join(", ") : "No users online"}
//           </p>
//         </div>

//         {isHost && messages.length > 0 && (
//           <button
//             onClick={onClearChat}
//             className="text-xs bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1.5 rounded-lg font-semibold"
//           >
//             Clear Chat
//           </button>
//         )}
//       </div>

//       <div className="flex-1 overflow-y-auto p-4 h-[400px]">
//         {messages.length === 0 ? (
//           <p className="text-gray-500 text-center mt-10">No messages yet.</p>
//         ) : (
//           messages.map((msg, index) => {
//             const isOwn = msg.sender?._id === currentUserId;
//             return (
//               <div key={msg._id || index} className="mb-3 p-3 rounded-lg bg-gray-100 group relative">
//                 <p className="font-semibold text-blue-700">
//                   {msg.sender?.name || msg.userName || "Unknown User"}
//                 </p>
//                 <p>{msg.message}</p>

//                 {isOwn && msg._id && (
//                   <button
//                     onClick={() => onDeleteMessage(msg._id)}
//                     className="absolute top-2 right-2 text-xs text-red-500 opacity-0 group-hover:opacity-100 transition"
//                   >
//                     ✕
//                   </button>
//                 )}
//               </div>
//             );
//           })
//         )}
//       </div>

//       <div className="border-t p-4 flex gap-2">
//         <input
//           type="text"
//           placeholder="Type a message..."
//           className="flex-1 border rounded-lg p-2 outline-none"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") sendMessage();
//           }}
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChatBox;

function ChatBox({
   messages,
   message,
   setMessage,
   sendMessage,
   onlineUsers,
   currentUserId,
   isHost,
   onDeleteMessage,
   onClearChat,
}) {
   return (
      <div className="flex h-full min-h-[500px] flex-col overflow-hidden rounded-2xl bg-white text-slate-900">

         {/* HEADER */}
         <div className="border-b border-[#D5E7E8] bg-gradient-to-br from-[#E8F5F5] via-white to-[#F4FAFA] p-5">

            <div className="flex items-start justify-between gap-3">

               <div>

                  {/* CHAT TITLE */}
                  <div className="flex items-center gap-3">

                     <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#16838A] text-xl text-white shadow-lg shadow-[#16838A]/20">
                        💬
                     </div>

                     <div>

                        <h2 className="text-lg font-bold text-slate-900">
                           Group Chat
                        </h2>

                        <p className="mt-0.5 text-xs text-slate-500">
                           {onlineUsers.length > 0
                              ? `${onlineUsers.length} ${
                                   onlineUsers.length === 1
                                      ? "person"
                                      : "people"
                                } online`
                              : "No users online"}
                        </p>

                     </div>

                  </div>


                  {/* ONLINE USERS */}
                  {onlineUsers.length > 0 && (

                     <div className="mt-4 flex flex-wrap gap-2">

                        {onlineUsers.map((user, index) => (

                           <div
                              key={user.userId || index}
                              className="flex items-center gap-1.5 rounded-full border border-[#B9D9DB] bg-[#E8F5F5] px-3 py-1.5 text-xs font-medium text-[#16838A]"
                           >

                              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

                              {user.userName}

                           </div>

                        ))}

                     </div>

                  )}

               </div>


               {/* CLEAR CHAT */}
               {isHost && messages.length > 0 && (

                  <button
                     onClick={onClearChat}
                     className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:border-rose-300 hover:bg-rose-100"
                  >
                     🗑 Clear
                  </button>

               )}

            </div>

         </div>


         {/* MESSAGES */}
         <div className="min-h-[350px] max-h-[500px] flex-1 space-y-3 overflow-y-auto bg-[#F4FAFA] p-4">

            {messages.length === 0 ? (

               <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">

                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#E8F5F5] text-3xl">
                     💬
                  </div>

                  <p className="font-semibold text-slate-700">
                     No messages yet
                  </p>

                  <p className="mt-1 max-w-[220px] text-xs leading-5 text-slate-500">
                     Start a conversation with your study group.
                  </p>

               </div>

            ) : (

               messages.map((msg, index) => {

                  const isOwn =
                     msg.sender?._id === currentUserId;

                  return (

                     <div
                        key={msg._id || index}
                        className={`group relative rounded-2xl border p-3.5 shadow-sm transition hover:shadow-md ${
                           isOwn
                              ? "border-[#B9D9DB] bg-gradient-to-br from-[#E8F5F5] to-[#F4FAFA]"
                              : "border-slate-200 bg-white"
                        }`}
                     >

                        {/* USER */}
                        <div className="flex items-center gap-2">

                           <div
                              className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold text-white ${
                                 isOwn
                                    ? "bg-[#16838A]"
                                    : "bg-slate-700"
                              }`}
                           >
                              {(
                                 msg.sender?.name ||
                                 msg.userName ||
                                 "U"
                              )
                                 .charAt(0)
                                 .toUpperCase()}
                           </div>

                           <div className="flex items-center gap-2">

                              <p className="text-xs font-bold text-slate-700">
                                 {msg.sender?.name ||
                                    msg.userName ||
                                    "Unknown User"}
                              </p>

                              {isOwn && (

                                 <span className="rounded-full bg-[#D8EEEE] px-2 py-0.5 text-[10px] font-semibold text-[#16838A]">
                                    You
                                 </span>

                              )}

                           </div>

                        </div>


                        {/* MESSAGE */}
                        <p className="mt-2 break-words pr-5 text-sm leading-relaxed text-slate-600">
                           {msg.message}
                        </p>


                        {/* DELETE MESSAGE */}
                        {isOwn && msg._id && (

                           <button
                              onClick={() =>
                                 onDeleteMessage(msg._id)
                              }
                              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg text-xs text-slate-400 opacity-0 transition group-hover:opacity-100 hover:bg-rose-100 hover:text-rose-600"
                              title="Delete message"
                           >
                              ✕
                           </button>

                        )}

                     </div>

                  );

               })

            )}

         </div>


         {/* INPUT */}
         <div className="border-t border-[#D5E7E8] bg-white p-4">

            <div className="flex items-center gap-2 rounded-2xl border border-[#CDE6E7] bg-[#F4FAFA] p-1.5 transition focus-within:border-[#16838A] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#16838A]/10">

               <input
                  type="text"
                  placeholder="Write a message..."
                  className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  value={message}
                  onChange={(e) =>
                     setMessage(e.target.value)
                  }
                  onKeyDown={(e) => {

                     if (e.key === "Enter") {
                        sendMessage();
                     }

                  }}
               />

               <button
                  onClick={sendMessage}
                  className="flex h-10 items-center gap-2 rounded-xl bg-[#16838A] px-4 text-sm font-semibold text-white shadow-md shadow-[#16838A]/20 transition hover:bg-[#116B70] active:scale-95"
               >
                  Send
                  <span>➤</span>
               </button>

            </div>

         </div>

      </div>
   );
}

export default ChatBox;