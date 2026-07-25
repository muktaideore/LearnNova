


// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../services/api";
// import socket from "../socket";

// import RoomHeader from "../components/groupstudy/RoomHeader";
// import RoomSidebar from "../components/groupstudy/RoomSidebar";
// import ChatBox from "../components/groupstudy/ChatBox";
// import VideoSyncPlayer from "../components/groupstudy/VideoSyncPlayer";
// import SharedNotes from "../components/groupstudy/SharedNotes";

// function StudyRoom() {
//    const { roomId } = useParams();
//    const navigate = useNavigate();

//    const [room, setRoom] = useState(null);
//    const [messages, setMessages] = useState([]);
//    const [message, setMessage] = useState("");
//    const [onlineUsers, setOnlineUsers] = useState([]);
//    const [inviteEmail, setInviteEmail] = useState("");

//    const user = JSON.parse(localStorage.getItem("user"));

//    const loadRoom = async () => {
//       try {
//          const roomRes = await API.get(`/group-study/${roomId}`);
//          setRoom(roomRes.data);

//          const chatRes = await API.get(`/group-study/${roomId}/messages`);
//          setMessages(chatRes.data);
//       } catch (err) {
//          console.log(err);
//       }
//    };

//    useEffect(() => {
//       loadRoom();
//    }, [roomId]);

//    useEffect(() => {
//       if (!user) return;

//       socket.emit("join-room", {
//          roomId,
//          userId: user._id,
//          userName: user.name,
//       });

//       return () => {
//          socket.emit("leave-room", {
//             roomId,
//             userName: user.name,
//          });
//       };
//    }, [roomId]);

//    useEffect(() => {
//       const receiveMessage = (data) => {
//          setMessages((prev) => [...prev, data]);
//       };

//       const userJoined = async (data) => {
//          setMessages((prev) => [...prev, data]);
//          const res = await API.get(`/group-study/${roomId}`);
//          setRoom(res.data);
//       };

//       const userLeft = async (data) => {
//          setMessages((prev) => [...prev, data]);
//          const res = await API.get(`/group-study/${roomId}`);
//          setRoom(res.data);
//       };

//       const online = (users) => {
//          setOnlineUsers(users);
//       };

//       socket.on("receive-message", receiveMessage);
//       socket.on("user-joined", userJoined);
//       socket.on("user-left", userLeft);
//       socket.on("online-users", online);

//       return () => {
//          socket.off("receive-message", receiveMessage);
//          socket.off("user-joined", userJoined);
//          socket.off("user-left", userLeft);
//          socket.off("online-users", online);
//       };
//    }, [roomId]);

//    const sendInvitation = async () => {
//       if (!inviteEmail.trim()) return;

//       try {
//          const res = await API.post("/invitation/send", {
//             roomId,
//             receiverEmail: inviteEmail,
//          });

//          alert(res.data.message);
//          setInviteEmail("");
//       } catch (err) {
//          alert(err.response?.data?.message || "Invitation failed");
//       }
//    };

//    const sendMessage = () => {
//       if (!message.trim()) return;

//       socket.emit("send-message", {
//          roomId,
//          senderId: user._id,
//          userName: user.name,
//          message,
//       });

//       setMessage("");
//    };

//    // ===============================
//    // Leave Room
//    // ===============================
//    const handleLeaveRoom = async () => {
//       try {
//          await API.put(`/group-study/leave/${roomId}`);
//          socket.emit("leave-room", { roomId, userName: user.name });
//          navigate("/group-study");
//       } catch (err) {
//          alert(err.response?.data?.message || "Failed to leave room");
//       }
//    };

//    // ===============================
//    // Delete Room (host only)
//    // ===============================
//    const handleDeleteRoom = async () => {
//       if (!window.confirm("Delete this room permanently? This cannot be undone.")) return;

//       try {
//          await API.delete(`/group-study/${roomId}`);
//          navigate("/group-study");
//       } catch (err) {
//          alert(err.response?.data?.message || "Failed to delete room");
//       }
//    };

//    // ===============================
//    // Delete Own Message
//    // ===============================
//    const handleDeleteMessage = async (messageId) => {
//       try {
//          await API.delete(`/group-study/${roomId}/messages/${messageId}`);
//          setMessages((prev) => prev.filter((m) => m._id !== messageId));
//       } catch (err) {
//          alert(err.response?.data?.message || "Failed to delete message");
//       }
//    };

//    // ===============================
//    // Clear Chat (host only)
//    // ===============================
//    const handleClearChat = async () => {
//       if (!window.confirm("Clear all chat messages for everyone?")) return;

//       try {
//          await API.delete(`/group-study/${roomId}/messages`);
//          setMessages([]);
//       } catch (err) {
//          alert(err.response?.data?.message || "Failed to clear chat");
//       }
//    };

//    if (!room) {
//       return (
//          <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">

