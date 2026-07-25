


// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import API from "../services/api";
// import socket from "../socket";

// import RoomHeader from "../components/groupstudy/RoomHeader";
// import RoomSidebar from "../components/groupstudy/RoomSidebar";
// import ChatBox from "../components/groupstudy/ChatBox";
// import VideoSyncPlayer from "../components/groupstudy/VideoSyncPlayer";
// import SharedNotes from "../components/groupstudy/SharedNotes";

// function GroupStudy() {

//    const [rooms, setRooms] = useState([]);

//    const [roomName, setRoomName] = useState("");

//    const [description, setDescription] = useState("");

//    const [selectedRoom, setSelectedRoom] =
//       useState(null);

//    const [messages, setMessages] =
//       useState([]);

//    const [message, setMessage] =
//       useState("");

//    const [onlineUsers, setOnlineUsers] =
//       useState([]);

//    const [inviteEmail, setInviteEmail] =
//       useState("");

//    const user =
//       JSON.parse(
//          localStorage.getItem("user")
//       );

//    const userName =
//       user?.name;

//    const { roomId } =
//       useParams();

//    const navigate =
//       useNavigate();


//    // ==========================================
//    // FETCH ROOMS
//    // ==========================================

//    useEffect(() => {

//       fetchRooms();

//    }, []);


//    const fetchRooms = async () => {

//       try {

//          const res =
//             await API.get(
//                "/group-study"
//             );

//          setRooms(
//             res.data
//          );

//       } catch (err) {

//          console.log(err);

//       }

//    };


//    // ==========================================
//    // OPEN INVITED ROOM
//    // ==========================================

//    useEffect(() => {

//       if (!roomId) return;

//       openInvitedRoom();

//    }, [roomId]);


//    const openInvitedRoom =
//       async () => {

//          try {

//             const roomRes =
//                await API.get(
//                   `/group-study/${roomId}`
//                );

//             setSelectedRoom(
//                roomRes.data
//             );

//             const chatRes =
//                await API.get(
//                   `/group-study/${roomId}/messages`
//                );

//             setMessages(
//                chatRes.data
//             );

//             socket.emit(
//                "join-room",
//                {
//                   roomId,
//                   userId: user?._id,
//                   userName,
//                }
//             );

//          } catch (err) {

//             console.log(err);

//          }

//       };


//    // ==========================================
//    // CREATE ROOM
//    // ==========================================

//    const createRoom =
//       async () => {

//          if (!roomName.trim()) {

//             alert(
//                "Please enter room name"
//             );

//             return;

//          }

//          try {

//             await API.post(
//                "/group-study",
//                {
//                   roomName,
//                   description,
//                }
//             );

//             setRoomName("");

//             setDescription("");

//             fetchRooms();

//          } catch (err) {

//             console.log(err);

//          }

//       };


//    // ==========================================
//    // JOIN ROOM
//    // ==========================================

//    const joinRoom =
//       (room) => {

//          navigate(
//             `/group-study/${room._id}`
//          );

//       };


//    // ==========================================
//    // LEAVE ROOM
//    // ==========================================

//    const handleLeaveRoom =
//       async () => {

//          if (!selectedRoom)
//             return;

//          try {

//             await API.put(
//                `/group-study/leave/${selectedRoom._id}`
//             );

//             socket.emit(
//                "leave-room",
//                {
//                   roomId:
//                      selectedRoom._id,

//                   userName,
//                }
//             );

//             setSelectedRoom(
//                null
//             );

//             navigate(
//                "/group-study"
//             );

//             fetchRooms();

//          } catch (err) {

//             alert(
//                err.response?.data?.message ||
//                "Failed to leave room"
//             );

//          }

//       };


//    // ==========================================
//    // DELETE ROOM
//    // ==========================================

//    const handleDeleteRoom =
//       async () => {

//          if (!selectedRoom)
//             return;

//          const confirmDelete =
//             window.confirm(
//                "Delete this room permanently?"
//             );

//          if (!confirmDelete)
//             return;

//          try {

//             await API.delete(
//                `/group-study/${selectedRoom._id}`
//             );

//             setSelectedRoom(
//                null
//             );

//             navigate(
//                "/group-study"
//             );

//             fetchRooms();

//          } catch (err) {

//             alert(
//                err.response?.data?.message ||
//                "Failed to delete room"
//             );

//          }

//       };


//    // ==========================================
//    // DELETE MESSAGE
//    // ==========================================

