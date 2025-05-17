"use client"
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Spotlight } from "@/components/ui/Spotlight";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { HowItWorksStep } from "@/components/ui/HowItWorksStep";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Digital Artist",
    content: "I was amazed by how accurately ParallelMe captured my personality! The AI-generated image of my parallel self was stunning and the analysis was spot on.",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Mike Chen",
    role: "Tech Enthusiast",
    content: "This is such a fun way to explore your digital identity. The parallel universe concept is brilliant and the execution is flawless. My parallel self is exactly how I imagined!",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Emma Davis",
    role: "Social Media Influencer",
    content: "My followers loved seeing my parallel universe identity! The sharing features make it super easy to spread the word. The AI-generated image is absolutely magical!",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

const howItWorksSteps = [
  {
    number: 1,
    title: "Enter Username",
    description: "Just type in your Twitter username and let our AI analyze your digital personality.",
    icon: "🐦",
  },
  {
    number: 2,
    title: "AI Analysis",
    description: "Our advanced AI analyzes your tweets to understand your unique personality traits and characteristics.",
    icon: "🤖",
  },
  {
    number: 3,
    title: "Discover Your Parallel Self",
    description: "Get your parallel universe identity, complete with species, personality, and a stunning AI-generated image.",
    icon: "✨",
  },
  {
    number: 4,
    title: "Share Your Story",
    description: "Share your parallel universe identity with friends and on social media. Let others discover their parallel selves too!",
    icon: "🎨",
  },
];

