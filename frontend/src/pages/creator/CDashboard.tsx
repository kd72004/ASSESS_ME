import React, { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineUserAdd } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlineImportContacts } from "react-icons/md";
import { PiExamBold } from "react-icons/pi";

import { FaBrain } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

import PaginationCom from "@/common/Pagination";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CDashboard = () => {
  const navigate = useNavigate();
   const token = sessionStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken._id;
    const name = decodedToken.name;
  
  const [tableData, setTableData] = useState([]);
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/exam/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });        
        const activeExams = response.data.data.filter((exam) => exam.isActive === true);
        setTableData(activeExams);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const currentItems = tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  return (
    <div className="p-6 w-[1300px] ml-[230px] bg-[#f8f9fc] min-h-screen overflow-y-auto">
      <div className="mt-10">
        {/* Greeting */}
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-orange-500">
          Hello <span className=" font-bold">{name}</span>, welcome to{" "}
          <span className="text-orange-500 font-bold">AssessMe</span>
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Active exam takers</p>
              <h3 className="text-4xl font-bold text-[#6985f7]">0</h3>
            </div>
            <div>
              <p className="text-sm text-gray-500">Active exams</p>
              <h3 className="text-4xl font-bold text-[#6985f7]">1</h3>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex justify-around h-[100px]">
            <div className="text-center">
              <p className="text-sm text-gray-500">Exams</p>
              <h3 className="text-4xl font-bold text-[#6985f7]">1</h3>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Questions</p>
              <h3 className="text-4xl font-bold text-[#6985f7]">0</h3>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Students</p>
              <h3 className="text-4xl font-bold text-[#6985f7]">0</h3>
            </div>
          </div>
        </div>

        {/* Active Exams Table */}
        <div className="bg-white text-black rounded-xl shadow p-4 mb-6">
          <h3 className="text-xl  font-semibold mb-4">Active exams</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="rounded-xl">
                <tr className="bg-[#e6e1e0] text-left">
                  <th className="p-2">Subject</th>
                  <th className="p-2">Exam titles</th>
                  <th className="p-2">Start date</th>
                  <th className="p-2">End date</th>
                  <th className="p-2">Total marks</th>
                  <th className="p-2">Passing Marks</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((exam, index) => (
                  <tr className="border-t" key={index}>
                    <td className="p-2">{exam.subject}</td>
                    <td className="p-2">{exam.examName}</td>
                    <td className="p-2">{exam.startDate}</td>
                    <td className="p-2">{exam.endDate}</td>
                    <td className="p-2">{exam.totalMarks}</td>
                    <td className="p-2">{exam.passingMarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-4 gap-2 text-sm text-gray-500">
            <PaginationCom
              tableData={tableData}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6 text-black">
          <h3 className="text-lg font-semibold mb-4">Quick actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <ActionCard icon={<AiOutlinePlus className="text-blue-500 text-2xl"/>} title="Add new exam" onClick={()=>navigate("/creator-exam")}/>
            <ActionCard icon={<FiUpload className="text-orange-500 text-2xl" />} title="Import questions" />
            <ActionCard icon={<FaBrain className=" text-blue-500" />} title="AI Generator" />
            <ActionCard icon={<AiOutlineUserAdd className="text-blue-500 text-2xl" />} title="Add students" />
          </div>
        </div>

        {/* Recently Used */}
        <div className="mb-4 text-black">
          <h3 className="text-sm text-gray-500 mb-2">Recently used</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ActionCard icon={<PiExamBold className="text-blue-500 text-xl rounded-full" />} title="Exam List" />
            <ActionCard icon={<PiStudentBold className="text-blue-500 text-xl" />} title="Student List" />
            <ActionCard icon={<MdOutlineImportContacts className="text-orange-500 text-xl" />} title="Batch Import" />
          </div>
        </div>
      </div>
    </div>
  );
};
const ActionCard = ({ icon, title }: any) => (
  <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3 cursor-pointer hover:shadow-md transition">
    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">{icon}</div>
    <span className="text-sm font-medium">{title}</span>
  </div>
);

export default CDashboard;