//    const handleDeleteMessage =
//       async (messageId) => {

//          if (!selectedRoom)
//             return;

//          try {

//             await API.delete(
//                `/group-study/${selectedRoom._id}/messages/${messageId}`
//             );

//             setMessages(
//                (prev) =>
//                   prev.filter(
//                      (m) =>
//                         m._id !== messageId
//                   )
//             );

//          } catch (err) {

//             alert(
//                err.response?.data?.message ||
//                "Failed to delete message"
//             );

//          }

//       };


//    // ==========================================
//    // CLEAR CHAT
//    // ==========================================

//    const handleClearChat =
//       async () => {

//          if (!selectedRoom)
//             return;

//          const confirmClear =
//             window.confirm(
//                "Clear all chat messages?"
//             );

//          if (!confirmClear)
//             return;

//          try {

//             await API.delete(
//                `/group-study/${selectedRoom._id}/messages`
//             );

//             setMessages([]);

//          } catch (err) {

//             alert(
//                err.response?.data?.message ||
//                "Failed to clear chat"
//             );

//          }

//       };


//    // ==========================================
//    // SEND INVITATION
//    // ==========================================

//    const sendInvitation =
//       async () => {

//          if (!selectedRoom) {

//             alert(
//                "Please open a room first"
//             );

//             return;

//          }

//          if (!inviteEmail.trim()) {

//             alert(
//                "Please enter email"
//             );

//             return;

//          }

//          try {

//             const res =
//                await API.post(
//                   "/invitation/send",
//                   {
//                      roomId:
//                         selectedRoom._id,

//                      receiverEmail:
//                         inviteEmail,
//                   }
//                );

//             alert(
//                res.data.message
//             );

//             setInviteEmail("");

//          } catch (err) {

//             alert(
//                err.response?.data?.message ||
//                "Invitation failed"
//             );

//          }

//       };


//    // ==========================================
//    // SOCKET EVENTS
//    // ==========================================

//    useEffect(() => {

//       socket.on(
//          "receive-message",
//          (data) => {

//             setMessages(
//                (prev) => [
//                   ...prev,
//                   data,
//                ]
//             );

//          }
//       );


//       socket.on(
//          "user-joined",
//          (data) => {

//             setMessages(
//                (prev) => [
//                   ...prev,
//                   data,
//                ]
//             );

//          }
//       );


//       socket.on(
//          "user-left",
//          (data) => {

//             setMessages(
//                (prev) => [
//                   ...prev,
//                   data,
//                ]
//             );

//          }
//       );


//       socket.on(
//          "online-users",
//          (users) => {

//             setOnlineUsers(
//                users
//             );

//          }
//       );


//       return () => {

//          socket.off(
//             "receive-message"
//          );

//          socket.off(
//             "user-joined"
//          );

//          socket.off(
//             "user-left"
//          );

//          socket.off(
//             "online-users"
//          );

//       };

//    }, []);


//    // ==========================================
//    // SEND MESSAGE
//    // ==========================================

//    const sendMessage =
//       () => {

//          if (!selectedRoom) {

//             alert(
//                "Please open a room"
//             );

//             return;

//          }

//          if (!message.trim())
//             return;

//          if (!user?._id) {

//             alert(
//                "Please login again"
//             );

//             return;

//          }

//          socket.emit(
//             "send-message",
//             {
//                roomId:
//                   selectedRoom._id,

//                senderId:
//                   user._id,

//                message,
//             }
//          );

//          setMessage("");

//       };


//    return (

//       <div className="min-h-screen bg-base-200">

//          {/* =====================================
//              HEADER
//          ====================================== */}

//          <div className="hero bg-primary text-primary-content">

//             <div className="hero-content text-center py-10">

//                <div className="max-w-2xl">

//                   <h1 className="text-3xl md:text-5xl font-bold">

//                      👥 Learnify Group Study

//                   </h1>

//                   <p className="py-4 text-base md:text-lg">

//                      Study together in real time
//                      with your friends.

//                   </p>

//                </div>

//             </div>

//          </div>


//          <div className="max-w-7xl mx-auto p-4 md:p-8">


//             {/* =====================================
//                 CREATE ROOM
//             ====================================== */}

//             <div className="card bg-base-100 shadow-xl">

//                <div className="card-body">

//                   <h2 className="card-title text-2xl">

//                      ➕ Create Study Room

//                   </h2>


//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

