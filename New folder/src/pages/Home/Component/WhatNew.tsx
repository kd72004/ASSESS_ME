import React from 'react'
import chartImage from '@/assets/chart-removebg-preview.png'
import computer from '@/assets/computer-removebg-preview.png'
import ai from '@/assets/mind.png'
import timer from '@/assets/timer-removebg-preview.png'
const WhatNew = () => {
  return (
    <div className="py-20 px-8">
      <div className="max-w-6xl my-0 mx-auto mt-10">
        <div className="flex flex-col gap-5 text-center mx-44 mb-10 ">
          <h1 className="font-semibold text-5xl text-[#422b72] mb-4">
            What's new at AssessMe?
          </h1>
        </div>

        <div className="mt-8 flex gap-8 ">
          <div className="flex-1 bg-[#F7D8F3] rounded-xl px-8 pt-8 pb-6 mb-8 flex gap-5 flex-col-reverse justify-between	">
            <div className="overflow-hidden relative pt-2">
              <img className="h-14" src={chartImage} alt="" />
            </div>
            <div className="">
              <h5 className="text-[#422b72] font-semibold mb-5 leading-7 text-2xl">
              Now, after completing an exam, students can view their detailed results with an interactive performance graph.
              </h5>
              <div className="text-[#625480] leading-6 text-xl">
              This feature provides insights into their strengths and weaknesses, helping them track progress effectively. With a clear visual representation of scores, students can analyze their performance subject-wise and improve for future assessments. 🚀📊
              </div>
            </div>
          </div>

          <div className="flex-1 bg-[#FDEAE2] rounded-xl px-8 pt-8 pb-6 mb-8 flex gap-5 flex-col-reverse justify-between	">
            <div className="overflow-hidden relative pt-2 grid grid-cols-7 ">
              <img className="h-14" src={computer} alt="" />
              <img className="h-14" src={ai} alt="" />
              <img className="h-14" src={timer} alt="" />
            </div>
            <div className="">
              <h5 className="text-[#422b72] font-semibold mb-5 leading-7 text-2xl">
              Exciting new updates in Assess Me!              </h5>
              <div className="text-[#625480] leading-6 text-xl">
              creators can generate questions using AI, making exam creation faster and more efficient. Simply enter a topic, and AI will generate relevant questions instantly. Plus, set a timer for each exam to ensure a structured and time-bound assessment experience. These features make exam management seamless and more engaging! 🚀⏳🤖
              </div>
              <a
                href=""
                className="text-[#422b72] mt-6 inline-block font-semibold "
              >
                Invite your team to track time
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default WhatNew