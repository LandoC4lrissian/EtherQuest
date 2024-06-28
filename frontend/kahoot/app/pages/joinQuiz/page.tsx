"use client";
import QuestionCard from "@/app/components/questionCard";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { QuizContractABI } from "../../../utils/quizContract.json";
import { readContract, writeContract } from "@wagmi/core";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { config } from "../../../utils/config";

const JoinQuiz = () => {
  const [quizContractAddress, setQuizContractAddress] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [selectedQuizContract, setSelectedQuizContract] = useState("");
  const router = useRouter();

  useEffect(() => {
    const address = localStorage.getItem("quizContractAddress");

    if (address) {
      setQuizContractAddress(address);
    }
  }, []);

  const formatAddress = (address: any) => {
    if (!address.startsWith("0x")) {
      return `0x${address}`;
    }
    return address;
  };
  
  const handleJoinQuiz = (event: React.FormEvent) => {
    event.preventDefault();
    if (formatAddress(quizContractAddress) === selectedQuizContract) {
      router.push("/pages/quizPage");
    } else {
      alert("Invalid Quiz Contract Address");
    }
  };

  return (
    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 min-h-screen justify-center items-center flex">
      <form 
        className="w-[550px] h-[200px] bg-orange-300 border-black border-2 rounded-2xl items-center justify-center flex flex-col space-y-8"
        onSubmit={handleJoinQuiz}
      >
        <input
          className="rounded-xl h-8 text-center w-[500px] border-black border-2"
          type="text"
          placeholder="Quiz Contract Address"
          onChange={(event) => setSelectedQuizContract(event.target.value)}
        />
        <motion.button
          className="w-44 h-10  bg-gradient-to-r from-violet-200 to-violet-700 rounded-2xl font-bold text-xl"
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