//                      <input
//                         type="text"
//                         placeholder="Room Name"
//                         value={roomName}
//                         onChange={(e) =>
//                            setRoomName(
//                               e.target.value
//                            )
//                         }
//                         className="input input-bordered w-full"
//                      />


//                      <input
//                         type="text"
//                         placeholder="Description"
//                         value={description}
//                         onChange={(e) =>
//                            setDescription(
//                               e.target.value
//                            )
//                         }
//                         className="input input-bordered w-full"
//                      />

//                   </div>


//                   <div className="card-actions mt-4">

//                      <button
//                         onClick={createRoom}
//                         className="btn btn-primary"
//                      >

//                         ➕ Create Room

//                      </button>

//                   </div>

//                </div>

//             </div>


//             {/* =====================================
//                 ROOM LIST
//             ====================================== */}

//             <div className="mt-10">

//                <h2 className="text-2xl font-bold mb-5">

//                   📚 Available Rooms

//                </h2>


//                {rooms.length === 0 ? (

//                   <div className="alert bg-base-100 shadow">

//                      <span>
//                         No Study Rooms Available
//                      </span>

//                   </div>

//                ) : (

//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//                      {rooms.map(
//                         (room) => (

//                            <div
//                               key={room._id}
//                               className="card bg-base-100 shadow-xl hover:shadow-2xl transition"
//                            >

//                               <div className="card-body">

//                                  <h2 className="card-title">

//                                     📖 {room.roomName}

//                                  </h2>


//                                  <p className="text-base-content/70">

//                                     {room.description ||
//                                        "No description available"}

//                                  </p>


//                                  <div className="flex gap-2 mt-3">

//                                     <div className="badge badge-primary">

//                                        👥{" "}
//                                        {room.members?.length ||
//                                           0} Members

//                                     </div>

//                                  </div>


//                                  <div className="card-actions mt-4">

//                                     <button
//                                        onClick={() =>
//                                           joinRoom(
//                                              room
//                                           )
//                                        }
//                                        className="btn btn-primary w-full"
//                                     >

//                                        🚀 Open Room

//                                     </button>

//                                  </div>

//                               </div>

//                            </div>

//                         )
//                      )}

//                   </div>

//                )}

//             </div>


//             {/* =====================================
//                 SELECTED ROOM
//             ====================================== */}

//             {selectedRoom && (

//                <div className="mt-10">


//                   <RoomHeader
//                      room={selectedRoom}
//                      currentUserId={user?._id}
//                      onLeaveRoom={handleLeaveRoom}
//                      onDeleteRoom={handleDeleteRoom}
//                   />


//                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">


//                      {/* SIDEBAR */}

//                      <div className="lg:col-span-3">

//                         <RoomSidebar
//                            room={selectedRoom}
//                            onlineUsers={onlineUsers}
//                            inviteEmail={inviteEmail}
//                            setInviteEmail={setInviteEmail}
//                            sendInvitation={sendInvitation}
//                         />

//                      </div>


//                      {/* VIDEO */}

//                      <div className="lg:col-span-6">

//                         <VideoSyncPlayer
//                            room={selectedRoom}
//                         />

//                      </div>


//                      {/* CHAT */}

//                      <div className="lg:col-span-3">

//                         <ChatBox
//                            messages={messages}
//                            message={message}
//                            setMessage={setMessage}
//                            sendMessage={sendMessage}
//                            onlineUsers={onlineUsers}
//                            currentUserId={user?._id}
//                            isHost={
//                               selectedRoom.host?._id ===
//                               user?._id
//                            }
//                            onDeleteMessage={
//                               handleDeleteMessage
//                            }
//                            onClearChat={
//                               handleClearChat
//                            }
//                         />

//                      </div>

//                   </div>


//                   {/* SHARED NOTES */}

//                   <div className="mt-6">

//                      <SharedNotes
//                         room={selectedRoom}
//                      />

//                   </div>

//                </div>

//             )}

//          </div>

//       </div>

//    );

// }

// export default GroupStudy;



import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../services/api";
import socket from "../socket";

import RoomHeader from "../components/groupstudy/RoomHeader";
import RoomSidebar from "../components/groupstudy/RoomSidebar";
import ChatBox from "../components/groupstudy/ChatBox";
import VideoSyncPlayer from "../components/groupstudy/VideoSyncPlayer";
import SharedNotes from "../components/groupstudy/SharedNotes";

