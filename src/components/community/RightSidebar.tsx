import { useWidgets } from "@/hooks/useCommunity";
import { motion } from "framer-motion";
import { Loader2, TrendingUp, Trophy } from "lucide-react";

const events = [
  { title: "How to Use Career Services Platform Effectively", date: "Feb 26, 2025", time: "1:37 PM", live: true },
  { title: "AI Certification Workshop", date: "Mar 2, 2025", time: "10:00 AM", live: false },
];

const topMembers = [
  { name: "Ravinesh", points: "874,636", rank: 1 },
  { name: "Sheesh Gupta", points: "874,635", rank: 2 },
  { name: "Aarti", points: "874,634", rank: 3 },
  { name: "Zuberiya Tabassum", points: "874,633", rank: 4 },
];

const trendingTopics = [
  { tag: "AIBoom", posts: 234 },
  { tag: "TechCareers", posts: 189 },
  { tag: "StudyTips", posts: 156 },
  { tag: "Innovation", posts: 132 },
];

export default function RightSidebar() {
  const { data, isLoading } = useWidgets();

  // Try to find the events widget specifically, or fallback to the first few custom widgets
  const customWidgets = data?.widgets?.filter((w: any) => w.type === 'custom' && w.isVisible)
    .sort((a: any, b: any) => a.sortOrder - b.sortOrder) || [];

  return (
    <aside className="w-72 h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto scrollbar-thin py-5 pr-5 space-y-4">
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Custom Promo Widgets from Amity API */}
          {customWidgets.map((widget: any, index: number) => (
            <motion.div
              key={widget.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card overflow-hidden group cursor-pointer"
              onClick={() => widget.details.buttonURL && window.open(widget.details.buttonURL, '_blank')}
            >
              {widget.details.picture && (
                <div className="w-full overflow-hidden bg-muted/10 flex items-center justify-center">
                  <img
                    src={widget.details.picture}
                    alt={widget.details.title}
                    className="w-full h-auto max-h-60 object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="p-4">
                {widget.details.title && (
                  <h3 className="text-sm font-semibold text-foreground leading-snug mb-1 line-clamp-2">
                    {widget.details.title}
                  </h3>
                )}
                {widget.details.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1 whitespace-pre-line">
                    {widget.details.description}
                  </p>
                )}

                {widget.details.buttonURL && widget.details.buttonLabel && (
                  <a
                    href={widget.details.buttonURL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 block text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {widget.details.buttonLabel} &rarr;
                  </a>
                )}
              </div>
            </motion.div>
          ))}

          {/* Trending Topics (Static placeholder for now unless mapped from another API) */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4 mt-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-secondary" />
              <h2 className="text-sm font-display font-semibold uppercase tracking-wide text-foreground">Trending</h2>
            </div>
            <div className="space-y-2">
              {trendingTopics.map((topic) => (
                <div key={topic.tag} className="flex items-center justify-between py-1.5 cursor-pointer hover:bg-muted/30 rounded-lg px-2 transition-colors">
                  <span className="text-sm text-primary font-medium">#{topic.tag}</span>
                  <span className="text-[10px] text-muted-foreground">{topic.posts} posts</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Members (Static placeholder pending leaderboard API integration) */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-4 h-4 text-secondary" />
              <h2 className="text-sm font-display font-semibold uppercase tracking-wide text-foreground">Top Members</h2>
            </div>
            <div className="space-y-2">
              {topMembers.map((member) => (
                <div key={member.name} className="flex items-center gap-3 py-1.5">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${member.rank === 1 ? "gradient-secondary text-secondary-foreground" :
                    member.rank === 2 ? "bg-muted text-foreground" :
                      "bg-muted/50 text-muted-foreground"
                    }`}>
                    {member.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">{member.points} pts</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-3 text-xs text-primary hover:text-primary/80 font-medium transition-colors">
              View All
            </button>
          </motion.div>
        </>
      )}
    </aside>
  );
}
