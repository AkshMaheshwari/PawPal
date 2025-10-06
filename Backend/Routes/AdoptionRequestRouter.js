import express from "express";
import {
  submitAdoptionRequest,
  getAllRequests,
  updateRequestStatus,
} from "../Controllers/AdoptionRequestController.js";
import { validateAdoptionRequest } from "../Middlewares/ValidateAdoptionRequest.js";

const router = express.Router();

// POST /api/requests - Submit a new adoption request
router.post("/", validateAdoptionRequest, submitAdoptionRequest);

// GET /api/requests - Get all adoption requests
router.get("/", getAllRequests);

// PUT /api/requests/:id/status - Update request status
router.put("/:id/status", updateRequestStatus);

export default router;