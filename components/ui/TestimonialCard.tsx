import { motion } from "motion/react";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
  delay: number;
}

export function TestimonialCard({ name, role, content, avatar, delay }: TestimonialCardProps) {
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
        {/* Avatar section with enhanced effects */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-300 to-purple-300 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-300 to-purple-300 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            {/* Avatar image */}
            <img
              src={avatar}
              alt={name}
              className="relative w-16 h-16 rounded-full object-cover border-2 border-rose-300/50 transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-rose-500 group-hover:to-purple-500 transition-all duration-300 font-serif">
              {name}
            </h4>
            <p className="text-purple-600 text-sm group-hover:text-purple-500 transition-colors duration-300 font-serif">
              {role}
            </p>
          </div>
        </div>

        {/* Quote icon */}
        <div className="absolute top-6 right-6 text-4xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 text-rose-400">
          "
        </div>

        {/* Testimonial content with enhanced typography */}
        <p className="text-gray-600 italic leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-300 font-serif">
          {content}
        </p>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-rose-300 to-purple-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-x-150"></div>
      </div>
    </motion.div>
  );
} 