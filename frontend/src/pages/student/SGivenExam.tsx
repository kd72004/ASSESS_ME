// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { MessageCircle } from "lucide-react";

// const StudentExamList = () => {
//   const [examList, setExamList] = useState([]);
//   const navigate = useNavigate();
//   const token = sessionStorage.getItem("token");
//   const studentId = sessionStorage.getItem("studentId"); // assuming studentId is stored

//   useEffect(() => {
//     const fetchExams = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/exam/student/${studentId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setExamList(response.data.exams);
//       } catch (error) {
//         console.error("Error fetching exams:", error);
//       }
//     };

//     fetchExams();
//   }, [studentId, token]);

//   const handleDiscussionNavigate = (examId) => {
//     navigate(`/discussion/${examId}`);
//   };

//   return (
//     <>
//       <div className="p-6 w-[1300px] ml-[230px] bg-[#f8f9fc] min-h-screen overflow-y-auto">
//         {/* <div className="p-6 max-w-4xl mx-auto"> */}
//           <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Exams</h2>
//           {examList.length === 0 ? (
//             <p className="text-gray-600">No exams attempted yet.</p>
//           ) : (
//             <div className="space-y-4">
//               {examList.map((exam) => (
//                 <div key={exam._id} className="flex items-center justify-between bg-white shadow rounded-lg p-4">
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-900">{exam.examName}</h3>
//                     <p className="text-sm text-gray-500">Subject: {exam.subject}</p>
//                   </div>
//                   <Button
//                     variant="outline"
//                     onClick={() => handleDiscussionNavigate(exam._id)}
//                     className="flex items-center gap-2"
//                   >
//                     <MessageCircle className="w-4 h-4" /> Discussion
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           )}
//         {/* </div> */}
//       </div>
//     </>
//   );
// };

// export default StudentExamList;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const StudentExamList = () => {
  const [examList, setExamList] = useState([]);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  // 👇 Decode token to get user ID
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken?._id;

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/exam/student-results/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("data", response.data);

        const exams = response.data?.data?.examResults || [];
        setExamList(exams);
      } catch (error) {
        console.error("Failed to fetch student exams", error);
      }
    };

    if (userId) fetchExams();
  }, [userId, token]);

  const handleDiscussionNavigate = (examId) => {
    navigate(`/std-discussion/${examId}`);
  };
  const handleResultNavigate = (examId) => {
    navigate(`/std-discussion/${examId}`);
  };

  return (
    <div className="p-6 w-[1300px] ml-[230px] bg-[#f8f9fc] min-h-screen overflow-y-auto">
      <div className="p-3.5">

      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Exams</h2>
      {examList.length === 0 ? (
        <p className="text-gray-600">No exams attempted yet.</p>
      ) : (
        <div className="space-y-4">
          {examList.map((exam) => (
            <div
              key={exam.examDetails.examId}
              className="flex items-center justify-between bg-white shadow rounded-lg p-4"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-900">{exam.examDetails?.examName}</h3>
                <p className="text-sm text-gray-500">Subject: {exam.examDetails?.subject}</p>
              </div>
              <Button
                variant="outline"
                onClick={() => handleDiscussionNavigate(exam.examDetails.examId)}
                className="flex items-center gap-2 bg-[#FF884D] text-white"
              >
                <MessageCircle className="w-4 h-4" /> Discussion
              </Button>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default StudentExamList;
