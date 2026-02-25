export interface CommunityAPIResponse {
    community: {
        name: string;
        logo?: string;
        darkModeLogo?: string;
        banner?: string;
        configuration?: {
            hideHeaderCommunityName?: boolean;
        };
    };
}

export interface PostAuthor {
    id?: string;
    name: string;
    avatar?: string;
    role?: string;
}

export interface PostContent {
    text?: string;
    media?: Array<{ url: string; type: string; id?: string }>;
}

export interface PostStats {
    likes?: number;
    comments?: number;
}

export interface Post {
    id: string;
    creator?: PostAuthor;
    createdAt: string;
    content?: PostContent;
    stats?: PostStats;

    // Legacy / Optional API fields still used by some UI
    title?: string;
    description?: string;
    isPinned?: boolean;
    group?: { name: string };
    tab?: { name: string };
}

export interface PostDirectoryResponse {
    posts: Post[];
}

export interface WidgetDetails {
    title?: string;
    description?: string;
    buttonLabel?: string;
    buttonURL?: string;
    picture?: string;
}

export interface Widget {
    id: string;
    type: string;
    title: string;
    content?: string;
}

export interface HighlightedPostItem {
    id: string;
    title: string;
    category: string;
    author: { name: string };
    post: {
        media?: Array<{ url: string }>;
    }
}

export interface CommunityGroupTab {
    name: string;
    emoji?: string;
    meta?: {
        slug: string;
    };
}

export interface CommunityGroup {
    id: string;
    name: string;
    tabs: CommunityGroupTab[];
    meta?: {
        slug: string;
    };
}
