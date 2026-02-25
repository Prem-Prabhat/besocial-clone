import { useCommunity } from "@/hooks/useCommunity";
import { Bell, Flame, Loader2, Menu, MessageSquare, Moon, Search, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TopNavbar({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const { data, isLoading } = useCommunity();
  const navigate = useNavigate();

  // Initialize theme on load
  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    } else {
      // Force dark mode as default for Amity theme if not explicitly set
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  };

  return (
    <header className="h-14 bg-card/80 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-4 sticky top-0 z-50 transition-colors duration-300">
      {/* Left - Logo & Menu */}
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors lg:hidden">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          ) : data?.community?.logo ? (
            <img src={isDark ? data.community.darkModeLogo || data.community.logo : data.community.logo} alt="Logo" className={`h-8 w-auto object-contain rounded-md p-1.5 shadow-sm ${!isDark && 'bg-white'}`} />
          ) : (
            <h1 className="text-lg font-display font-bold text-foreground">
              be<span className="text-primary">Social</span>
            </h1>
          )}

          {data?.community?.name && !data?.community?.configuration?.hideHeaderCommunityName && (
            <h1 className="hidden md:block text-base font-semibold text-foreground whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
              {data.community.name}
            </h1>
          )}
        </div>
      </div>

      {/* Center - Search */}
      <div className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 max-w-md flex-1 mx-8 ${searchFocused ? "bg-muted ring-1 ring-primary/40" : "bg-muted/50"
        }`}>
        <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          placeholder="Search posts, members, topics..."
          className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-2">
        {/* Points Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/15 border border-secondary/30">
          <Flame className="w-4 h-4 text-secondary" />
          <span className="text-sm font-semibold text-secondary">25,800</span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors hidden sm:block"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
          <MessageSquare className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
        </button>
        <button className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
        </button>

        {/* Avatar */}
        <button
          onClick={() => navigate("/profile")}
          className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground ring-2 ring-primary/30"
        >
          P
        </button>
      </div>
    </header>
  );
}