function GroupStudy() {
   const [rooms, setRooms] = useState([]);
   const [roomName, setRoomName] = useState("");
   const [description, setDescription] = useState("");
   const [selectedRoom, setSelectedRoom] = useState(null);
   const [messages, setMessages] = useState([]);
   const [message, setMessage] = useState("");
   const [onlineUsers, setOnlineUsers] = useState([]);
   const [inviteEmail, setInviteEmail] = useState("");

   const user = JSON.parse(
      localStorage.getItem("user")
   );

   const userName = user?.name;

   const { roomId } = useParams();
   const navigate = useNavigate();

   // ==========================================
   // FETCH ROOMS
   // ==========================================

   useEffect(() => {
      fetchRooms();
   }, []);

   const fetchRooms = async () => {
      try {
         const res = await API.get(
            "/group-study"
         );

         setRooms(res.data);
      } catch (err) {
         console.log(err);
      }
   };

   // ==========================================
   // OPEN INVITED ROOM
   // ==========================================

   useEffect(() => {
      if (!roomId) return;

      openInvitedRoom();
   }, [roomId]);

   const openInvitedRoom = async () => {
      try {
         const roomRes = await API.get(
            `/group-study/${roomId}`
         );

         setSelectedRoom(roomRes.data);

         const chatRes = await API.get(
            `/group-study/${roomId}/messages`
         );

         setMessages(chatRes.data);

         socket.emit("join-room", {
            roomId,
            userId: user?._id,
            userName,
         });
      } catch (err) {
         console.log(err);
      }
   };

   // ==========================================
   // CREATE ROOM
   // ==========================================

   const createRoom = async () => {
      if (!roomName.trim()) {
         alert("Please enter room name");
         return;
      }

      try {
         await API.post("/group-study", {
            roomName,
            description,
         });

         setRoomName("");
         setDescription("");

         fetchRooms();
      } catch (err) {
         console.log(err);
      }
   };

   // ==========================================
   // JOIN ROOM
   // ==========================================

   const joinRoom = (room) => {
      navigate(`/group-study/${room._id}`);
   };

   // ==========================================
   // LEAVE ROOM
   // ==========================================

   const handleLeaveRoom = async () => {
      if (!selectedRoom) return;

      try {
         await API.put(
            `/group-study/leave/${selectedRoom._id}`
         );

         socket.emit("leave-room", {
            roomId: selectedRoom._id,
            userName,
         });

         setSelectedRoom(null);

         navigate("/group-study");

         fetchRooms();
      } catch (err) {
         alert(
            err.response?.data?.message ||
               "Failed to leave room"
         );
      }
   };

   // ==========================================
   // DELETE ROOM
   // ==========================================

   const handleDeleteRoom = async () => {
      if (!selectedRoom) return;

      const confirmDelete = window.confirm(
         "Delete this room permanently?"
      );

      if (!confirmDelete) return;

      try {
         await API.delete(
            `/group-study/${selectedRoom._id}`
         );

         setSelectedRoom(null);

         navigate("/group-study");

         fetchRooms();
      } catch (err) {
         alert(
            err.response?.data?.message ||
               "Failed to delete room"
         );
      }
   };

   // ==========================================
   // DELETE MESSAGE
   // ==========================================

   const handleDeleteMessage = async (
      messageId
   ) => {
      if (!selectedRoom) return;

      try {
         await API.delete(
            `/group-study/${selectedRoom._id}/messages/${messageId}`
         );

         setMessages((prev) =>
            prev.filter(
               (m) => m._id !== messageId
            )
         );
      } catch (err) {
         alert(
            err.response?.data?.message ||
               "Failed to delete message"
         );
      }
   };

   // ==========================================
   // CLEAR CHAT
   // ==========================================

   const handleClearChat = async () => {
      if (!selectedRoom) return;

      const confirmClear = window.confirm(
         "Clear all chat messages?"
      );

      if (!confirmClear) return;

      try {
         await API.delete(
            `/group-study/${selectedRoom._id}/messages`
         );

         setMessages([]);
      } catch (err) {
         alert(
            err.response?.data?.message ||
               "Failed to clear chat"
         );
      }
   };

   // ==========================================
   // SEND INVITATION
   // ==========================================

   const sendInvitation = async () => {
      if (!selectedRoom) {
         alert("Please open a room first");
         return;
      }

      if (!inviteEmail.trim()) {
         alert("Please enter email");
         return;
      }

      try {
         const res = await API.post(
            "/invitation/send",
            {
               roomId: selectedRoom._id,
               receiverEmail: inviteEmail,
            }
         );

         alert(res.data.message);

         setInviteEmail("");
      } catch (err) {
         alert(
            err.response?.data?.message ||
               "Invitation failed"
         );
      }
   };

   // ==========================================
   // SOCKET EVENTS
   // ==========================================

   useEffect(() => {
      const receiveMessage = (data) => {
         setMessages((prev) => [
            ...prev,
            data,
         ]);
      };

      const userJoined = (data) => {
         setMessages((prev) => [
            ...prev,
            data,
         ]);
      };

      const userLeft = (data) => {
         setMessages((prev) => [
            ...prev,
            data,
         ]);
      };

      const online = (users) => {
         setOnlineUsers(users);
      };

      socket.on(
         "receive-message",
         receiveMessage
      );

      socket.on(
         "user-joined",
         userJoined
      );

      socket.on(
         "user-left",
         userLeft
      );

      socket.on(
         "online-users",
         online
      );

      return () => {
         socket.off(
            "receive-message",
            receiveMessage
         );

         socket.off(
            "user-joined",
            userJoined
         );

         socket.off(
            "user-left",
            userLeft
         );

         socket.off(
            "online-users",
            online
         );
      };
   }, []);

   // ==========================================
   // SEND MESSAGE
   // ==========================================

   const sendMessage = () => {
      if (!selectedRoom) {
         alert("Please open a room");
         return;
      }

      if (!message.trim()) return;

      if (!user?._id) {
         alert("Please login again");
         return;
      }

      socket.emit("send-message", {
         roomId: selectedRoom._id,
         senderId: user._id,
         userName,
         message,
      });

      setMessage("");
   };

 return (

   <div className="min-h-screen bg-slate-50 text-slate-900">

      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">

         {/* =========================
             HERO SECTION
         ========================== */}

         <section className="relative mb-8 overflow-hidden rounded-[32px] bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-6 text-white shadow-2xl sm:p-10">

            {/* Decorative Background */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

            <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

               <div className="max-w-3xl">

                  <div className="mb-5 flex items-center gap-3">

                     <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl shadow-lg backdrop-blur-md">
                        👥
                     </div>

                     <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-indigo-100 backdrop-blur-md">
                        Collaborative Learning
                     </span>

                  </div>

                  <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">

                     Learn together.

                     <span className="block bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent">
                        Grow together.
                     </span>

                  </h1>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-indigo-100 sm:text-base">

                     Create a focused learning space, invite your friends,
                     watch videos together, chat in real time, and share notes.

                  </p>

               </div>


               {/* ROOM STAT */}

               <div className="flex w-full items-center gap-4 rounded-3xl border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur-xl sm:w-fit">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-3xl">
                     📚
                  </div>

                  <div>

                     <p className="text-xs font-semibold uppercase tracking-widest text-indigo-200">
                        Available Rooms
                     </p>

                     <p className="mt-1 text-4xl font-black">
                        {rooms.length}
                     </p>

                  </div>

               </div>

            </div>

         </section>


         {/* =========================
             CREATE ROOM
         ========================== */}

         <section className="mb-10 rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-8">

            <div className="mb-6 flex items-start gap-4">

               <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">
                  ✨
               </div>

               <div>

                  <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                     Start learning together
                  </p>

                  <h2 className="mt-1 text-2xl font-black text-slate-900">
                     Create a Study Room
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                     Create a private space for your group learning session.
                  </p>

               </div>

            </div>


            <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr_auto]">

               <input
                  type="text"
                  placeholder="Room name"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
               />

               <input
                  type="text"
                  placeholder="What will your group study?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
               />

               <button
                  onClick={createRoom}
                  className="h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-1 hover:from-indigo-700 hover:to-violet-700 active:scale-95"
               >
                  <span className="mr-2">+</span>
                  Create Room
               </button>

            </div>

         </section>


         {/* =========================
             ROOM HEADER
         ========================== */}

         <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>

               <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                  Your learning community
               </p>

               <h2 className="mt-2 text-3xl font-black text-slate-900">
                  Available Study Rooms
               </h2>

               <p className="mt-2 text-sm text-slate-500">
                  Choose a room and start collaborating with your group.
               </p>

            </div>

            <div className="w-fit rounded-full border border-indigo-200 bg-indigo-50 px-5 py-2 text-sm font-bold text-indigo-700">
               {rooms.length} {rooms.length === 1 ? "Room" : "Rooms"}
            </div>

         </div>


         {/* =========================
             EMPTY STATE
         ========================== */}

         {rooms.length === 0 ? (

            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-24 text-center shadow-sm">

               <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-3xl bg-indigo-100 text-5xl">
                  📚
               </div>

               <h2 className="text-2xl font-black text-slate-900">
                  No study rooms yet
               </h2>

               <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                  Create the first room and invite your friends to begin learning together.
               </p>

            </div>

         ) : (

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

               {rooms.map((room) => (

                  <article
                     key={room._id}
                     className="group flex flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:border-indigo-300 hover:shadow-2xl"
                  >

                     {/* CARD GRADIENT */}

                     <div className="h-2 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400" />

                     <div className="flex flex-1 flex-col p-6">

                        <div className="mb-6 flex items-start justify-between">

                           <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 text-3xl">
                              📖
                           </div>

                           <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">

                              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

                              Active

                           </span>

                        </div>


                        <h3 className="truncate text-xl font-black text-slate-900">
                           {room.roomName}
                        </h3>

                        <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
                           {room.description || "No description available"}
                        </p>


                        <div className="mt-6 flex items-center gap-3 text-sm font-medium text-slate-500">

                           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                              👥
                           </div>

                           <span>
                              {room.members?.length || 0} Members
                           </span>

                        </div>


                        <button
                           onClick={() => joinRoom(room)}
                           className="mt-7 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:from-indigo-700 hover:to-violet-700 hover:shadow-indigo-500/40 active:scale-[0.98]"
                        >

                           Open Study Room

                           <span className="text-lg transition-transform group-hover:translate-x-1">
                              →
                           </span>

                        </button>

                     </div>

                  </article>

               ))}

            </div>

         )}


         {/* =========================
             LIVE WORKSPACE
         ========================== */}

         {selectedRoom && (

            <section className="mt-12 rounded-[32px] border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-4 shadow-inner sm:p-6 lg:p-8">

               {/* WORKSPACE HEADER */}

               <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                  <div className="flex items-center gap-3">

                     <span className="h-3 w-3 animate-pulse rounded-full bg-emerald-500 shadow-lg shadow-emerald-400" />

                     <div>

                        <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                           Live Workspace
                        </p>

                        <h2 className="mt-1 text-xl font-black text-slate-900">
                           {selectedRoom.roomName}
                        </h2>

                     </div>

                  </div>


                  <div className="rounded-full border border-indigo-200 bg-white px-5 py-2 text-xs font-bold text-indigo-700 shadow-sm">
                     👥 {onlineUsers.length} Online Now
                  </div>

               </div>


               {/* ROOM HEADER */}

               <div className="mb-6 overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-lg">

                  <RoomHeader
                     room={selectedRoom}
                     currentUserId={user?._id}
                     onLeaveRoom={handleLeaveRoom}
                     onDeleteRoom={handleDeleteRoom}
                  />

               </div>


               {/* MAIN WORKSPACE */}

               <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">

                  {/* LEFT SIDEBAR */}

                  <aside className="xl:col-span-3">

                     <div className="h-full overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-lg">

                        <RoomSidebar
                           room={selectedRoom}
                           onlineUsers={onlineUsers}
                           inviteEmail={inviteEmail}
                           setInviteEmail={setInviteEmail}
                           sendInvitation={sendInvitation}
                        />

                     </div>

                  </aside>


                  {/* VIDEO */}

                  <main className="xl:col-span-6">

                     <div className="overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-lg">

                        <VideoSyncPlayer
                           room={selectedRoom}
                        />

                     </div>

                  </main>


                  {/* CHAT */}

                  <aside className="xl:col-span-3">

                     <div className="h-full min-h-[500px] overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-lg">

                        <ChatBox
                           messages={messages}
                           message={message}
                           setMessage={setMessage}
                           sendMessage={sendMessage}
                           onlineUsers={onlineUsers}
                           currentUserId={user?._id}
                           isHost={
                              selectedRoom.host?._id === user?._id
                           }
                           onDeleteMessage={handleDeleteMessage}
                           onClearChat={handleClearChat}
                        />

                     </div>

                  </aside>

               </div>


               {/* SHARED NOTES */}

               <div className="mt-6 overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-lg">

                  <SharedNotes
                     room={selectedRoom}
                  />

               </div>

            </section>

         )}

      </main>

   </div>

);

}

export default GroupStudy;