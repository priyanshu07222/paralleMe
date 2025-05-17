"use client"
import { useState } from "react";
import { motion } from "motion/react";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [twitterId, setTwitterId] = useState("")


  const handleClick = async() => {
    if(!twitterId){
      alert("please enter user twitter username")
      return null
    }
    const response = await axios.post('/api/analyze-tweet', {userName: twitterId})
    console.log(response.data)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-500 via-zinc-200 to-white-200 text-center p-4 font-sans bg-black text-white">
      <section className="py-12">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-7xl font-bold text-black mb-4"
        >
          Parallel Me ❤️‍🩹
        </motion.h1>
        <p className="text-lg md:text-2xl text-gray-800 ">
        Find your alternate universe identity and your chaotic-cute cosmic lover... based on your Twitter personality
        </p>
      </section>

      <input type="text" placeholder="twitter username" onChange={(e) => setTwitterId(e.target.value) } className="p-2 rounded w-1/3 outline-none mx-auto my-4 border-gray-600 border text-black" />
      <button onClick={handleClick} className="bg-black text-white px-4 py-2 cursor-pointer rounded mx-4">submit</button>

      <footer className="mt-86 text-sm text-gray-600">
        Built with 💘 by Priyanshu | @ParallelMeApp
      </footer>
    </main>
  );
}