//             <div className="card bg-base-100 shadow-xl">

//                <div className="card-body items-center text-center">

//                   <span className="loading loading-spinner loading-lg text-primary"></span>

//                   <h2 className="text-xl font-semibold mt-3">

//                      Loading Room...

//                   </h2>

//                </div>

//             </div>

//          </div>
//       );
//    }

//    const isHost = room.host?._id === user?._id;

//    const handleRemoveMember = async (memberId) => {
//       if (!window.confirm("Remove this member from the room?")) return;

//       try {
//          await API.put(`/group-study/remove/${roomId}/${memberId}`);
//          const res = await API.get(`/group-study/${roomId}`);
//          setRoom(res.data);
//       } catch (err) {
//          alert(err.response?.data?.message || "Failed to remove member");
//       }
//    };

//    return (

//       <div className="min-h-screen bg-base-200">
//    <div className="max-w-7xl mx-auto p-4 md:p-8">

//             <div className="rounded-box">

//                <RoomHeader
//                   room={room}
//                   currentUserId={user?._id}
//                   onLeaveRoom={handleLeaveRoom}
//                   onDeleteRoom={handleDeleteRoom}
//                   onRemoveMember={handleRemoveMember}
//                />

//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">

//                <div className="lg:col-span-3">

//                   <div className="card bg-base-100 shadow-xl h-full">

//                      <RoomSidebar
//                         room={room}
//                         onlineUsers={onlineUsers}
//                         inviteEmail={inviteEmail}
//                         setInviteEmail={setInviteEmail}
//                         sendInvitation={sendInvitation}
//                      />

//                   </div>

//                </div>

//                <div className="lg:col-span-6">

//                   <div className="card bg-base-100 shadow-xl overflow-hidden">

//                      <VideoSyncPlayer room={room} />

//                   </div>

//                </div>

//                <div className="lg:col-span-3">

//                   <div className="card bg-base-100 shadow-xl h-full">

//                      <ChatBox
//                         messages={messages}
//                         message={message}
//                         setMessage={setMessage}
//                         sendMessage={sendMessage}
//                         onlineUsers={onlineUsers}
//                         currentUserId={user?._id}
//                         isHost={isHost}
//                         onDeleteMessage={handleDeleteMessage}
//                         onClearChat={handleClearChat}
//                      />

//                   </div>

//                </div>

//             </div>

//             <div className="card bg-base-100 shadow-xl mt-6 overflow-hidden">

//                <SharedNotes room={room} />

//             </div>

//          </div>

//       </div>

//    );
// }

// export default StudyRoom;



import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import socket from "../socket";

import RoomHeader from "../components/groupstudy/RoomHeader";
import RoomSidebar from "../components/groupstudy/RoomSidebar";
import ChatBox from "../components/groupstudy/ChatBox";
import VideoSyncPlayer from "../components/groupstudy/VideoSyncPlayer";
import SharedNotes from "../components/groupstudy/SharedNotes";

