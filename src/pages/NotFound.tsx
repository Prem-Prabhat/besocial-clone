import { motion } from "framer-motion";
import { Compass, Home, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full min-h-[60vh] flex-1 flex items-center justify-center p-4 relative overflow-hidden bg-transparent rounded-xl">

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] -z-10 animate-pulse-glow" style={{ animationDelay: '1s' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card max-w-lg w-full p-8 md:p-12 text-center relative z-10"
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6"
        >
          <Compass className="w-12 h-12 text-primary" />
        </motion.div>

        <h1 className="text-6xl font-display font-bold mb-4 glow-text text-foreground">
          404
        </h1>

        <h2 className="text-2xl font-semibold mb-3 text-foreground">
          Looks like you're lost in space!
        </h2>

        <p className="text-muted-foreground mb-8 text-sm md:text-base leading-relaxed">
          The page you are looking for might have been removed or doesn't exist yet.
          <br /><br />
          <span className="text-sm font-medium text-red-500 bg-red-500/10 p-4 rounded-xl border border-red-500/20 block text-left">
            🚨 <strong className="font-bold">Disclaimer:</strong> This is not the official Amity site. It is an unofficial simulation/prototype created by a student for practice purposes. Please do not fill in any real data. No data is stored, saved, or uploaded anywhere.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>

          <button
            onClick={() => navigate("/explore")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/80 transition-colors border border-border"
          >
            <Search className="w-4 h-4" />
            Explore Groups
          </button>
        </div>
      </motion.div>
    </div>
  );
}
