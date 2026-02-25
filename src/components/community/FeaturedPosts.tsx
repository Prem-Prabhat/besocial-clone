import { useHighlightedPosts } from "@/hooks/useCommunity";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";

export default function FeaturedPosts() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const { data, isLoading } = useHighlightedPosts();

  const featured = data?.highlightedPosts?.posts || [];
  const totalPages = Math.ceil(featured.length / perPage);
  const visible = featured.slice(page * perPage, page * perPage + perPage);

  if (isLoading) {
    return (
      <div className="glass-card p-4 flex justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (featured.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-secondary" />
          <h2 className="text-sm font-display font-semibold text-foreground uppercase tracking-wide">Featured Posts</h2>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage(Math.max(0, page - 1))} className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {visible.map((highlightedPost: any, i: number) => {
          const post = highlightedPost.postData;
          const displayTitle = post.title || post.meta?.title || post.description.substring(0, 60) + "...";
          const category = post.group?.name || "Featured";

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => window.open(`https://besocial.amityonline.com/p/${post.meta?.slug}`, '_blank')}
              className="group relative rounded-[14px] overflow-hidden cursor-pointer border border-white/5 transition-colors h-36 flex flex-col justify-end"
            >
              {/* Image Background */}
              {post.banner ? (
                <div className="absolute inset-0 w-full h-full">
                  <img src={post.banner} alt="Featured Thumbnail" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-b from-[#163a6a] to-[#0d1627]" />
              )}

              {/* Dark Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10 p-4 pt-10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#ea9a29] line-clamp-1 mb-1">
                  {category}
                </span>
                <h3 className="text-[14px] font-semibold text-white line-clamp-2 leading-snug">
                  {displayTitle}
                </h3>
                <p className="text-[10px] text-white/70 mt-2 line-clamp-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  {post.createdBy?.name}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
