import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";

const GiveExam = () => {
  const { examId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [examInfo, setExamInfo] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get(`http://localhost:3000/exam/${examId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data?.data || res.data;
        setExamInfo(data.exam);
        setQuestions(data.questions);
        setTimeLeft(data.exam?.duration * 60 || 0);
      } catch (err) {
        console.error("Failed to fetch exam data", err);
      }
    };

    if (examId) fetchExamData();
  }, [examId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOptionChange = (qIndex, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIndex]: answer,
    }));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleSubmit = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const userId = JSON.parse(atob(token.split(".")[1]))?._id;
      const formattedAnswers = Object.entries(selectedAnswers).map(([questionIndex, answer]) => ({
        questionNumber: parseInt(questionIndex) + 1,
        selectedAnswer: answer,
      }));

      const res = await axios.post(
        `http://localhost:3000/result/submit/${examId}/${userId}`,
        { responses: formattedAnswers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        setTimeLeft(0);
        localStorage.setItem("resultData", JSON.stringify(res.data));
        navigate(`/std-result/${examId}/${userId}`);
      }
      alert("Exam submitted successfully!");
    } catch (error) {
      console.error("Error submitting exam:", error);
      alert("Failed to submit the exam. Please try again.");
    }
  };
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-[260px]  ml-[230px] p-6 bg-white border-r border-gray-200 p-4 min-h-screen flex flex-col">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">Answer Sheet</h2>
        </div>

        <div className={`grid grid-cols-4 gap-2 ${questions.length > 16 ? "overflow-y-auto flex-grow" : ""}`}>
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-10 h-10 rounded-full font-medium border transition-all duration-200 ${
                currentQuestion === index
                  ? "bg-[#efa580] hover:bg-[#FF884D] text-white border-blue-600"
                  : selectedAnswers[index]
                  ? "bg-green-400 text-white border-green-400"
                  : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className="mb-4 mt-6">
          <div className="text-sm text-gray-500 mt-1">Remaining Time:</div>
          <div className="text-2xl font-bold text-red-500">{formatTime(timeLeft)}</div>
        </div>
        <button
          className="mt-6 w-full bg-[#efa580] hover:bg-[#FF884D] text-white py-2 rounded-lg font-semibold transition"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      {/* Question Area */}
      <div className="flex-grow p-8 bg-[#f9fafc] min-h-screen">
        {questions.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Question {currentQuestion + 1} of {questions.length}
            </h3>
            <p className="text-gray-700 mb-6 text-md">{questions[currentQuestion]?.questionText}</p>
            <div className="space-y-3">
              {questions[currentQuestion]?.queType === "ShortAnswer" ? (
                <Input
                  type="text"
                  placeholder="Enter your answer"
                  value={selectedAnswers[currentQuestion] || ""}
                  onChange={(e) => handleOptionChange(currentQuestion, e.target.value)}
                  className="w-full text-black"
                />
              ) : (
                questions[currentQuestion]?.options.map((opt, i) => (
                  <label
                    key={i}
                    className="flex items-center space-x-3 cursor-pointer bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded border"
                  >
                    <input
                      type="radio"
                      name={`q${currentQuestion}`}
                      checked={selectedAnswers[currentQuestion] === opt}
                      onChange={() => handleOptionChange(currentQuestion, opt)}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-800">{opt}</span>
                  </label>
                ))
              )}
            </div>

            <div className="flex justify-between mt-8">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                onClick={() => setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1))}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiveExam;
