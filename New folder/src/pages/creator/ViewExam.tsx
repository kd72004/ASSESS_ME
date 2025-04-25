import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; // Importing for navigation
import axios from "axios";
import { FileText, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ViewExam = () => {
  const [examList, setExamList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Decoding the token to get the userId
  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken._id;

  // Fetch the exams using the userId
  const fetchExams = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/exam/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched Exams Data:", response.data);

      // Access the correct data
      setExamList(response.data.data); // Here we're using `data` instead of `exams`
      setLoading(false);
    } catch (error) {
      console.error("Error fetching exams:", error);
      setLoading(false);
    }
  };

  // Navigate to the discussion page
  const handleDiscussionNavigate = (examId) => {
    navigate(`/creator-discussion/${examId}`);
  };
  const handleResultNavigate = (examId) => {
    navigate(`/creator-leaderboard/${examId}`);
  };

  useEffect(() => {
    if (userId) {
      fetchExams();
    }
  }, [userId]); // The effect will run when userId changes

  return (
    <div className="w-[1300px] ml-[230px] p-6 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <div className="p-3.5">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your created Exams</h2>
        {loading ? (
          <p className="text-gray-600">Loading exams...</p>
        ) : examList.length === 0 ? (
          <p className="text-gray-600">No exams attempted yet.</p>
        ) : (
          <div className="space-y-4">
            {examList.map((exam) => (
              <div
                key={exam._id} // Use the unique _id from the response
                className="flex items-center justify-between bg-white shadow rounded-lg p-4"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{exam.examName}</h3>
                  <p className="text-sm text-gray-500">Subject: {exam.subject}</p>
                  <p className="text-sm text-gray-500">Total Marks: {exam.totalMarks}</p>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handleDiscussionNavigate(exam._id)}
                    className="flex items-center gap-2 bg-[#FF884D] text-white p-2 rounded"
                  >
                    <MessageCircle className="w-4 h-4" /> Discussion
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleResultNavigate(exam._id)}
                    className="flex items-center gap-2 bg-[#FF884D] text-white p-2 rounded"
                  >
                    <FileText className="w-4 h-4" /> Result
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewExam;
