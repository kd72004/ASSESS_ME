import { IoMdArrowDropright } from "react-icons/io";
import heroImage from "@/assets/homehero.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-[#FF884D] text-white p-28 top-10 h-1/12">
            <div className="flex mx-[31.667px] px-8 pt-3.5 gap-16">
                <div className="basis-2/4 ">
                    <h1 className="font-bold my-6 text-5xl text-left font-sans leading-tight">ASSESS ME</h1>
                    <h1 className="font-semibold my-6 text-4xl text-left font-sans leading-tight">
                        Smart exam and performance
                        <br /> Analysis.
                    </h1>
                    <p className="leading-6 max-w-[90%] text-xl">Empowering Smart & Scalable Online Examinations</p>
                    <p className="leading-6 max-w-[90%] text-xl">
                        AssessMe is an innovative, AI-powered online examination platform designed to make test creation,
                        administration, and performance analysis seamless. Whether you're an educator, corporate trainer, or
                        institution, AssessMe offers a feature-rich environment that enhances the examination process with
                        intelligent automation and security.
                    </p>
                    <div className="mt-8 mb-3 font-bold flex justify-start items-center gap-x-8 gap-y-5	">
                        <Button
                            type="submit"
                            onClick={() => navigate("/signup")}
                            className="bg-[#f0acac] px-9 py-4 text-base items-center rounded-full text-center  hover:bg-[#FF884D] h-14"
                        >
                            Register yourself
                        </Button>

                        <a className="text-base items-center text-center hover:text-white h-14 w-60 no-underline flex" href="/">
                            Or explore assess me <IoMdArrowDropright />
                        </a>
                    </div>
                </div>
                <div className=" basis-2/4">
                    <img src={heroImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
