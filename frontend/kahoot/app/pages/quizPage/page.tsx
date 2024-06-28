"use client";
import QuestionCard from "@/app/components/questionCard";
import React, { useEffect, useState } from "react";
import { readContract, writeContract } from "@wagmi/core";
import { config } from "../../../utils/config";
import { useQuery } from "@tanstack/react-query";
import { QuizContractABI } from "../../../utils/quizContract.json";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const QuizPage = () => {
  const [questionCount, setQuestionCount] = useState(0);
  const [quizContractAddress, setQuizContractAddress] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [quizQuestions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
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

  const {
    data: questions,
    refetch,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["questions"],
    refetchOnMount: false,
    queryFn: async () => {
      const data: any = await readContract(config, {
        abi: QuizContractABI,
        address: formatAddress(quizContractAddress),
        functionName: "getQuestions",
      });
      return data;
    },
  });
  console.log(questions);

  async function questionInfo(questions: any) {
    return setQuestions(questions);
  }

  useEffect(() => {
    if (questions !== undefined) questionInfo(questions);
  }, [questions]);

  async function getQuestionCount() {
    const questionCount = await readContract(config, {
      abi: QuizContractABI,
      address: formatAddress(quizContractAddress),
      functionName: "getQuestionCount",
    });
    const count = Number(questionCount);
    setQuestionCount(count);
  }

  const { data: questionCountData } = useQuery({
    queryKey: ["questionCount"],
    refetchOnMount: false,
    queryFn: async () => {
      const data: any = await readContract(config, {
        abi: QuizContractABI,
        address: formatAddress(quizContractAddress),
        functionName: "getQuestionCount",
      });
      return setQuestionCount(Number(data));
    },
  });

  async function answerQuestion() {
    try {
      // Ensure selectedOption is an array
      if (!Array.isArray(selectedOptions)) {
        throw new Error("selectedOption is not an array");
      }

      const answer = await writeContract(config, {
        abi: QuizContractABI,
        address: formatAddress(quizContractAddress),
        functionName: "answer",
        args: [selectedOptions],
      });
      console.log(answer);
    } catch (error) {
      console.error("Error answering question:", error);
    }
  }

  return (
    <div className="flex flex-row justify-center items-center bg-gradient-to-r from-violet-600 to-indigo-600 min-h-screen  ">
      <div className="flex flex-col justify-center items-center">
        {isLoading ? (
          <div className="text-white">Loading...</div>
        ) : isFetched && questions ? (
          <QuestionCard
            selectedOption={selectedOptions[questionIndex]}
            setSelectedOption={(option) => {
              const newSelectedOptions = [...selectedOptions];
              newSelectedOptions[questionIndex] = option[0]; // Tek seçenek
              setSelectedOptions(newSelectedOptions);
            }}
            quizQuestions={quizQuestions}
            questionIndex={questionIndex}
          />
        ) : (
          <div className="text-white">No data available</div>
        )}
        <motion.button
          className="w-44 h-10 mt-4 bg-gradient-to-r from-violet-200 to-violet-700 rounded-2xl font-bold text-xl"
          onClick={() => answerQuestion()}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Finish Quiz
        </motion.button>
      </div>
      {questionIndex < questionCount - 1 && (
        <motion.button
          className="w-44 h-10 ml-4 bg-gradient-to-r from-violet-200 to-violet-700 rounded-2xl font-bold text-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setQuestionIndex(questionIndex + 1);
          }}
        >
          Next Question
        </motion.button>
      )}
    </div>
  );
};

export default QuizPage;
