import { useCommunity } from "@/hooks/useCommunity";
import { motion } from "framer-motion";

export default function HeroBanner() {
  const { data } = useCommunity();

  // Fallback beautiful banner for the prototype
  const fallbackBanner = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full rounded-2xl overflow-hidden relative group"
    >
      <img
        src={data?.community?.banner || fallbackBanner}
        alt={data?.community?.name || "beSocial Community"}
        className="w-full h-[280px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
    </motion.div>
  );
}
