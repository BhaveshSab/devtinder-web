import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Code2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios"; 
import { useDispatch } from "react-redux";
import { addUser } from "../lib/userSlice";
import { useNavigate } from "react-router-dom";
// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Login() {
  // 1. All state variables MUST be inside the component
  const [username, setUsername] = useState("bhavesh04");
  const [emailId, setEmailId] = useState("bhavesh.cool2005@gmail.com");
  const [password, setPassword] = useState("@Bhavesh123");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 2. Combined handleSubmit logic
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing on form submit
    setIsLoading(true);
    
    try {
      const res = await axios.post("http://localhost:3000/login", { 
        username, 
        emailId, 
        password 
      },{withCredentials: true});
      console.log("Login successful:", res.data);
      // Dispatch the user data to Redux store
      dispatch(addUser(res.data));
       return navigate("/feed");
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setIsLoading(false); // Stop loading animation regardless of success/fail
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden p-4 py-12">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md relative z-10"
      >
        {/* Glassmorphism Card */}
        <div className="bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl p-8 lg:p-10">
          
          {/* Header */}
          <motion.div variants={itemVariants} className="flex flex-col items-center mb-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg mb-4">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Enter your credentials to access DevTinder
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  placeholder="bhavesh04"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-background/50 focus-visible:ring-indigo-500"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  placeholder="name@example.com"
                  className="pl-10 bg-background/50 focus-visible:ring-indigo-500"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs font-medium text-indigo-500 hover:text-indigo-400 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 bg-background/50 focus-visible:ring-indigo-500"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <span className="animate-pulse">Authenticating...</span>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          {/* Footer */}
          <motion.div variants={itemVariants} className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a href="#" className="font-medium text-indigo-500 hover:text-indigo-400 transition-colors">
              Sign up
            </a>
          </motion.div>
          
        </div>
      </motion.div>
    </div>
  );
}