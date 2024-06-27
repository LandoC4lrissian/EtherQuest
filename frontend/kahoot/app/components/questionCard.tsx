import React from "react";
import { motion } from "framer-motion";

const QuestionCard = ({ selectedOption, setSelectedOption }: { selectedOption: number[], setSelectedOption: (option: number[]) => void }) => {
  const questionIndex: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  console.log(selectedOption);

  const handleOptionClick = (option: number) => {
    // Tek bir seçeneği seçmek için dizi içinde tek bir eleman olarak güncelle
    setSelectedOption([option]);
  };

  return (
    <div className="w-[500px] h-96 bg-orange-500 rounded-xl flex flex-col space-y-8 items-center p-4">
      <h1 className="">Question {questionIndex[2]}</h1>
      <p className="flex text-center overflow-auto max-w-full max-h-32">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, unde
        tenetur quod provident in nemo distinctio libero, suscipit facere
        assumenda, maxime mollitia omnis perspiciatis adipisci neque sequi vitae
        aspernatur. Veniam.
      </p>
      <div className="flex flex-col space-y-10">
        <div className="flex flex-row space-x-10">
          <motion.button
            className="flex text-center items-center justify-center w-44 h-12 bg-green-500 rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleOptionClick(1)}
          >
            Option 1
          </motion.button>
          <motion.button
            className="flex text-center items-center justify-center w-44 h-12 bg-green-500 rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleOptionClick(2)}
          >
            Option 2
          </motion.button>
        </div>
        <div className="flex flex-row space-x-10">
          <motion.button
            className="flex text-center items-center justify-center w-44 h-12 bg-green-500 rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleOptionClick(3)}
          >
            Option 3
          </motion.button>
          <motion.button
            className="flex text-center items-center justify-center w-44 h-12 bg-green-500 rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleOptionClick(4)}
          >
            Option 4
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
