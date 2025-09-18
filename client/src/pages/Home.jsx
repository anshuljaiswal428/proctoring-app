import React from "react";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <BackgroundBeamsWithCollision>
      <div className="flex flex-col items-center gap-6">
        {/* Heading */}
        <h2 className="text-2xl md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
          Smart Video Proctoring.{" "}
          <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span>  For Online Interview</span>
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
              <span>  For Online Interview</span>
            </div>
          </div>
        </h2>

        {/* Gradient Border Button */}
        <div className="relative inline-block group rounded-3xl p-[3px] bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">
          <button
            onClick={() => navigate("/interview-screen")}
            className="w-full h-full min-w-[240px] min-h-15 px-14 py-6 text-2xl font-bold font-sans tracking-tight 
               text-white bg-black rounded-3xl 
               transition duration-300 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:via-violet-500 group-hover:to-pink-500"
          >
            Start Interview
          </button>
        </div>


      </div>
    </BackgroundBeamsWithCollision>
  );
}
