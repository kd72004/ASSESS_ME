import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { FaBrain } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { IoIosListBox } from "react-icons/io";
import ExamForm from "./ExamForm";
import axios from "axios";

const CExam = () => {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [questionType, setQuestionType] = useState("MCQ");
  const [step, setStep] = useState(1);

  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [trueFalseAnswer, setTrueFalseAnswer] = useState("");
  const [shortAnswer, setShortAnswer] = useState("");
  const [topicName, setTopicName] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);
  const maxQuestions = parseInt(sessionStorage.getItem("maxQuestions") || "0");

  const token = sessionStorage.getItem("token");

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/exam/create-exam", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.success) {
        console.log("Success:", response.data);
        console.log("numberOfQuestions:", response.data.data.numberOfQuestions);
        sessionStorage.setItem("maxQuestions", response.data.data.numberOfQuestions);
        sessionStorage.setItem("id", response.data.data._id);
        setStep(3);
      } else {
        console.warn("Submission failed:", response.data?.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleNextQuestion = () => {
    let queType = "MCQ";
    let optionsArray = [];
    let correctAns = "";

    if (questionType === "MCQ") {
      optionsArray = options;
      correctAns = correctAnswer;
    } else if (questionType === "truefalse") {
      correctAns = trueFalseAnswer === "true" ? "True" : "False";
      optionsArray = ["True", "False"];
    } else if (questionType === "short") {
      queType = "ShortAnswer";
      correctAns = shortAnswer;
    }

    const questionDataItem = {
      questionTopic: topicName,
      questionText,
      queType,
      correctAnswer: correctAns,
    };

    if (queType === "MCQ") {
      questionDataItem.options = optionsArray;
    }

    setAllQuestions((prev) => [...prev, questionDataItem]);
    setQuestionCount((prev) => prev + 1);

    // reset form
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
    setShortAnswer("");
    setTrueFalseAnswer("");
    setTopicName("");
  };

  const handleSaveAll = async () => {
    const examId = sessionStorage.getItem("id");

    const payload = {
      examId,
      questionData: allQuestions,
    };

    try {
      const response = await axios.post(`http://localhost:3000/question/create/${examId}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data) {
        alert("All questions saved successfully.");
        setStep(1);
      } else {
        alert("Failed to save questions");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };
  return (
    <div className="p-6 w-[1300px] ml-[230px] bg-[#f8f9fc] min-h-screen overflow-y-auto">
      <div className="mt-10">
        {/* Choice */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div
              onClick={() => {
                setSelectedChoice("manual");
                setStep(2);
              }}
              className="bg-white rounded-xl shadow p-4  flex gap-8 items-center justify-center"
            >
              <div className="flex  items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                <IoIosListBox className="text-orange-500 text-2xl" />{" "}
              </div>
              <p className="text-xl text-gray-500 font-bold">Generate question manually</p>
            </div>

            <div
              onClick={() => {
                setSelectedChoice("file");
                setStep(2);
              }}
              className="bg-white rounded-xl shadow p-4  flex gap-8 items-center justify-center"
            >
              <div className="flex  items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                <FiUpload className="text-orange-500 text-2xl" />{" "}
              </div>
              <p className="text-xl text-gray-500 font-bold">Generate through file</p>
            </div>
            <div
              onClick={() => {
                setSelectedChoice("ai");
                setStep(2);
              }}
              className="bg-white rounded-xl shadow p-4  flex gap-8 items-center justify-center"
            >
              <div className="flex  items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                <FaBrain className=" text-blue-500 text-xl" />
              </div>
              <p className="text-xl text-gray-500 font-bold">Generate through ai</p>
            </div>
          </div>
        )}

        {step === 2 && <ExamForm onSubmit={handleSubmit} />}
        {step === 3 && selectedChoice === "manual" && (
          <div className="bg-white shadow rounded-xl p-6 flex text-black">
            <div className="w-1/4 pr-6 bg-[#FFF4EE] p-2.5 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Question types</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="MCQ"
                    checked={questionType === "MCQ"}
                    onChange={() => setQuestionType("MCQ")}
                  />
                  <span>MCQ</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="truefalse"
                    checked={questionType === "truefalse"}
                    onChange={() => setQuestionType("truefalse")}
                  />
                  <span>True or False</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="short"
                    checked={questionType === "short"}
                    onChange={() => setQuestionType("short")}
                  />
                  <span>Short Answer</span>
                </label>
              </div>
            </div>

            <div className="w-3/4 pl-6">
              <h3 className="text-lg font-semibold mb-4">Enter Question</h3>
              <input
                type="text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Enter Question"
                className="w-full mb-4 p-2 border rounded"
              />

              {questionType === "MCQ" &&
                options.map((opt, index) => (
                  <input
                    key={index}
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    className="w-full mb-2 p-2 border rounded"
                  />
                ))}
              {questionType === "MCQ" && (
                <input
                  type="text"
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  placeholder="Correct Answer"
                  className="w-full mb-2 p-2 border rounded"
                />
              )}

              {questionType === "truefalse" && (
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="truefalse"
                      value="true"
                      onChange={(e) => setTrueFalseAnswer(e.target.value)}
                    />
                    <span>True</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="truefalse"
                      value="false"
                      onChange={(e) => setTrueFalseAnswer(e.target.value)}
                    />
                    <span>False</span>
                  </label>
                </div>
              )}

              {questionType === "short" && (
                <input
                  type="text"
                  value={shortAnswer}
                  onChange={(e) => setShortAnswer(e.target.value)}
                  placeholder="Expected Answer"
                  className="w-full mb-4 p-2 border rounded"
                />
              )}

              <label className="block mb-2 font-medium">Topic name :</label>
              <input
                type="text"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />

              {questionCount < maxQuestions && (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                  onClick={handleNextQuestion}
                >
                  Next
                </button>
              )}

              {questionCount === maxQuestions && (
                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                  onClick={handleSaveAll}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        )}

        {step === 3 && selectedChoice === "file" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Left - File Upload UI */}
            <div className="bg-gray-100 border border-dashed border-gray-300 rounded-xl p-6 space-y-4 shadow-md flex flex-col items-center justify-center text-center">
              <div className="text-lg font-medium text-gray-700">Upload questions via a file</div>
              <p className="text-sm text-muted-foreground">
                Drag & drop files here or select a file to upload questions in bulk
                <br />
                <span className="text-xs">
                  Supports Word(.docx)/Excel(.xlsx) files, and Word files can be imported with pictures, audio/video,
                  formulas, etc.
                </span>
              </p>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-md">Upload file</button>
            </div>

            {/* Right - Question Preview */}
            <div className="bg-white border rounded-xl p-6 shadow-md space-y-4">
              <div className="text-sm text-muted-foreground border-b pb-2">
                <strong>Generate preview area</strong> – Due to the limitation of AI model, some test questions may not
                be recognized. Please check whether the recognized test questions are correct.
              </div>

              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">
                  1. MCQ Choice: Based on the information in the question, select the correct answer. (1PT)
                </p>
                <p className="text-sm text-gray-700">
                  Children of the family member is at least a Humpty and a Dumpty. The input file will be given in the
                  format: &lt;member name, ID&gt; &lt;age&gt; &lt;child member name, ID&gt;
                </p>

                <div className="space-y-2 mt-4">
                  {["Option 1", "Option 2", "Option 3", "Option 4"].map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input type="radio" name="file-option" className="accent-orange-500" />
                      <label className="text-sm">{option}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {step === 3 && selectedChoice === "ai" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Left side - Prompt input */}
            <div className="bg-gray-100 p-6 rounded-xl space-y-4 shadow-md">
              <h3 className="text-orange-500 font-semibold">Generate by topic</h3>
              <p className="text-sm text-muted-foreground">
                This method is suitable for exam organizers who want to create an assessment for a specific topic. You
                can generate questions based on keywords and descriptions in up to 30 most spoken languages in the
                world.
                <br />
                <span className="italic">Ex: "generate 10 question of TOPIC"</span>
              </p>
              <Input placeholder="Enter prompt" className="mt-2 text-black" />
              <button className="bg-orange-500 text-white px-4 py-2 rounded-md w-full">Generate question</button>
            </div>

            {/* Right side - Preview area */}
            <div className="bg-white border rounded-xl p-6 shadow-md space-y-4">
              <div className="text-sm text-muted-foreground border-b pb-2">
                <strong>Generate preview area</strong> – Due to the limitation of AI model, some test questions may not
                be recognized. Please check whether the recognized test questions are correct.
              </div>

              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">
                  1. Multiple Choice: Based on the information in the question, select the correct answer. (1PT)
                </p>
                <p className="text-sm text-gray-700">
                  Children of the family member is at least a Humpty and a Dumpty. The input file will be given in the
                  format: &lt;member name, ID&gt; &lt;age&gt; &lt;child member name, ID&gt;
                </p>

                <div className="space-y-2 mt-4">
                  {["Option 1", "Option 2", "Option 3", "Option 4"].map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input type="radio" name="ai-option" className="accent-orange-500" />
                      <label className="text-sm">{option}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CExam;
