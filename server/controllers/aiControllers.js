// controllers/aiController.js

import Resume from "../models/Resume.js";
import ai from "../config/ai.js";

// controller for enhancing a resume's professional summary
// POST: /api/ai/enhance-pro-sum

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const aiResponse = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Enhance the professional summary of a resume. The summary should be 1–2 sentences, highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. Return only the enhanced text."
        },
        {
          role: "user",
          content: userContent
        }
      ]
    });

    // FIX: added safe access and trim
    const enhancedContent = aiResponse?.choices?.[0]?.message?.content?.trim();
    if (!enhancedContent) {
      return res.status(500).json({ message: "AI response is empty or invalid" });
    }

    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// controller for enhancing a resume's job description
// POST: /api/ai/enhance-job-desc

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const aiResponse = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Improve the job description by making it concise, results-driven, and ATS-friendly. Use strong action verbs and quantify impact where possible. Return only the enhanced text."
        },
        {
          role: "user",
          content: userContent
        }
      ]
    });

    // FIX: added safe access and trim
    const enhancedContent = aiResponse?.choices?.[0]?.message?.content?.trim();
    if (!enhancedContent) {
      return res.status(500).json({ message: "AI response is empty or invalid" });
    }

    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// controller for uploading a resume and extracting data
// POST: /api/ai/upload-resume

export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: userId missing" });
    }

    if (!resumeText || !title) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const systemPrompt =
      "You are an expert AI agent that extracts structured data from resumes.";
    const userPrompt = `Extract data from this resume: ${resumeText} 
Provide data in the following JSON format with no additional text before or after:  // FIX: corrected 'aditional' → 'additional'
{
  professional_summary: { type: String, default: "" },
  skills: [{ type: String }],
  personal_info: {
    image: { type: String, default: "" },
    full_name: { type: String, default: "" },
    profession: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    website: { type: String, default: "" }
  },
  experience:[
    {
      company: { type: String },
      position: { type: String },
      start_date: { type: String },
      end_date: { type: String },
      description: { type: String },
      is_current: { type: Boolean }
    }
  ],
  project:[
    {
      name: { type: String },
      type: { type: String },
      description: { type: String }
    }
  ],
  education:[
    {
      institution: { type: String },
      degree: { type: String },
      field: { type: String },
      graduation_date: { type: String },
      gpa: { type: String }
    }
  ]
}`;

    const aiResponse = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" }
    });

    let parsedData;
    try {
      parsedData = JSON.parse(aiResponse?.choices?.[0]?.message?.content || "{}"); // FIX: safe access
    } catch (err) {
      return res.status(500).json({ message: "Failed to parse AI response" });
    }

    const newResume = await Resume.create({
      userId,
      title,
      ...parsedData
    });

    return res.status(201).json({ resumeId: newResume._id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
