import LeftSidebar from "@/components/community/LeftSidebar";
import RightSidebar from "@/components/community/RightSidebar";
import TopNavbar from "@/components/community/TopNavbar";
import { useCommunity } from "@/hooks/useCommunity";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { data } = useCommunity();

    useEffect(() => {
        if (data?.community) {
            document.title = data.community.name || "Community";

            const setFavicon = (url: string) => {
                let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
                if (!link) {
                    link = document.createElement("link");
                    link.rel = "icon";
                    document.head.appendChild(link);
                }
                link.href = url;
            };

            if (data.community.favicon) {
                setFavicon(data.community.favicon);
            }
        }
    }, [data]);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <TopNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

            <div className="flex flex-1">
                {/* Sidebar - hidden on mobile */}
                <div className={`hidden lg:block ${sidebarOpen ? "" : "lg:hidden"}`}>
                    <LeftSidebar />
                </div>

                {/* Main Content */}
                <main className="flex-1 min-w-0 flex">
                    {children}

                    {/* Right sidebar - hidden on smaller screens */}
                    <div className="hidden xl:block">
                        <RightSidebar />
                    </div>
                </main>
            </div>
        </div>
    );
}
