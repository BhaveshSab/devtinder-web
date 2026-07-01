import { motion } from "framer-motion";
import { Code2, Terminal, X, Heart, Briefcase, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../lib/feedSlice";

export default function UserCard({ user }) {
  const dispatch = useDispatch();
  
  // FIX: Added '|| {}' so if user is undefined, destructuring doesn't crash
  const {
    _id,
    firstName = "Unknown",
    lastName = "Developer",
    username = "dev",
    avatar,
    about,
    skills = [],
    gender,
  } = user || {}; 

  // Early return if data is invalid (moved above the functions for safety)
  if (!user || !firstName || firstName === "Unknown") {
    return null; 
  }

  const handleSendRequest = async (status, targetUserId) => {
    try {
      await axios.post(
        `https://devtinder-backend-1-usc5.onrender.com/request/send/${status}/${targetUserId}`,
        {},
        { withCredentials: true }
      );
      
      // Removes the user, causing Feed to re-render with the next person in line
      dispatch(removeFeed(_id)); 

    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  const displayAvatar = avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}&backgroundColor=c0aede,b6e3f4`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative w-full max-w-sm mx-auto group overflow-hidden rounded-3xl border border-border/50 bg-card shadow-2xl transition-all duration-300"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500" />

      <div className="relative w-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-border/50">
        
        {/* Image Section */}
        <div className="relative h-[420px] w-full bg-muted overflow-hidden">
          <img
            src={displayAvatar}
            alt={`${firstName}'s avatar`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-6 text-white">
            <h2 className="text-3xl font-extrabold tracking-tight capitalize flex items-center gap-2">
              {firstName} {lastName}
            </h2>
            <p className="text-white/80 text-sm font-medium mt-1 flex items-center gap-1.5">
              <Terminal size={14} /> @{username}
            </p>
            
            {gender && (
              <p className="text-white/60 text-xs mt-2 capitalize flex items-center gap-1.5">
                <User size={12} /> {gender}
              </p>
            )}
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6 space-y-6 bg-background/95 backdrop-blur-sm relative z-10">
          
          <div className="space-y-2">
            <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
              <Briefcase size={14} /> About Me
            </h3>
            <p className="text-sm text-foreground/90 leading-relaxed line-clamp-3">
              {about || "This developer is busy writing code and hasn't added a bio yet."}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
              <Code2 size={14} /> Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs text-muted-foreground italic">No skills listed</span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-6 pt-4 pb-2 border-t border-border/50">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSendRequest("ignored", _id)}
              className="h-14 w-14 rounded-full bg-red-100 text-red-500 flex items-center justify-center shadow-lg border border-red-200 hover:bg-red-500 hover:text-white transition-all duration-300 relative z-20"
            >
              <X size={28} strokeWidth={2.5} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSendRequest("interested", _id)}
              className="h-14 w-14 rounded-full bg-indigo-100 text-indigo-500 flex items-center justify-center shadow-lg border border-indigo-200 hover:bg-indigo-500 hover:text-white transition-all duration-300 relative z-20"
            >
              <Heart size={28} strokeWidth={2.5} />
            </motion.button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}