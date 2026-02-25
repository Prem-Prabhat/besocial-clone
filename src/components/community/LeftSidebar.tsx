import { useGroups } from "@/hooks/useCommunity";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen, Calendar,
  ChevronDown, ChevronRight,
  Compass,
  FolderOpen,
  Hash,
  Home,
  Loader2,
  Users
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavGroup {
  label: string;
  items: { icon: React.ElementType; label: string; path?: string; active?: boolean }[];
}

const staticMenu: NavGroup = {
  label: "Menu",
  items: [
    { icon: Home, label: "Home", path: "/" },
    { icon: Compass, label: "Explore Groups", path: "/explore" },
    { icon: Users, label: "Members Directory", path: "/members" },
    { icon: BookOpen, label: "Courses", path: "/courses" },
    { icon: Calendar, label: "Events", path: "/events" },
  ],
};

function SidebarGroup({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center w-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
      >
        {open ? <ChevronDown className="w-3 h-3 mr-1" /> : <ChevronRight className="w-3 h-3 mr-1" />}
        {group.label}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {group.items.map((item: any) => {
              const active = item.path ? location.pathname === item.path : item.active;
              return (
                <button
                  key={item.label}
                  onClick={() => item.path && navigate(item.path)}
                  className={`flex items-center w-full gap-3 px-4 py-2 text-sm rounded-lg transition-all duration-200 ${active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate text-left w-full block">{item.label}</span>
                  {active && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LeftSidebar() {
  const { data: groupsData, isLoading } = useGroups();
  const apiGroups = groupsData?.groups || [];

  const dynamicGroups: NavGroup[] = apiGroups.map((apiGroup: any) => {
    let items = apiGroup.tabs?.map((tab: any) => ({
      icon: Hash, // Default icon for dynamic items
      label: tab.emoji ? `${tab.emoji} ${tab.name}` : tab.name,
      path: `/community/${apiGroup.meta?.slug}/${tab.meta?.slug}`
    })) || [];

    // Smart logic for Academics: Show a shortened, curated list for "guest" mode 
    // to avoid the huge list of hundreds of batch channels.
    if (apiGroup.name === "Academics" && items.length > 5) {
      // Pick a few generic ones or the ones with "Feed"
      const generalAcademicFeeds = items.filter((i: any) => i.label.includes("Feed") || i.label.includes("General"));
      const fallbackFeeds = items.slice(0, 3); // Take first 3 if no "general" feeds exist

      items = generalAcademicFeeds.length > 0 ? generalAcademicFeeds.slice(0, 4) : fallbackFeeds;

      // Optionally add a "Lock" item to hint at more content after login
      items.push({
        icon: FolderOpen,
        label: "Login to see your batch (200+)",
        path: "/login",
        active: false,
      });
    }

    return {
      label: apiGroup.name,
      items: items
    };
  });

  return (
    <aside className="w-60 h-[calc(100vh-3.5rem)] sticky top-14 bg-card/40 backdrop-blur-xl border-r border-border/50 flex flex-col overflow-hidden">
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2 space-y-1">
        {/* Static primary menu */}
        <SidebarGroup group={staticMenu} />

        <div className="my-4 border-t border-border/50 mx-2" />

        {/* Dynamic API groups */}
        {isLoading ? (
          <div className="flex items-centerjustify-center py-8">
            <Loader2 className="w-5 h-5 text-primary mx-auto animate-spin" />
            <p className="w-full text-center mt-2 text-xs text-muted-foreground">Loading groups...</p>
          </div>
        ) : (
          dynamicGroups.map((group) => (
            <SidebarGroup key={group.label} group={group} />
          ))
        )}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
            P
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-foreground">Prem</p>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
        </div>
      </div>
    </aside>
  );
}
