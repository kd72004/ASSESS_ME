import { FiInfo } from "react-icons/fi";
import { Briefcase, CreditCard, Wallet } from "lucide-react";
import SDashboard from "@/assets/Sdashboard.jpg";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const SResult = () => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [weakAreas, setWeakAreas] = useState([]);
  const token = sessionStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const name = decodedToken?.name;

  useEffect(() => {
    // Get data from local storage
    const raw = localStorage.getItem("resultData");
    const parsed = raw ? JSON.parse(raw) : null;

    if (parsed && parsed.data) {
      const { result, examDetails, examStatistics } = parsed.data;

      const info = {
        name: name,
        subject: examDetails.subject,
        totalMarks: examDetails.totalMarks,
        passingMarks: examDetails.passingMarks,
        totalQuestions: examDetails.totalQuestions,
        highestMarks: examStatistics.highestMarks,
        lowestMarks: examStatistics.lowestMarks,
        obtainedMarks: result.obtainedMarks,
        percentage: result.percentage,
        passStatus: result.isPassed,
        strongAreas: result.strongAreas.map((q) => q.questionTopic),
        weakAreasSummary: result.weakAreas.map((q) => q.questionTopic),
      };

      setStudentInfo(info);
      setWeakAreas(result.weakAreas);
    }
  }, []);

  if (!studentInfo) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="ml-[230px] p-6 max-w-[calc(100vw-230px)] bg-[#f8f9fc] min-h-screen overflow-y-auto overflow-x-hidden text-[#3d3d3d] font-sans">
      {/* Top Section */}
      <div className="bg-blue-50 rounded-xl p-6 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-4">
          <img src={SDashboard} alt="Avatar" className="w-32 h-32 rounded-full" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Hi {studentInfo.name}</h2>
            <p className="text-gray-500">Subject: {studentInfo.subject}</p>
            <p className="text-gray-500">Total Marks: {studentInfo.totalMarks}</p>
            <p className="text-gray-500">Passing Marks: {studentInfo.passingMarks}</p>
            <p className="text-gray-500">Total Questions: {studentInfo.totalQuestions}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="flex items-center justify-between bg-white text-black rounded-xl px-6 py-4 shadow-md">
          <div>
            <p className="text-sm font-medium">Highest Marks: {studentInfo.highestMarks}</p>
            {/* <h2 className="text-xl font-bold">{studentInfo.highestMarks}</h2> */}
            <p className="text-sm mt-1">Lowest Marks: {studentInfo.lowestMarks}</p>
          </div>
          {/* <Wallet className="w-6 h-6 text-purple-700" /> */}
        </div>

        <div className="flex items-center justify-between bg-white rounded-xl px-6 py-4 shadow-md">
          <div>
            <p className="text-sm font-medium text-gray-700">Obtained Marks: {studentInfo.obtainedMarks}</p>
            {/* <h2 className="text-xl font-bold text-gray-900">{studentInfo.obtainedMarks}</h2> */}
            <p className="text-sm mt-1 text-gray-600">Percentage: {studentInfo.percentage}%</p>
          </div>
          {/* <CreditCard className="w-6 h-6 text-purple-400" /> */}
        </div>

        <div className="flex items-center justify-between bg-white rounded-xl px-6 py-4 shadow-md">
          <div>
            <p className="text-sm font-medium text-gray-700">Pass</p>
            <h2 className={`text-xl font-bold ${studentInfo.passStatus ? "text-green-600" : "text-red-600"}`}>
              {studentInfo.passStatus ? "Yes" : "No"}
            </h2>
          </div>
          {/* <Briefcase className="w-6 h-6 text-purple-400" /> */}
        </div>
      </div>

      {/* Strong & Weak Areas Summary */}

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="flex items-center justify-between bg-white text-black rounded-xl px-6 py-4 shadow-md">
          <div>
            <p className="text-sm font-medium">Strong Areas</p>
            <h2 className="text-xl font-bold">{studentInfo.strongAreas?.join(", ") || "N/A"}</h2>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white rounded-xl px-6 py-4 shadow-md">
          <div>
            <p className="text-sm font-medium text-gray-700">Weak Areas</p>
            <h2 className="text-xl font-bold text-gray-900">{studentInfo.weakAreasSummary?.join(", ") || "N/A"}</h2>
          </div>
        </div>
      </div>

      {/* Detailed Weak Areas */}
      <div className="mt-10 bg-white rounded-xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Weak Areas</h3>
        </div>

        <div className="space-y-4">
          {weakAreas.length > 0 ? (
            weakAreas.map((area) => (
              <div key={area._id} className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">
                  Q{area.questionNumber}. <span className="font-medium text-gray-700">{area.questionTopic}</span>
                </p>
                <p className="text-base font-semibold text-gray-800 mb-2">{area.questionText}</p>

                <div className="space-y-1 text-sm">
                  <div className="bg-red-50 p-2 rounded-md border-l-4 border-red-400">
                    <span className="font-semibold text-red-600">Your Answer:</span> {area.userAnswer}
                  </div>
                  <div className="bg-green-50 p-2 rounded-md border-l-4 border-green-500">
                    <span className="font-semibold text-green-700">Correct Answer:</span> {area.correctAnswer}
                  </div>
                </div>

                {/* <a href="#" className="text-purple-500 text-sm flex items-center space-x-1 mt-3">
                  <FiInfo />
                  <span>More information</span>
                </a> */}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No weak areas found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SResult;
