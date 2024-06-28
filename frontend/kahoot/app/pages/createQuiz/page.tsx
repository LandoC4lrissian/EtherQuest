"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { readContract, writeContract } from "@wagmi/core";
import { QuizContractFactoryABI } from "../../../utils/quizContractFactory.json";
import { config } from "../../../utils/config";
import { parseEther } from "viem";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const CreateQuiz = () => {
  const { address } = useAccount();
  const [questionCount, setQuestionCount] = useState(0);
  const [ethAmount, setEthAmount] = useState<number>(0);
  const factoryAddress = "0xd60dc6d225acbf3dcff3fd8da23cfe2d5e2dd662";
  const router = useRouter();
  const [isFirstRender, setIsFirstRender] = useState(true);

  async function createQuizContract({ ethAmount }: { ethAmount: number }) {
    const price = parseEther(ethAmount.toString());
    console.log(price);
    await writeContract(config, {
      abi: QuizContractFactoryABI,
      address: factoryAddress,
      functionName: "createQuiz",
      value: price,
    });
  }

  const {
    data: quizContractAddresses,
    isLoading,
    status,
    refetch,
  } = useQuery({
    queryKey: ["quizContractAddresses"],
    refetchOnMount: false,
    // enabled: isFirstRender,
    queryFn: async () => {
      try {
        const data: any = await readContract(config, {
          abi: QuizContractFactoryABI,
          address: factoryAddress,
          functionName: "getDeployedQuizzes", 
        });
        console.log(data);
        if (!data || !Array.isArray(data) || data.length === 0) {
          throw new Error("No deployed quizzes found");
        }
        return data;
      } catch (error) {
        console.error("Error fetching contract data:", error);
        throw error;
      }
    },
  });

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      refetch(); // İlk render'dan sonra yeniden sorgulamak için
    }
  }, [isFirstRender, refetch]);

  const handleCreateQuiz = async () => {
    try {
      // Quiz kontratı oluşturma işlemi
      await createQuizContract({ ethAmount });
  
      // 18 saniye bekle ve refetch
      await new Promise(resolve => setTimeout(resolve, 18000));
      const refetchResult1 = await refetch();
  
      // 5 saniye bekle ve tekrar refetch
      await new Promise(resolve => setTimeout(resolve, 5000));
      const refetchResult2 = await refetch();
  
      // Refetch işlemlerinden sonra kontrat adreslerini kontrol et ve güncelle
      const quizContractAddresses = refetchResult2.data;
      if (quizContractAddresses && quizContractAddresses.length > 0) {
        const newQuizContractAddress = quizContractAddresses[quizContractAddresses.length - 1];
        localStorage.setItem("quizContractAddress", newQuizContractAddress);
  
        // Yönlendirme işlemi
        router.push("/pages/createQuiz/createQuestions");
      } else {
        throw new Error("No quiz contract addresses found");
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
      // Hata durumunda kullanıcıya geri bildirim gösterilebilir veya işlem tekrar denenebilir
    }
  };
  
  
  

  return (
    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 min-h-screen flex justify-center items-center">
      <div className="w-[750px] h-[600px] bg-orange-300 border-black border-2 rounded-2xl items-center justify-center flex flex-col ">
        <form className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold pb-16">Create Your Quiz</h1>
          <div className="flex flex-col justify-center items-center space-y-6">
            <input
              className="w-[400px] h-16 rounded-xl border-black border-2 text-xl"
              type="number"
              placeholder="Min 0.01 ETH"
              step="0.01"
              onChange={(e) => setEthAmount(Number(e.target.value))}
            />
          </div>
        </form>
        <motion.button
          className="w-64 h-12 bg-gradient-to-r from-violet-200 to-violet-700 rounded-xl font-bold text-xl mt-8"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleCreateQuiz()}
        >
          Create Quiz
        </motion.button>
      </div>
    </div>
  );
};

export default CreateQuiz;
