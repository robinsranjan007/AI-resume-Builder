import express from "express"
import protect from "../middlewares/authmiddleware.js"
import { enhanceProfessionalSummary } from "../controllers/aiControllers.js"
import { updateResume } from "../controllers/resumeController.js"





const aiRouter = express.Router()


aiRouter.post('/enhance-pro-sum',protect,enhanceProfessionalSummary)
aiRouter.post('/enhance-job-desc',protect,enhanceProfessionalSummary)
aiRouter.post('/upload-resume',protect,updateResume)

export default aiRouter