import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
   sendInvitation,
   acceptInvitation,
   rejectInvitation,
   getMyInvitations,
} from "../controllers/invitationController.js";

const router = express.Router();

// ======================================
// SEND INVITATION
// ======================================
router.post(
   "/send",
   protect,
   sendInvitation
);

// ======================================
// GET MY INVITATIONS
// ======================================

router.get(
   "/my-invitations",
   protect,
   
   getMyInvitations
);

// ======================================
// ACCEPT INVITATION
// ======================================
router.put(
   "/accept/:id",
   protect,
   acceptInvitation
);

// ======================================
// REJECT INVITATION
// ======================================
router.put(
   "/reject/:id",
   protect,
   rejectInvitation
);

export default router;