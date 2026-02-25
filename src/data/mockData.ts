import { CommunityAPIResponse, PostDirectoryResponse } from "@/types/api";

export const mockCommunityData: CommunityAPIResponse = {
    community: {
        name: "Amity Online Community (Prototype)",
        logo: "https://amityonline.com/favicon.ico",
        darkModeLogo: "https://amityonline.com/favicon.ico",
        banner: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000",
        configuration: {
            hideHeaderCommunityName: false,
        },
    },
};

export const mockPosts: PostDirectoryResponse = {
    posts: [
        {
            id: "post1",
            creator: { name: "Anil Kumar (MCA 2nd Sem)", avatar: "https://i.pravatar.cc/150?u=anil", role: "Student" },
            createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
            content: { text: "Has anyone received their admit cards for the upcoming semester exams yet? Mine still says 'Pending Verification'." },
            stats: { likes: 12, comments: 8 },
            group: { name: "MCA Batch 2025" }
        },
        {
            id: "post2",
            creator: { name: "Prof. Rakesh Sharma", avatar: "https://i.pravatar.cc/150?u=rakesh", role: "Faculty" },
            createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
            content: {
                text: "Dear Students, the deadline for the final 'Java Enterprise Applications' group project has been extended to Friday 11:59 PM. Please ensure all GitHub repo links are submitted via the LMS.",
                media: [{ url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800", type: "image", id: "img1" }]
            },
            stats: { likes: 45, comments: 2 },
            isPinned: true,
            group: { name: "Academics" }
        },
        {
            id: "post3",
            creator: { name: "Neha Gupta", avatar: "https://i.pravatar.cc/150?u=neha", role: "Student Council" },
            createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            content: { text: "Reminder: The annual tech fest 'Amizone 2026' volunteer registrations are closing tonight! We still need graphic designers and event coordinators. DM me if interested! 🎉" },
            stats: { likes: 89, comments: 34 },
            group: { name: "Extracurriculars" }
        },
        {
            id: "post4",
            creator: { name: "Aditya Verma", avatar: "https://i.pravatar.cc/150?u=aditya", role: "Alumni" },
            createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            content: {
                text: "Hiring Alert! 🚨 My company (TCS) is looking for 3 freshers from the BCA/MCA batches for a Junior SDE role. Must have hands-on experience with React and Node.js. Drop your resumes below!",
            },
            stats: { likes: 156, comments: 42 },
            group: { name: "Placement Cell" }
        },
        {
            id: "post5",
            creator: { name: "Library Admin", avatar: "https://i.pravatar.cc/150?u=library", role: "Admin" },
            createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
            content: { text: "The central digital library will be under maintenance on Sunday from 2 AM to 6 AM IST. E-books and standard journals will be temporarily unavailable." },
            stats: { likes: 5, comments: 0 },
            group: { name: "General Announcements" }
        }
    ],
};

export const mockWidgets = {
    widgets: [
        {
            id: "w1",
            type: "guidelines",
            title: "Community Guidelines",
            content: "Welcome to the Student Hub! Please maintain academic integrity. No spam, self-promotion, or sharing of exam answer materials.",
        },
        {
            id: "w2",
            type: "events",
            title: "Upcoming Webinars",
            content: "Join 'Getting Started with AI' hosted by Microsoft Reactor this Friday at 5 PM.",
        }
    ]
};

export const mockHighlightedPosts = [
    {
        id: "hp1",
        title: "Semester 4 Results Declared!",
        category: "Important Alert",
        author: { name: "Examination Dept" },
        post: {
            media: [{ url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800" }]
        }
    },
    {
        id: "hp2",
        title: "Hackathon 2026 Winners Announced",
        category: "Events",
        author: { name: "Tech Club" },
        post: {
            media: [{ url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800" }]
        }
    }
];

export const mockGroups = [
    {
        id: "g1",
        name: "Academics",
        meta: { slug: "academics" },
        tabs: [
            { name: "BCA / MCA Queries", meta: { slug: "it" }, emoji: "💻" },
            { name: "BBA / MBA Batch", meta: { slug: "business" }, emoji: "📈" },
            { name: "Assignments Help", meta: { slug: "assignments" }, emoji: "📚" },
        ]
    },
    {
        id: "g2",
        name: "Campus Life",
        meta: { slug: "campus" },
        tabs: [
            { name: "Events & Fests", meta: { slug: "events" }, emoji: "🎪" },
            { name: "Placement Cell", meta: { slug: "placements" }, emoji: "💼" },
            { name: "Sports Club", meta: { slug: "sports" }, emoji: "🏅" },
        ]
    }
];
