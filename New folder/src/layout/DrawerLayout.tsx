import path from 'path'
import React, { useMemo } from 'react'
import {  jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import homelogo from '@/assets/homelogo.jpg'
const adminItems=[
    {label : "Dashboard",path:"/admin-dashboard"},
    {label : "Exam",path:"/admin-exam"},

]
const studentItems=[
    // {label : "Dashboard",path:"/std-dashboard"},
    {label : "Exam",path:"/std-exam"},
    {label :"All given exam",path:"/std-givenexam"},
    {label :"Discussion",path:"/std-discussion/:examId"},
    {label :"Result",path:"/std-result/:examId"},
    // {label :"Profile",path:"/std-profile"}

]
const creatorItems=[
    {label : "Dashboard",path:"/creator-dashboard"},
    {label : "Exam",path:"/creator-exam"},
    {label : "View exams",path:"/creator-viewexam"},
    {label :"LeaderBoard",path:"/creator-leaderboard/:examId"},
    {label :"Discussion",path:"/creator-discussion/:examId/:userId"},
    // {label :"Profile",path:"/creator-profile"}


]
const DrawerLayout = () => {
  const navigate = useNavigate();
  const checkUserRole = useMemo(() => {
    const decodedToken: any = jwtDecode(sessionStorage.getItem("token") ?? "");
    return decodedToken?.role ?? "";
  }, []);

  return (
    <section>
      <div className="fixed h-full">
        <aside className="w-[100%]   h-full sticky p-4 slider text-lg bg-[#FF884D]  overflow-auto shadow-2xl max-h-screen">
          <nav className="flex justify-center items-center bg-none">
            <img src={homelogo} alt="LOGO" className="h-24 w-[200px]" />
          </nav>
          <hr className="h-0.5 mx-2 my-3 bg-gray-500 border-0 rounded dark:bg-gray-400" />
          <div className="pb-4">
          {checkUserRole === "student" &&
              studentItems.map((item) => (
                <div
                  className="pl-3 drawerIcon rounded hover:bg-[#d8cfea] hover:text-[#422b72]  transition duration-500 pt-3 ease-in-out hover:transform hover:scale-105 hover:shadow-lg cursor-pointer"
                  key={item.label}
                >
                  <span onClick={() => navigate(item.path)}>
                    {item.label}
                  </span>
                </div>
              ))}
          {checkUserRole === "admin" &&
              adminItems.map((item) => (
                <div
                  className="pl-3 drawerIcon rounded hover:bg-[#d8cfea] hover:text-[#422b72]  transition duration-500 ease-in-out pt-3 hover:transform hover:scale-105 hover:shadow-lg cursor-pointer"
                  key={item.label}
                >
                  <span onClick={() => navigate(item.path)}>
                    {item.label}
                  </span>
                </div>
              ))}
          {checkUserRole === "creator" &&
              creatorItems.map((item) => (
                <div
                  className="pl-3 drawerIcon rounded hover:bg-[#d8cfea] hover:text-[#422b72]  transition duration-500 ease-in-out pt-3 hover:transform hover:scale-105 hover:shadow-lg cursor-pointer"
                  key={item.label}
                >
                  <span onClick={() => navigate(item.path)}>
                    {item.label}
                  </span>
                </div>
              ))}

  
          </div>
        </aside>
      </div>
    </section>
  )
}

export default DrawerLayout

 // <div className="flex">
    //   {/* Left Panel - Answer Sheet and Timer */}
    //   <div className="w-[250px] bg-white border-r border-gray-200 p-4 min-h-screen">
    //     <h2 className="text-lg font-bold mb-4">Answer sheet</h2>
    //     <div className="grid grid-cols-2 gap-2 mb-8">
    //       {[1, 2, 3, 4, 5, 6, 7].map((num) => (
    //         <button
    //           key={num}
    //           className="w-12 h-10 border border-gray-300 rounded text-gray-700 hover:bg-blue-100"
    //         >
    //           {num}
    //         </button>
    //       ))}
    //     </div>
    //     <div className="text-gray-700 font-medium text-sm mb-2">Total remaining time</div>
    //     <div className="text-2xl font-bold text-red-500 mb-4">29:48</div>
    //     <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Submit</button>
    //   </div>

    //   {/* Right Panel - Question Area */}
    //   <div className="p-6 w-full bg-[#f8f9fc] min-h-screen overflow-y-auto">
    //     <div className="bg-white p-6 rounded-lg shadow">
    //       <h3 className="font-semibold mb-4">
    //         1. Multiple Choice: Based on the information in the question, select the correct answer. (1PT)
    //       </h3>
    //       <p className="mb-4 text-gray-700">
    //         Children of the family member is at least a Humpty and a Dumpty.
    //         The input file will be given in the format: &lt;member name, ID&gt;
    //         &lt;age&gt; &lt;child member name, ID&gt;
    //       </p>
    //       <div className="space-y-2">
    //         <div><input type="radio" name="q1" /> Option 1</div>
    //         <div><input type="radio" name="q1" /> Option 2</div>
    //         <div><input type="radio" name="q1" /> Option 3</div>
    //         <div><input type="radio" name="q1" /> Option 4</div>
    //       </div>
    //       <button className="mt-6 bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded">
    //         Next Question
    //       </button>
    //     </div>
    //   </div>
    // </div>