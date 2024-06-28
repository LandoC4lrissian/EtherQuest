import React from "react";
import { motion } from "framer-motion";

const QuestionCard = ({
  selectedOption,
  setSelectedOption,
  quizQuestions,
  questionIndex,
}: {
  selectedOption: number;
  setSelectedOption: (option: number[]) => void;
  quizQuestions: any;
  questionIndex: number;
}) => {
  console.log("selectedOption", selectedOption);

  const handleOptionClick = (option: number) => {
    setSelectedOption([option]); // Tek bir seçeneği seçmek için dizi içinde tek bir eleman olarak güncelle
  };

  if (!quizQuestions || quizQuestions.length === 0) {
    return (
      <div className="w-[500px] h-96 bg-orange-300 rounded-xl flex flex-col space-y-8 items-center p-4">
        <h1 className="text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="w-[500px] h-96  bg-orange-300 rounded-xl flex flex-col space-y-8 items-center p-4 border-black border-2">
      <h1 className="text-3xl font-bold">Question</h1>
      <p className="flex text-center overflow-auto max-w-full max-h-32 font-bold text-lg">
        {quizQuestions[questionIndex].question}
      </p>
      <div className="flex flex-col space-y-10">
        <div className="flex flex-row space-x-10">
          <motion.button
            className={`flex text-center items-center justify-center w-44 h-12 rounded-lg text-lg ${
              selectedOption === 1 ? "bg-gradient-to-r from-cyan-300 to-cyan-700" : "bg-gradient-to-r from-violet-200 to-violet-700"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleOptionClick(1)}
          >
            {quizQuestions[questionIndex].answers[0]}
          </motion.button>
          <motion.button
            className={`flex text-center items-center justify-center w-44 h-12 rounded-lg  text-lg ${
              selectedOption === 2 ? "bg-gradient-to-r from-cyan-300 to-cyan-700" : "bg-gradient-to-r from-violet-200 to-violet-700"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleOptionClick(2)}
          >
            {quizQuestions[questionIndex].answers[1]}
          </motion.button>
        </div>
        <div className="flex flex-row space-x-10">
          <motion.button
            className={`flex text-center items-center justify-center w-44 h-12 rounded-lg text-lg ${
              selectedOption === 3 ? "bg-gradient-to-r from-cyan-300 to-cyan-700" : "bg-gradient-to-r from-violet-200 to-violet-700"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleOptionClick(3)}
          >
            {quizQuestions[questionIndex].answers[2]}
          </motion.button>
          <motion.button
            className={`flex text-center items-center justify-center w-44 h-12 rounded-lg  text-lg ${
              selectedOption === 4 ? "bg-gradient-to-r from-cyan-300 to-cyan-700" : "bg-gradient-to-r from-violet-200 to-violet-700"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleOptionClick(4)}
          >
            {quizQuestions[questionIndex].answers[3]}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
