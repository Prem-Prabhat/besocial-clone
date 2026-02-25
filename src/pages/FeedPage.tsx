import FeaturedPosts from "@/components/community/FeaturedPosts";
import FeedFilters from "@/components/community/FeedFilters";
import HeroBanner from "@/components/community/HeroBanner";
import PostCard from "@/components/community/PostCard";
import PostComposer from "@/components/community/PostComposer";
import { usePosts } from "@/hooks/useCommunity";
import { Loader2, Plus } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";

export default function FeedPage() {
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = usePosts();

    const { ref, inView } = useInView({
        threshold: 0.1,
        rootMargin: "400px",
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    // Flatten all pages of posts into a single array
    const allPosts = useMemo(() => {
        return data?.pages.flatMap((page) => page.posts) || [];
    }, [data]);

    const handleCreatePost = () => {
        toast.warning("Prototype Mode Only ⚠️", {
            description: "This is an unofficial prototype. Please do not enter any real data. No data is stored or uploaded anywhere.",
            duration: 4000,
        });
    };

    return (
        <div className="flex-1 max-w-3xl mx-auto py-6 px-5 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-display font-bold text-foreground">Home</h1>
                    <p className="text-sm text-muted-foreground">Welcome back, Prem 👋</p>
                </div>
                <button
                    onClick={handleCreatePost}
                    className="gradient-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                >
                    <Plus className="w-4 h-4" />
                    Create Post
                </button>
            </div>

            <HeroBanner />
            <FeaturedPosts />
            <PostComposer />
            <FeedFilters />

            {/* Posts */}
            <div className="space-y-5">
                {isLoading ? (
                    <div className="py-12 flex justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : error ? (
                    <div className="py-8 text-center text-destructive bg-destructive/10 rounded-xl">
                        Failed to load posts
                    </div>
                ) : allPosts.length === 0 ? (
                    <div className="py-12 text-center text-muted-foreground bg-muted/30 rounded-xl">
                        No posts found
                    </div>
                ) : (
                    <>
                        {allPosts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}

                        {/* Intersection Observer Target */}
                        <div ref={ref} className="h-10 w-full" />

                        {/* Loading Indicator for Next Page */}
                        {isFetchingNextPage && (
                            <div className="py-6 flex justify-center">
                                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                            </div>
                        )}

                        {!hasNextPage && allPosts.length > 0 && (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                                You've reached the end of the feed.
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