export default function LandingPage() {
  const [hearts, setHearts] = useState<Array<{id: number, x: number, y: number, emoji: string}>>([]);

  useEffect(() => {
    const emojis = ['💫', '✨', '🌟', '💕', '✨', '🌟', '💫', '✨', '❤️‍🩹', '💖'];
    const newHearts = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -100,
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    }));
    setHearts(newHearts);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-amber-50 text-center p-4 font-sans relative overflow-hidden">
      {/* Velvet texture overlay */}
      <div className="absolute inset-0 bg-[url('/texture.png')] opacity-5"></div>
      
      {/* Warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-200/20 via-purple-200/20 to-amber-200/20"></div>
      
      <Spotlight/>
      
      {/* Floating elements animation */}
      <div className="absolute inset-0 pointer-events-none">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-2xl"
            initial={{ 
              x: heart.x,
              y: -100,
              opacity: 0
            }}
            animate={{ 
              y: window.innerHeight + 100,
              opacity: [0, 1, 0],
              rotate: Math.random() * 360
            }}
            transition={{ 
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            {heart.emoji}
          </motion.div>
        ))}
      </div>

      <section className="min-h-[90vh] flex flex-col justify-center items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 relative"
          >
            {/* Decorative elements */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-rose-300/20 rounded-full blur-3xl"></div>
            
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-purple-600 font-space-grotesk text-lg md:text-xl mb-4 block relative"
            >
              <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-2xl">✨</span>
              Discover Your Digital Twin
              <span className="absolute -right-8 top-1/2 -translate-y-1/2 text-2xl">✨</span>
            </motion.span>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative"
            >
              <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-purple-400 to-amber-400 font-bungee-shade relative"
              >
                ParallelMe
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -top-4 -right-4 text-4xl"
                >
                  ✨
                </motion.div>
              </motion.h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-700 font-medium mb-4 leading-relaxed font-space-grotesk"
            >
              Discover your alternate universe identity
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="block mt-2 text-purple-600 font-permanent-marker"
              >
                based on your Twitter personality
              </motion.span>
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-space-grotesk relative"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="block"
              >
                Unlock the mystery of your parallel self with AI-powered analysis.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="block mt-2"
              >
                Your tweets reveal more than you think! 🚀
              </motion.span>
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12 relative"
          >
            {/* Button glow effects */}
            <div className="absolute -inset-4 bg-gradient-to-r from-rose-400/20 to-purple-400/20 blur-3xl -z-10"></div>
            
            <Link href="/app">
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 30px rgba(244, 114, 182, 0.5)",
                  textShadow: "0 0 8px rgba(244, 114, 182, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-rose-400 to-purple-400 text-white px-12 py-5 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Get Started ✨</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </motion.button>
            </Link>
            
            <a href="https://twitter.com/priyanshudotsol" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)",
                  textShadow: "0 0 8px rgba(168, 85, 247, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-400 to-amber-400 text-white px-12 py-5 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Follow Us 🚀</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </motion.button>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-6xl mx-auto mt-16 grid md:grid-cols-3 gap-8 px-4 relative">
        {/* Background decorative elements */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-rose-300/10 rounded-full blur-3xl"></div>
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-rose-100/80 to-purple-100/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-rose-200/50 hover:border-rose-300/50 transition-all duration-300 hover:shadow-2xl hover:shadow-rose-200/20 hover:-translate-y-1 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rose-400/5 to-purple-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="text-5xl mb-6 transform hover:scale-110 transition-transform duration-300 relative">
            <span className="absolute -inset-4 bg-gradient-to-r from-rose-300/20 to-purple-300/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            🎭
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800 font-bungee-shade">Parallel Identity</h3>
          <p className="text-gray-600 font-space-grotesk">Discover who you are in a parallel universe by simply entering your Twitter username</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-purple-100/80 to-amber-100/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-purple-200/50 hover:border-purple-300/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-200/20 hover:-translate-y-1 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-amber-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="text-5xl mb-6 transform hover:scale-110 transition-transform duration-300 relative">
            <span className="absolute -inset-4 bg-gradient-to-r from-purple-300/20 to-amber-300/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            ✨
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800 font-bungee-shade">AI-Powered Analysis</h3>
          <p className="text-gray-600 font-space-grotesk">Our advanced AI analyzes your public tweets to create your unique parallel identity</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-amber-100/80 to-rose-100/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-amber-200/50 hover:border-amber-300/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-200/20 hover:-translate-y-1 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-rose-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="text-5xl mb-6 transform hover:scale-110 transition-transform duration-300 relative">
            <span className="absolute -inset-4 bg-gradient-to-r from-amber-300/20 to-rose-300/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            🎨
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800 font-bungee-shade">Share Your Story</h3>
          <p className="text-gray-600 font-space-grotesk">Share your parallel universe identity with friends and on social media</p>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-6xl mx-auto mt-32 px-4 relative">
        {/* Background decorative elements */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-rose-300/10 rounded-full blur-3xl"></div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-purple-400 to-amber-400 font-bungee-shade text-center relative"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -left-12 top-1/2 -translate-y-1/2 text-4xl"
          >
            ✨
          </motion.span>
          How It Works
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute -right-12 top-1/2 -translate-y-1/2 text-4xl"
          >
            ✨
          </motion.span>
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorksSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="relative group"
            >
              {/* Background glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-300 to-purple-300 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              
              {/* Card content */}
              <div className="relative bg-gradient-to-br from-rose-50/90 to-purple-50/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-rose-200/50 hover:border-rose-300/50 transition-all duration-300 hover:shadow-2xl hover:shadow-rose-200/20 hover:-translate-y-1">
                {/* Number badge with enhanced effects */}
                <div className="absolute -top-4 -left-4">
                  {/* Outer glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-rose-300 to-purple-300 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  {/* Badge */}
                  <div className="relative w-12 h-12 bg-gradient-to-r from-rose-300 to-purple-300 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-rose-300/25 transition-all duration-300 transform group-hover:scale-110">
                    {step.number}
                  </div>
                </div>

                {/* Icon with enhanced effects */}
                <div className="relative mb-8 mt-4">
                  {/* Icon glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-300 to-purple-300 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  {/* Icon */}
                  <div className="relative text-6xl transform group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>

                {/* Title with gradient effect */}
                <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500 group-hover:from-rose-400 group-hover:to-purple-400 transition-all duration-300 font-bungee-shade">
                  {step.title}
                </h3>

                {/* Description with enhanced typography */}
                <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-300 font-space-grotesk">
                  {step.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-rose-300 to-purple-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-x-150"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-6xl mx-auto mt-32 px-4 relative">
        {/* Background decorative elements */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-rose-300/10 rounded-full blur-3xl"></div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-purple-400 to-amber-400 font-bungee-shade text-center relative"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -left-12 top-1/2 -translate-y-1/2 text-4xl"
          >
            💫
          </motion.span>
          What People Say
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute -right-12 top-1/2 -translate-y-1/2 text-4xl"
          >
            💫
          </motion.span>
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="relative group"
            >
              {/* Background glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-300 to-purple-300 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              
              {/* Card content */}
              <div className="relative bg-gradient-to-br from-rose-50/90 to-purple-50/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-rose-200/50 hover:border-rose-300/50 transition-all duration-300 hover:shadow-2xl hover:shadow-rose-200/20 hover:-translate-y-1">
                {/* Avatar section with enhanced effects */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    {/* Outer glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-rose-300 to-purple-300 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-300 to-purple-300 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    {/* Avatar image */}
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="relative w-16 h-16 rounded-full object-cover border-2 border-rose-300/50 transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-rose-500 group-hover:to-purple-500 transition-all duration-300 font-bungee-shade">
                      {testimonial.name}
                    </h4>
                    <p className="text-purple-600 text-sm group-hover:text-purple-500 transition-colors duration-300 font-space-grotesk">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Quote icon */}
                <div className="absolute top-6 right-6 text-4xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 text-rose-400">
                  "
                </div>

                {/* Testimonial content with enhanced typography */}
                <p className="text-gray-600 italic leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-300 font-permanent-marker">
                  {testimonial.content}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-rose-300 to-purple-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-x-150"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-32 text-sm text-gray-600 relative z-10 pb-8 font-space-grotesk"
      >
        Made with <span className="text-rose-500">💝</span> by Priyanshu | @ParallelMeApp
      </motion.footer>
    </main>
  );
}
