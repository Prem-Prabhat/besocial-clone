import {
    mockCommunityData,
    mockGroups,
    mockHighlightedPosts,
    mockPosts,
    mockWidgets
} from "@/data/mockData";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchCommunityData = async () => {
    await delay(500);
    return mockCommunityData;
};

export const useCommunity = () => {
    return useQuery({
        queryKey: ["community"],
        queryFn: fetchCommunityData,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
        retry: 2,
    });
};

const fetchPosts = async ({ pageParam = 1 }) => {
    await delay(800);
    // Simulate pagination by returning empty array after page 3
    if (pageParam > 3) {
        return { posts: [] };
    }
    return mockPosts;
};

export const usePosts = () => {
    return useInfiniteQuery({
        queryKey: ["posts", "infinite"],
        queryFn: fetchPosts,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage.posts || lastPage.posts.length === 0) {
                return undefined;
            }
            return allPages.length + 1;
        },
        staleTime: 1000 * 60 * 2, // Cache for 2 minutes
    });
};

const fetchWidgets = async () => {
    await delay(400);
    return mockWidgets;
};

export const useWidgets = () => {
    return useQuery({
        queryKey: ["widgets"],
        queryFn: fetchWidgets,
        staleTime: 1000 * 60 * 5,
    });
};

const fetchHighlightedPosts = async () => {
    await delay(600);
    return mockHighlightedPosts;
};

export const useHighlightedPosts = () => {
    return useQuery({
        queryKey: ["highlightedPosts"],
        queryFn: fetchHighlightedPosts,
        staleTime: 1000 * 60 * 5,
    });
};

const fetchGroups = async () => {
    await delay(700);
    return mockGroups;
};

export const useGroups = () => {
    return useQuery({
        queryKey: ["groups"],
        queryFn: fetchGroups,
        staleTime: 1000 * 60 * 5,
    });
};
