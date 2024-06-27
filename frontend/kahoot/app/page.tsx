"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
export default function Home() {
  return (
    <main className="min-h-screen flex justify-center items-center space-x-12 bg-gradient-to-r from-violet-600 to-indigo-600">
      <Link href={"./pages/createQuiz"}>
        <motion.button
          className="w-64 h-16 bg-gradient-to-r from-amber-200 to-yellow-500 rounded-2xl font-bold text-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Create Quiz
        </motion.button>
      </Link>
      <Link href={"./pages/joinQuiz"}>
        <motion.button
          className="w-64 h-16 bg-gradient-to-r from-amber-200 to-yellow-500 rounded-2xl font-bold text-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Join Quiz
        </motion.button>
      </Link>
    </main>
  );
}
