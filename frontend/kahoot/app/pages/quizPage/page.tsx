"use client";
import QuestionCard from '@/app/components/questionCard';
import React, { useEffect, useState } from "react";
import { readContract, writeContract } from "@wagmi/core";
import { config } from "../../../utils/config";
import { useQuery } from "@tanstack/react-query";
import { QuizContractABI } from "../../../utils/quizContract.json";

const QuizPage = () => {
  const [questionCount, setQuestionCount] = useState(0);
  const [quizContractAddress, setQuizContractAddress] = useState("");
  const [selectedOption, setSelectedOption] = useState<number[]>([]);
 const option = [1,1]
  useEffect(() => {
    const address = localStorage.getItem("quizContractAddress");
    const count = localStorage.getItem("questionCount");

    if (address) {
      setQuizContractAddress(address);
    }

    if (count) {
      setQuestionCount(Number(count));
    }
  }, []);

  const formatAddress = (address: any) => {
    if (!address.startsWith("0x")) {
      return `0x${address}`;
    }
    return address;
  };

  async function getQuestions() {
   const questions = await readContract(config,{
      abi: QuizContractABI,
      address: formatAddress(quizContractAddress),
      functionName: "getQuestions",
    })
    console.log(questions);
  };
  
  async function getQuestionCount() {
    const questionCount = await readContract(config, {
      abi: QuizContractABI,
      address: formatAddress(quizContractAddress),
      functionName: "getQuestionCount",
    });
    const count = Number(questionCount);
    console.log(questionCount);
    console.log(count);
  }

  async function answerQuestion() {
    try {
      // Ensure selectedOption is an array
      if (!Array.isArray(selectedOption)) {
        throw new Error("selectedOption is not an array");
      }

      const answer = await writeContract(config, {
        abi: QuizContractABI,
        address: formatAddress(quizContractAddress),
        functionName: "answer",
        args: [option],
      });
      console.log(answer);
    } catch (error) {
      console.error("Error answering question:", error);
    }
  }

  return (
    <div className='bg-gradient-to-r from-violet-600 to-indigo-600 min-h-screen flex justify-center items-center'>
      <QuestionCard selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <button className='bg-slate-500 w-20 h-20' onClick={() => getQuestions()}>sorular</button>
      <button className='bg-slate-500 w-20 h-20' onClick={() => getQuestionCount()}>Count</button>
      <button className='bg-slate-500 w-20 h-20' onClick={() => answerQuestion()}>answer</button>
    </div>
  )
}

export default QuizPage;