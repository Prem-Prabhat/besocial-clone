import { motion } from "framer-motion";
import { Clock, Flame, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const filters = [
  { id: "recent", label: "Recent", icon: Clock },
  { id: "top", label: "Top Posts", icon: Flame },
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "following", label: "Following", icon: Users },
];

export default function FeedFilters() {
  const [active, setActive] = useState("recent");

  const handleTabClick = (filter: any) => {
    setActive(filter.id);
    toast.info(`Simulating ${filter.label} Feed 🔄`, {
      description: "This is an unofficial prototype. UI interaction works, but no real data is fetched or saved.",
      duration: 3000,
    });
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin pb-1">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleTabClick(filter)}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${active === filter.id
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
        >
          {active === filter.id && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 gradient-primary rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative flex items-center gap-2">
            <filter.icon className="w-4 h-4" />
            {filter.label}
          </span>
        </button>
      ))}
    </div>
  );
}
