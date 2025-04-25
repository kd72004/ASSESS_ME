const mongoose = require('mongoose');

const parseAIResponse = (rawResponse) => {
    try {
        if (!rawResponse?.candidates?.[0]?.content?.parts?.[0]?.text) {
            console.log('Raw response:', JSON.stringify(rawResponse, null, 2));
            throw new Error("Invalid response structure");
        }

        const text = rawResponse.candidates[0].content.parts[0].text;
        const questions = [];
        
        // Split by Question number
        const questionBlocks = text.split(/Question \d+:/);
        
        // Process each question block
        questionBlocks.forEach((block, index) => {
            if (!block.trim()) return;

            const parts = block.split('\n').filter(part => part.trim());
            const questionText = parts[0].trim();
            
            const currentQuestion = {
                questionNumber: index + 1,
                questionText,
                questionTopic: "General",
                queType: "MCQ",
                options: [],
                correctAnswer: '',
                isActive: true,
                marks: 5
            };

            // Process options and answer
            parts.forEach(line => {
                line = line.trim();
                if (line.match(/^[a-d]\)/)) {
                    const optionText = line.replace(/^[a-d]\)/, '').trim();
                    currentQuestion.options.push(optionText);
                } else if (line.startsWith('Answer:')) {
                    currentQuestion.correctAnswer = line.replace('Answer:', '').trim();
                }
            });

            if (currentQuestion.options.length > 0) {
                questions.push(currentQuestion);
            }
        });

        if (questions.length === 0) {
            throw new Error("No questions found in the response");
        }

        return {
            success: true,
            data: {
                questionData: questions
            }
        };

    } catch (error) {
        console.error("Parsing error:", error);
        return {
            success: false,
            error: error.message
        };
    }
};

module.exports = { parseAIResponse };