import sendEmail from "../utils/sendEmail.js";


import Invitation from "../models/Invitation.js";
import GroupStudy from "../models/GroupStudy.js";
import User from "../models/User.js";
import sendInvitationMail from "../utils/sendInvitationMail.js";

// ==========================================
// SEND INVITATION
// ==========================================

export const sendInvitation = async (req, res) => {
   
   try {

      const { roomId, receiverEmail } = req.body;

      console.log("===== SEND INVITATION =====");
      console.log("Receiver:", receiverEmail);
      console.log("Sender:", req.user.email);

      // Find room
      const room = await GroupStudy.findById(roomId);

      if (!room) {
         return res.status(404).json({
            message: "Room not found",
         });
      }

      console.log("Room:", room.roomName);

      // Find receiver
      const receiver = await User.findOne({
         email: receiverEmail,
      });

      if (!receiver) {
         return res.status(404).json({
            message: "User not registered.",
         });
      }

      // Prevent inviting yourself
      if (receiver._id.toString() === req.user._id.toString()) {
         return res.status(400).json({
            message: "You cannot invite yourself.",
         });
      }

      // Already member?
      if (
         room.members.some(
            member => member.toString() === receiver._id.toString()
         )
      ) {
         return res.status(400).json({
            message: "User already joined this room.",
         });
      }

      // // Existing invite?
      // const existingInvite = await Invitation.findOne({
      //    roomId,
      //    receiverEmail,
      //    status: "Pending",
      // });

      // if (existingInvite) {
      //    return res.status(400).json({
      //       message: "Invitation already sent.",
      //    });
      // }

      // // Save invitation
      // const invitation = await Invitation.create({
      //    roomId,
      //    sender: req.user._id,
      //    receiverEmail,
      // });
      // Check if a pending invitation already exists
let invitation = await Invitation.findOne({
   roomId,
   receiverEmail,
   status: "Pending",
});

// If no pending invitation exists, create one
if (!invitation) {
   invitation = await Invitation.create({
      roomId,
      sender: req.user._id,
      receiverEmail,
   });
}

      const inviteLink =
         `http://localhost:5173/accept-invite/${invitation._id}`;

      console.log("Sending email...");

const html = `
<div style="font-family:Arial,sans-serif;padding:20px">

<h2>📚 Learnify Group Study Invitation</h2>

<p>Hello,</p>

<p>
<b>${req.user.name}</b> has invited you to join the study room:
</p>

<h3>${room.roomName}</h3>

<p>Click the link below to accept the invitation:</p>

<p>
<a href="${inviteLink}">
${inviteLink}
</a>
</p>

<p>
If the button doesn't work, copy and paste the link into your browser.
</p>

<hr>

<p>Team Learnify</p>

</div>
`;

// const sent = await sendEmail(
//    receiverEmail,
//    "📚 Learnify Group Study Invitation",
//    html
// );

// if (!sent) {
//    return res.status(500).json({
//       message: "Failed to send invitation email."
//    });
// }
console.log("Receiver Email:", receiverEmail);
console.log("Subject:", "📚 Learnify Group Study Invitation");
console.log("HTML:");
console.log(html);

await sendEmail(
   receiverEmail,
   "📚 Learnify Group Study Invitation",
   html
);

return res.status(200).json({
   message: "Invitation sent successfully."
});

      console.log("Email sent successfully");

      res.status(201).json({
         message: "Invitation sent successfully.",
      });

   } catch (error) {

      console.log("SEND INVITATION ERROR");
      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }
};
// ==========================================
// ACCEPT INVITATION
// ==========================================

export const acceptInvitation = async (req, res) => {
   try {

      const invitation = await Invitation.findById(req.params.id);

      if (!invitation) {
         return res.status(404).json({
            message: "Invitation not found",
         });
      }

      if (invitation.receiverEmail !== req.user.email) {
         return res.status(403).json({
            message: "This invitation is not for you",
         });
      }

      if (invitation.status !== "Pending") {
         return res.status(400).json({
            message: "Invitation already processed",
         });
      }

      // Find the invited room
      const room = await GroupStudy.findById(invitation.roomId);

      if (!room) {
         return res.status(404).json({
            message: "Room not found",
         });
      }

      // Add user if not already a member
      const alreadyMember = room.members.some(
         member => member.toString() === req.user._id.toString()
      );

      if (!alreadyMember) {
         room.members.push(req.user._id);
         await room.save();
      }

      // Update invitation
      invitation.status = "Accepted";
      await invitation.save();

      return res.status(200).json({
         success: true,
         message: "Invitation accepted successfully.",
         roomId: room._id
      });

   } catch (err) {

      console.log(err);

      return res.status(500).json({
         message: "Server Error",
      });

   }
};
// ==========================================
// REJECT INVITATION
// ==========================================

export const rejectInvitation = async (req, res) => {
   try {

      const invitation = await Invitation.findById(req.params.id);

      if (!invitation) {
         return res.status(404).json({
            message: "Invitation not found.",
         });
      }

      if (invitation.receiverEmail !== req.user.email) {
         return res.status(403).json({
            message: "This invitation is not for you.",
         });
      }

      if (invitation.status !== "Pending") {
         return res.status(400).json({
            message: "Invitation already processed.",
         });
      }

      invitation.status = "Rejected";

      await invitation.save();

      res.json({
         message: "Invitation rejected successfully.",
      });

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }
};

// ==========================================
// GET MY INVITATIONS
// ==========================================

export const getMyInvitations = async (req, res) => {

   try {

      console.log("Logged in Email:", req.user.email);

      const invitations = await Invitation.find({
         receiverEmail: req.user.email,
         status: "Pending",
      })
         .populate("roomId", "roomName")
         .populate("sender", "name email");

      res.json(invitations);

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }
};