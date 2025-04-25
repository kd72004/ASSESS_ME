const mongoose = require('mongoose');

const parseAIResponse = (rawResponse) => {
    try {
        if (!rawResponse?.candidates?.[0]?.content?.parts?.[0]?.text) {
            throw new Error("Invalid response structure");
        }

        const text = rawResponse.candidates[0].content.parts[0].text;
        const questions = [];
        const lines = text.split('\n');
        let currentQuestion = null;

        for (let line of lines) {
            line = line.trim();
            if (!line) continue;

            if (line.startsWith('Question')) {
                if (currentQuestion) {
                    questions.push(currentQuestion);
                }
                const match = line.match(/Question (\d+): (.*?) = \[(.*?)\]/);
                if (!match) continue;

                currentQuestion = {
                    _id: new mongoose.Types.ObjectId(),
                    questionNumber: parseInt(match[1]),
                    questionText: match[2].trim(),
                    questionTopic: match[3].trim(),
                    queType: "MCQ",
                    options: [],
                    correctAnswer: '',
                    isActive: true,
                    marks: 5
                };
            } else if (line.match(/^[a-d]\)/)) {
                if (currentQuestion) {
                    const [label, ...textParts] = line.split(')');
                    const optionText = textParts.join(')').trim();
                    currentQuestion.options.push(optionText);
                }
            } else if (line.startsWith('Answer:')) {
                if (currentQuestion) {
                    const answer = line.replace('Answer:', '').trim();
                    currentQuestion.correctAnswer = answer.replace(/^[a-d]\)/, '').trim();
                }
            }
        }

        if (currentQuestion) {
            questions.push(currentQuestion);
        }

        if (questions.length === 0) {
            throw new Error("No questions found in the response");
        }

        return {
            success: true,
            data: {
                questionData: questions.map(q => ({
                    questionNumber: q.questionNumber,
                    questionText: q.questionText,
                    questionTopic: q.questionTopic,
                    queType: q.queType,
                    options: q.options,
                    correctAnswer: q.correctAnswer,
                    isActive: q.isActive,
                    marks: q.marks
                }))
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