function StudyRoom() {
   const { roomId } = useParams();
   const navigate = useNavigate();

   const [room, setRoom] = useState(null);
   const [messages, setMessages] = useState([]);
   const [message, setMessage] = useState("");
   const [onlineUsers, setOnlineUsers] = useState([]);
   const [inviteEmail, setInviteEmail] = useState("");

   const user = JSON.parse(
      localStorage.getItem("user")
   );

   // ===============================
   // LOAD ROOM
   // ===============================
   const loadRoom = async () => {
      try {
         const roomRes = await API.get(
            `/group-study/${roomId}`
         );

         setRoom(roomRes.data);

         const chatRes = await API.get(
            `/group-study/${roomId}/messages`
         );

         setMessages(chatRes.data);
      } catch (err) {
         console.log(err);
      }
   };

   useEffect(() => {
      loadRoom();
   }, [roomId]);

   // ===============================
   // JOIN ROOM
   // ===============================
   useEffect(() => {
      if (!user) return;

      socket.emit("join-room", {
         roomId,
         userId: user._id,
         userName: user.name,
      });

      return () => {
         socket.emit("leave-room", {
            roomId,
            userName: user.name,
         });
      };
   }, [roomId]);

   // ===============================
   // SOCKET EVENTS
   // ===============================
   useEffect(() => {
      const receiveMessage = (data) => {
         setMessages((prev) => [
            ...prev,
            data,
         ]);
      };

      const userJoined = async (data) => {
         setMessages((prev) => [
            ...prev,
            data,
         ]);

         const res = await API.get(
            `/group-study/${roomId}`
         );

         setRoom(res.data);
      };

      const userLeft = async (data) => {
         setMessages((prev) => [
            ...prev,
            data,
         ]);

         const res = await API.get(
            `/group-study/${roomId}`
         );

         setRoom(res.data);
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
   }, [roomId]);

   // ===============================
   // SEND INVITATION
   // ===============================
   const sendInvitation = async () => {
      if (!inviteEmail.trim()) return;

      try {
         const res = await API.post(
            "/invitation/send",
            {
               roomId,
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

   // ===============================
   // SEND MESSAGE
   // ===============================
   const sendMessage = () => {
      if (!message.trim()) return;

      socket.emit(
         "send-message",
         {
            roomId,
            senderId: user._id,
            userName: user.name,
            message,
         }
      );

      setMessage("");
   };

   // ===============================
   // LEAVE ROOM
   // ===============================
   const handleLeaveRoom = async () => {
      try {
         await API.put(
            `/group-study/leave/${roomId}`
         );

         socket.emit(
            "leave-room",
            {
               roomId,
               userName: user.name,
            }
         );

         navigate("/group-study");
      } catch (err) {
         alert(
            err.response?.data?.message ||
               "Failed to leave room"
         );
      }
   };

   // ===============================
   // DELETE ROOM
   // ===============================
   const handleDeleteRoom = async () => {
      if (
         !window.confirm(
            "Delete this room permanently? This cannot be undone."
         )
      ) {
         return;
      }

      try {
         await API.delete(
            `/group-study/${roomId}`
         );

         navigate("/group-study");
      } catch (err) {
         alert(
            err.response?.data?.message ||
               "Failed to delete room"
         );
      }
   };

   // ===============================
   // DELETE MESSAGE
   // ===============================
   const handleDeleteMessage = async (
      messageId
   ) => {
      try {
         await API.delete(
            `/group-study/${roomId}/messages/${messageId}`
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

   // ===============================
   // CLEAR CHAT
   // ===============================
   const handleClearChat = async () => {
      if (
         !window.confirm(
            "Clear all chat messages for everyone?"
         )
      ) {
         return;
      }

      try {
         await API.delete(
            `/group-study/${roomId}/messages`
         );

         setMessages([]);
      } catch (err) {
         alert(
            err.response?.data?.message ||
               "Failed to clear chat"
         );
      }
   };

   // ===============================
   // REMOVE MEMBER
   // ===============================
   const handleRemoveMember = async (
      memberId
   ) => {
      if (
         !window.confirm(
            "Remove this member from the room?"
         )
      ) {
         return;
      }

      try {
         await API.put(
            `/group-study/remove/${roomId}/${memberId}`
         );

         const res = await API.get(
            `/group-study/${roomId}`
         );

         setRoom(res.data);
      } catch (err) {
         alert(
            err.response?.data?.message ||
               "Failed to remove member"
         );
      }
   };

   // ===============================
   // LOADING
   // ===============================
   if (!room) {
      return (
         <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">

            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

               <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600"></div>

               <h2 className="text-xl font-bold text-slate-900">
                  Loading Study Room
               </h2>

               <p className="mt-2 text-sm text-slate-500">
                  Please wait while your study room loads...
               </p>

            </div>

         </div>
      );
   }

   // IMPORTANT
   const isHost =
      room.host?._id === user?._id;

   // ===============================
   // MAIN UI
   // ===============================
   return (
      <div className="min-h-screen bg-slate-50 text-slate-900">

         <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">

            {/* ROOM HEADER */}
            <div className="mb-5">
               <RoomHeader
                  room={room}
                  currentUserId={user?._id}
                  onLeaveRoom={handleLeaveRoom}
                  onDeleteRoom={handleDeleteRoom}
                  onRemoveMember={
                     handleRemoveMember
                  }
               />
            </div>

            {/* VIDEO - MAIN FOCUS */}
            <div className="mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

               <VideoSyncPlayer
                  room={room}
               />

            </div>

            {/* CHAT + ROOM INFORMATION */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">

               {/* ROOM INFORMATION */}
               <div className="xl:col-span-4">

                  <div className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                     <RoomSidebar
                        room={room}
                        onlineUsers={
                           onlineUsers
                        }
                        inviteEmail={
                           inviteEmail
                        }
                        setInviteEmail={
                           setInviteEmail
                        }
                        sendInvitation={
                           sendInvitation
                        }
                     />

                  </div>

               </div>

               {/* CHAT */}
               <div className="xl:col-span-8">

                  <div className="h-full min-h-[500px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                     <ChatBox
                        messages={messages}
                        message={message}
                        setMessage={setMessage}
                        sendMessage={sendMessage}
                        onlineUsers={
                           onlineUsers
                        }
                        currentUserId={
                           user?._id
                        }
                        isHost={isHost}
                        onDeleteMessage={
                           handleDeleteMessage
                        }
                        onClearChat={
                           handleClearChat
                        }
                     />

                  </div>

               </div>

            </div>

            {/* SHARED NOTES */}
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

               <SharedNotes
                  room={room}
               />

            </div>

         </div>

      </div>
   );
}

export default StudyRoom;