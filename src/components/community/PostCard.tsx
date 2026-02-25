import { Post } from "@/types/api";
import { motion } from "framer-motion";
import { Bookmark, Heart, MessageCircle, MoreHorizontal, Share2 } from "lucide-react";
import { useState } from "react";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.stats?.likes || 0);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  // Format the date
  const formattedTime = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
  });

  const images = post.content?.media?.filter((m: any) => m.type === 'image') || [];
  const videos = post.content?.media?.filter((m: any) => m.type === 'video') || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card glass-hover overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {post.creator?.avatar ? (
              <img src={post.creator.avatar} alt={post.creator.name} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                {post.creator?.name?.charAt(0) || "U"}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground truncate">{post.creator?.name || "Unknown User"}</span>
                {post.isPinned && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-primary/20 text-primary flex-shrink-0">
                    Pinned
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate">{post.creator?.role || "Member"} · {formattedTime}</p>
            </div>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors p-1 flex-shrink-0 ml-2">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        {post.content?.text && (
          <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">{post.content.text}</p>
        )}
      </div>

      {/* Image / Media */}
      {images.length > 0 && (
        <div className="px-4 pb-3">
          <div className="rounded-xl overflow-hidden max-h-96">
            <img src={images[0].url} alt="Post media" className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Video */}
      {videos.length > 0 && (
        <div className="px-4 pb-3">
          <div className="rounded-xl overflow-hidden bg-black/5 flex items-center justify-center max-h-96">
            <video src={videos[0].url} controls className="max-w-full max-h-96 object-contain" />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="px-4 py-3 border-t border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${liked ? "text-destructive bg-destructive/10" : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
            <span>{likeCount}</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>{post.stats?.comments || 0}</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => setSaved(!saved)}
          className={`p-1.5 rounded-lg transition-all ${saved ? "text-secondary" : "text-muted-foreground hover:text-foreground"
            }`}
        >
          <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
        </button>
      </div>
    </motion.div>
  );
}
