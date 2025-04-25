import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CDashboard from "@/assets/Cdashboard.jpg";

const CLeaderBoard = () => {
  const { examId } = useParams();
  const [examData, setExamData] = useState(null);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchResultData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/result/${examId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExamData(res.data.data);
      } catch (error) {
        console.error("Failed to fetch result:", error);
      }
    };

    fetchResultData();
  }, [examId]);

  if (!examData) return <p className="ml-[230px] p-6">Loading...</p>;

  const { examDetails, resultsSummary, studentPerformance } = examData;
  const formatDate = (isoDate) => new Date(isoDate).toLocaleDateString("en-GB");

  return (
    <div className="p-6 w-[1300px] ml-[230px] bg-[#f8f9fc] min-h-screen overflow-y-auto text-[#3d3d3d] font-sans">
      <div className="bg-white rounded-2xl p-6 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-6">
          <img src={CDashboard} alt="Avatar" className="w-2xs h-48 rounded-full  border-blue-300 shadow-md" />
          <div className="ml-6">
            <h2 className="text-2xl font-bold text-[#FF884D]">{examDetails.examName}</h2>
            <p className="text-gray-600 mt-1">
              📘 Subject: <span className="font-medium">{examDetails.subject}</span>
            </p>
            <p className="text-gray-600">📅 Start: {formatDate(examDetails.startDate)}</p>
            <p className="text-gray-600">📅 End: {formatDate(examDetails.endDate)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 text-black rounded-xl px-6 py-5 shadow-md">
          <p className="text-sm font-semibold">
            Total Marks : <span className="text-lg font-bold">{" " + examDetails.totalMarks}</span>
          </p>
          <p className="text-sm text-gray-600 mt-1">Questions : {examDetails.numberOfQuestions}</p>
        </div>

        <div className="bg-gradient-to-r from-green-100 to-green-50 text-black rounded-xl px-6 py-5 shadow-md">
          <p className="text-sm font-semibold">Passing Marks</p>
          <p className="text-lg font-bold">{examDetails.passingMarks}</p>
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-purple-50 text-black rounded-xl px-6 py-5 shadow-md">
          <p className="text-sm font-semibold">Total Students</p>
          <p className="text-lg font-bold">{resultsSummary.totalStudents}</p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4 text-[#FF884D]">📊 Student Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden text-sm">
            <thead className="bg-blue-100 text-[#FF884D]">
              <tr className="text-left">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Attempted</th>
                <th className="px-6 py-3">Correct</th>
                <th className="px-6 py-3">Wrong</th>
                <th className="px-6 py-3">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {studentPerformance.map((student, idx) => {
                const attempted = student.totalAttempted;
                const correct = student.correctAnswers;
                const wrong = student.wrongAnswers;
                const isPassed = student.isPassed;

                return (
                  <tr
                    key={idx}
                    className={`border-t border-gray-200 ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="px-6 py-3 font-medium">{student.studentName}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          isPassed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {isPassed ? "PASSED" : "FAILED"}
                      </span>
                    </td>
                    <td className="px-6 py-3">{attempted}</td>
                    <td className="px-6 py-3">{correct}</td>
                    <td className="px-6 py-3">{wrong}</td>
                    <td className="px-6 py-3">
                      <span className="bg-blue-100 text-[#FF884D] px-3 py-1 rounded-full font-semibold">
                        {isNaN(student.percentage) ? "0%" : `${student.percentage}%`}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CLeaderBoard;
