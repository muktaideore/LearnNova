

import Message from "./models/Message.js";
const onlineUsers = {};
export default function socketHandler(io) {

   io.on("connection", (socket) => {

      console.log("✅ User Connected:", socket.id);

      // ==========================================
      // JOIN ROOM
      // ==========================================
socket.on("join-room", ({ roomId, userId, userName }) => {

   socket.join(roomId);

   socket.roomId = roomId;
   socket.userId = userId;
   socket.userName = userName;

   if (!onlineUsers[roomId]) {
      onlineUsers[roomId] = [];
   }

   const exists = onlineUsers[roomId].find(
      (user) => user.userId === userId
   );

   if (!exists) {
      onlineUsers[roomId].push({
         userId,
         userName,
      });
   }

   io.to(roomId).emit(
      "online-users",
      onlineUsers[roomId]
   );

   socket.to(roomId).emit("user-joined", {
      userName,
      message: `${userName} joined the room`,
   });

});

      // ==========================================
      // SEND MESSAGE
      // ==========================================

      socket.on("send-message", async (data) => {

         try {

            // Save message into MongoDB
            const newMessage = await Message.create({

               roomId: data.roomId,

               sender: data.senderId,

               message: data.message,

            });

            const populatedMessage = await Message.findById(newMessage._id)

               .populate("sender", "name");

            io.to(data.roomId).emit(

               "receive-message",

               populatedMessage

            );

         }

         catch (error) {

            console.log(error);

         }

      });


      // ==========================================
      // USER TYPING
      // ==========================================

      socket.on("typing", ({ roomId, userName }) => {

         socket.to(roomId).emit(

            "typing",

            userName

         );

      });


      // ==========================================
      // VIDEO PLAY
      // ==========================================

      socket.on("video-play", ({ roomId }) => {

         socket.to(roomId).emit(

            "video-play"

         );

      });


      // ==========================================
      // VIDEO PAUSE
      // ==========================================

      socket.on("video-pause", ({ roomId }) => {

         socket.to(roomId).emit(

            "video-pause"

         );

      });


      // ==========================================
      // VIDEO SEEK
      // ==========================================

      socket.on("video-seek", ({ roomId, currentTime }) => {

         socket.to(roomId).emit(

            "video-seek",

            {

               currentTime,

            }

         );

      });
      // ==========================================
// VIDEO LOADED
// ==========================================

socket.on("video-loaded", ({ roomId, videoId }) => {

   console.log("Video Changed:", roomId, videoId);

   io.to(roomId).emit("video-changed", {
      roomId,
      videoId,
   });

});


      // ==========================================
      // LEAVE ROOM
      // ==========================================

      socket.on("leave-room", ({ roomId, userName }) => {

   socket.leave(roomId);

   if (onlineUsers[roomId]) {

      onlineUsers[roomId] =
         onlineUsers[roomId].filter(
            (user) => user.userId !== socket.userId
         );

      io.to(roomId).emit(
         "online-users",
         onlineUsers[roomId]
      );

   }

   socket.to(roomId).emit("user-left", {
      userName,
      message: `${userName} left the room`
   });

});


      // ==========================================
      // DISCONNECT
      // ==========================================

      
   socket.on("disconnect", () => {

   const roomId = socket.roomId;

   if (roomId && onlineUsers[roomId]) {

      onlineUsers[roomId] = onlineUsers[roomId].filter(
         (user) => user.userId !== socket.userId
      );

      io.to(roomId).emit(
         "online-users",
         onlineUsers[roomId]
      );

      socket.to(roomId).emit("user-left", {
         userName: socket.userName,
         message: `${socket.userName} left the room`,
      });
   }

   console.log("❌ User Disconnected:", socket.id);

});

});   // <-- io.on("connection") ends

}  