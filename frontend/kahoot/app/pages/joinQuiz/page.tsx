"use client";
import QuestionCard from "@/app/components/questionCard";
import React from "react";
import { motion } from "framer-motion";

const JoinQuiz = () => {
  return (
    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 min-h-screen justify-center items-center flex">
      <form className="w-[550px] h-[200px] bg-orange-300 border-black border-2 rounded-2xl items-center justify-center flex flex-col space-y-8">
        <input className="rounded-xl h-8 text-center w-[500px] border-black border-2" type="text" placeholder="Quiz Contract Address"/>
        <motion.button
          className="w-44 h-10 bg-gradient-to-r from-amber-200 to-yellow-500 rounded-2xl font-bold text-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
        >
          Join Quiz
        </motion.button>
      </form>
    </div>
  );
};

export default JoinQuiz;
