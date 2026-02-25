import { motion } from "framer-motion";
import { Image, Send, Smile, Video } from "lucide-react";
import { toast } from "sonner";

export default function PostComposer() {
  const handleSimulation = () => {
    toast.warning("Prototype Mode Only ⚠️", {
      description: "This is an unofficial prototype. Please do not enter any real data. No data is stored or uploaded anywhere.",
      duration: 4000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground flex-shrink-0">
          P
        </div>
        <div
          onClick={handleSimulation}
          className="flex-1 bg-muted/50 rounded-full px-4 py-2.5 text-sm text-muted-foreground cursor-text hover:bg-muted transition-colors"
        >
          What's on your mind, Prem?
        </div>
      </div>
      <div className="flex items-center gap-1 mt-3 ml-13 pl-12">
        {[
          { icon: Image, label: "Photo", color: "text-green-400" },
          { icon: Video, label: "Video", color: "text-red-400" },
          { icon: Smile, label: "Feeling", color: "text-secondary" },
        ].map((action) => (
          <button
            key={action.label}
            onClick={handleSimulation}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:bg-accent transition-colors"
          >
            <action.icon className={`w-4 h-4 ${action.color}`} />
            <span className="hidden sm:inline">{action.label}</span>
          </button>
        ))}
        <button
          onClick={handleSimulation}
          className="ml-auto gradient-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Send className="w-3.5 h-3.5" />
          Post
        </button>
      </div>
    </motion.div>
  );
}
