import { Code2, Heart } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  },
};

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background/80 backdrop-blur-md overflow-hidden">
      <motion.div 
        className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
         
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
           
          <motion.div variants={itemVariants} className="flex flex-col space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <motion.div 
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.4 }}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-sm cursor-pointer"
              >
                <Code2 className="h-4 w-4 text-white" />
              </motion.div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                InstaDev
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting developers through code, passion, and collaboration. Find your perfect programming partner or co-founder.
            </p>
            
            <div className="flex space-x-4 text-muted-foreground">
              <motion.a whileHover={{ scale: 1.2, color: "#6366f1" }} href="#" className="transition-colors">
                <FaGithub className="h-5 w-5" />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2, color: "#6366f1" }} href="#" className="transition-colors">
                <FaXTwitter className="h-5 w-5" />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2, color: "#6366f1" }} href="#" className="transition-colors">
                <FaLinkedin className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Discover Matches", "Success Stories", "Top Developers", "Premium Plans"].map((link) => (
                <motion.li key={link} whileHover={{ x: 5, color: "#6366f1" }}>
                  <a href="#" className="transition-colors">{link}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Community Forum", "Developer Blog", "Open Source Contribs", "FAQ & Support"].map((link) => (
                <motion.li key={link} whileHover={{ x: 5, color: "#6366f1" }}>
                  <a href="#" className="transition-colors">{link}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Get the latest updates on global hackathons, trending tech stacks, and platform features.
            </p>
            <form className="flex w-full max-w-sm items-center space-x-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="submit" size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md">
                  Join
                </Button>
              </motion.div>
            </form>
          </motion.div>

        </div>

        <motion.div 
          variants={itemVariants}
          className="mt-12 border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground"
        >
          <p>© {new Date().getFullYear()} DevTinder Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Heart className="h-3.5 w-3.5 text-red-500 fill-current" />
            </motion.div>
            <span>by developers for developers.</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </motion.div>

      </motion.div>
    </footer>
  );
}