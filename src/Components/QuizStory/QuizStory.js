import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const QuizStory = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(
      imageRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(
      textRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );

  }, []);

  return (
    <div ref={containerRef} className="flex flex-col md:flex-row items-center bg-white p-12 md:p-20 rounded-lg shadow-2xl w-full mx-auto relative overflow-hidden min-h-screen">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-blue-50 opacity-20 rounded-lg"></div>
      
      {/* Image Section */}
      <div className="md:w-1/2 flex justify-center relative z-10">
        <img
          src="https://www.gifcen.com/wp-content/uploads/2021/05/quiz-gif.gif"
          alt="Team Discussion"
          className="w-80 h-80 md:w-[500px] md:h-[500px] rounded-full object-cover shadow-2xl border-4 border-blue-300"
        />
        {/* Decorative Elements */}
       
      </div>

      {/* Text Section */}
      <div ref={textRef} className="md:w-1/2 text-center md:text-left mt-8 md:mt-0 z-10">
        <h2 className="text-4xl md:text-6xl font-extrabold text-blue-700 leading-tight">
          <span className="text-yellow-500">Discover</span> the <br /> Story Behind Our Quizzes
        </h2>
        <p className="text-gray-700 mt-6 text-lg md:text-2xl leading-relaxed">
          Take a behind-the-scenes look at our quiz website and learn more about
          the people who create our quizzes and the stories behind them.
        </p>
        {/* Button */}
        <div className="mt-8">
          <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-semibold text-xl hover:bg-blue-700 transition-all shadow-lg transform hover:scale-105">
            Know about us
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizStory;
