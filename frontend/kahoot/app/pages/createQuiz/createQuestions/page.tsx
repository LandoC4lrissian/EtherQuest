"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { readContract, writeContract } from "@wagmi/core";
import { QuizContractFactoryABI } from "../../../../utils/quizContractFactory.json";
import { config } from "../../../../utils/config";
import { QuizContractABI } from "../../../../utils/quizContract.json";
import { parseEther } from "viem";
import { useQuery } from "@tanstack/react-query";

const CreateQuestions = () => {
  const [questionCount, setQuestionCount] = useState(0);
  const [quizContractAddress, setQuizContractAddress] = useState("");
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);

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

  // Adresin formatını kontrol edip düzeltme fonksiyonu
  const formatAddress = (address: any) => {
    if (!address.startsWith("0x")) {
      return `0x${address}`;
    }
    return address;
  };

  // addQuestion fonksiyonu çağırılacak 1 soru 4 cevap ve doğru cevap numarası alacak
  async function addQuestion() {
    const formattedAddress = formatAddress(quizContractAddress);
    console.log("Formatted Address:", formattedAddress);

    // Parametrelerin geçerliliğini kontrol edin
    if (!question) {
      console.error("Question is empty");
      return;
    }
    if (
      answers.length !== 4 ||
      answers.some((answer) => answer.trim() === "")
    ) {
      console.error("All 4 answers must be provided and cannot be empty");
      return;
    }
    if (correctAnswer < 0 || correctAnswer > 3) {
      console.error("Correct answer index must be between 0 and 3");
      return;
    }

    // Gönderilen argümanların doğru olup olmadığını kontrol et
    console.log("Sending to contract:", question, answers, correctAnswer);

    try {
      await writeContract(config, {
        abi: QuizContractABI,
        address: formattedAddress,
        functionName: "addQuestion",
        args: [question, answers, correctAnswer],
      });
      console.log("Question added successfully");
    } catch (error: any) {
      console.error("Error adding question:", error);
      if (error.data && error.data.message) {
        console.error("Contract error message:", error.data.message);
      }
    }
  }

  // Cevapları güncellemek için bir yardımcı fonksiyon
  const updateAnswer = (index: any, value: any) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  console.log("Quiz Contract Address:", quizContractAddress);
  console.log("Question Count:", questionCount);
  console.log("Question:", question);
  console.log("Answers:", answers);
  console.log("Correct Answer:", correctAnswer);

  return (
    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 min-h-screen">
      <div className="flex justify-center items-center pt-44">
        <form className="w-[750px] h-[600px] bg-orange-300 border-black border-2 rounded-2xl flex flex-col space-y-4 justify-center items-center">
          <h1 className="text-4xl font-bold">Add Your Questions</h1>
          <div className="flex flex-col justify-center items-center space-y-6">
            <textarea
              className="w-[400px] h-24 rounded-xl border-black border-2"
              id="Question"
              placeholder="Question"
              onChange={(e) => setQuestion(e.target.value)}
            ></textarea>
            <input
              className="w-[400px] h-8 rounded-xl border-black border-2"
              type="text"
              placeholder="Answer 1"
              onChange={(e) => updateAnswer(0, e.target.value)}
            />
            <input
              className="w-[400px] h-8 rounded-xl border-black border-2"
              type="text"
              placeholder="Answer 2"
              onChange={(e) => updateAnswer(1, e.target.value)}
            />
            <input
              className="w-[400px] h-8 rounded-xl border-black border-2"
              type="text"
              placeholder="Answer 3"
              onChange={(e) => updateAnswer(2, e.target.value)}
            />
            <input
              className="w-[400px] h-8 rounded-xl border-black border-2"
              type="text"
              placeholder="Answer 4"
              onChange={(e) => updateAnswer(3, e.target.value)}
            />
            <input
              className="w-[400px] h-8 rounded-xl border-black border-2"
              type="number"
              placeholder="Correct Answer (Write which of 0, 1, 2, 3)"
              onChange={(e) => setCorrectAnswer(Number(e.target.value))}
            />
          </div>
        </form>
        <motion.button
          className="w-64 h-8 bg-slate-600 rounded-xl font-bold"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => addQuestion()}
        >
          Add Question
        </motion.button>
      </div>
    </div>
  );
};

export default CreateQuestions;
