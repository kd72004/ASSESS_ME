import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";

const SExam = () => {
  const [exams, setExams] = useState([]);
  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await axios.get("http://localhost:3000/exam/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const allExams = Array.isArray(res.data) ? res.data : res.data.data;
        const activeExams = allExams.filter((exam) => exam.isActive === true);
        setExams(activeExams);
      } catch (err) {
        console.error("Failed to fetch exams", err);
      }
    };

    fetchExams();
  }, []);

  const handleGiveExam = (examId) => {
    navigate(`/giveExam/${examId}`);
  };

  return (
    <div className="p-6 w-[1300px] ml-[230px] bg-[#f8f9fc] min-h-screen overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Exams</h2>
        {exams.length === 0 ? (
          <p className="text-gray-600">No active exams available.</p>
        ) : (
          <div className="space-y-4">
            {exams.map((exam) => (
              <div
                key={exam._id}
                className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{exam.examName}</h3>
                  <p className="text-gray-600 text-sm">Subject: {exam.subject}</p>
                  <p className="text-gray-600 text-sm">Creator name: {exam.createdBy.name}</p>
                  <p className="text-gray-600 text-sm">Total Marks: {exam.totalMarks}</p>
                </div>
                <Button className="bg-[#FF884D]" onClick={() => handleGiveExam(exam._id)}>Give Exam</Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SExam;
