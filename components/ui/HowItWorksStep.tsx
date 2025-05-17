import { motion } from "motion/react";

interface HowItWorksStepProps {
  number: number;
  title: string;
  description: string;
  icon: string;
  delay: number;
}

export function HowItWorksStep({ number, title, description, icon, delay }: HowItWorksStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="relative group"
    >
      {/* Background glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-300 to-purple-300 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
      
      {/* Card content */}
      <div className="relative bg-gradient-to-br from-rose-50/90 to-purple-50/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-rose-200/50 hover:border-rose-300/50 transition-all duration-300">
        {/* Number badge with enhanced effects */}
        <div className="absolute -top-4 -left-4">
          {/* Outer glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-rose-300 to-purple-300 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
          {/* Badge */}
          <div className="relative w-12 h-12 bg-gradient-to-r from-rose-300 to-purple-300 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-rose-300/25 transition-all duration-300 transform group-hover:scale-110">
            {number}
          </div>
        </div>

        {/* Icon with enhanced effects */}
        <div className="relative mb-8 mt-4">
          {/* Icon glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-300 to-purple-300 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          {/* Icon */}
          <div className="relative text-6xl transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>

        {/* Title with gradient effect */}
        <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500 group-hover:from-rose-400 group-hover:to-purple-400 transition-all duration-300 font-serif">
          {title}
        </h3>

        {/* Description with enhanced typography */}
        <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-300 font-serif">
          {description}
        </p>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-rose-300 to-purple-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-x-150"></div>
      </div>
    </motion.div>
  );
} 