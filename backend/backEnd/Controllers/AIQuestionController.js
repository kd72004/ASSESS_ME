const { parseAIResponse } = require('../utils/aiQuestionParser');
const mongoose = require('mongoose');
const Question = require('../Models/question');

exports.generateAndSaveQuestions = async (req, res) => {
    try {
        const { examId, aiResponse } = req.body;

        // Validate input
        if (!examId || !aiResponse) {
            return res.status(400).json({
                success: false,
                message: "Missing examId or AI response"
            });
        }

        // Parse the AI response
        const parsedQuestions = parseAIResponse(aiResponse);
        
        if (!parsedQuestions.success) {
            return res.status(400).json({
                success: false,
                message: "Failed to parse AI response",
                error: parsedQuestions.error || "Unknown parsing error"
            });
        }

        // Save using the model's static method with proper ObjectId creation
        const savedQuestion = await Question.create({
            examId: new mongoose.Types.ObjectId(examId),
            questionData: parsedQuestions.data.questionData
        });

        return res.status(201).json({
            success: true,
            message: "AI questions added successfully",
            data: savedQuestion.questionData,
            token: req.token
        });
    } catch (error) {
        console.error("Error generating questions:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to generate questions",
            error: error.message
        });
    }
};