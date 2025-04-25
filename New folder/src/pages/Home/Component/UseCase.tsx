import billingInvoicing from "@/assets/billing-invoicing.avif";
import ranking from "@/assets/ranking-removebg-preview.png";

const UseCase = () => {
  return (
    <>
      <section className="py-20 px-8 text-[#422b72] font-sans bg-[#FDF1EC]	">
        <div className="mx-36 mt-10">
          <div className="mx-48 mb-9 text-center font-sans flex gap-5 flex-col">
            <p className="font-semibold text-3xl">WHAT'S YOUR USE CASE?</p>
            {/* <p className="font-bold text-5xl">
              Tracking accurately, measure Time, manage projects and teams{" "}
              <br /> we’ve got ‘em all
            </p> */}
          </div>
          <div className="flex flex-col gap-10 mt-28">
            <div className="flex gap-18">
              <div className="basis-2/3 p-6 ">
                <p className="text-3xl font-semibold text-[#E57CD8] uppercase">
                  Detailed Insights at
                  <b className="text-3xl lowercase">assessMe</b>
                </p>

                <div className="text-xl max-w-lg">
                  Identify strengths and weaknesses with comprehensive performance reports. Review challenging questions
                  and understand areas needing improvement to enhance learning outcomes.
                </div>
                <p className="font-bold text-2xl my-4">Leaderboard & Rankings </p>
                <div className="text-xl max-w-lg">
                  Encourage healthy competition with real-time leaderboards. Rank students based on performance and
                  provide motivation for continuous improvement.{" "}
                </div>
              </div>
              <div className="basis-2/3		flex justify-center ">
                <img src={billingInvoicing} className="h-96" alt="none" />
              </div>
            </div>

            <div className="flex gap-20  ">
              <div className="basis-2/3 ml-4	flex">
                <img src={ranking} className="h-full w-[190%]" alt="none" />
              </div>
              <div className="basis-7/12 p-6 ">
                <p className="text-3xl font-semibold text-[#E57CD8] uppercase">
                  Discussion Section at <b className="text-3xl lowercase">AssessMe</b>
                </p>
                <div className="text-xl max-w-lg">
                  Enable post-exam discussions where students can clarify doubts and analyze solutions. With multimedia
                  support, users can upload images and videos for better explanations.
                </div>
                <p className="font-bold text-2xl my-4">Multimedia Support</p>
                <div className="text-xl max-w-lg">
                  Enhance learning with rich media support. Upload images and videos to questions and answers, making
                  assessments more interactive and engaging.{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UseCase;
