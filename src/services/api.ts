import { blogPosts, BlogPost } from "../data/blogData";
import { newsItems, NewsItem } from "../data/newsData";
import { initiatives, Initiative } from "../data/initiativesData";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const API_URL = "http://localhost:8081/api";

export const api = {
    getAnnouncements: async (): Promise<any[]> => {
        try {
            const response = await fetch(`${API_URL}/announcements`);
            if (!response.ok) throw new Error("Failed to fetch announcements");
            return await response.json();
        } catch (error) {
            console.error("Using fallback announcements:", error);
            // Fallback to local data if backend is down
            return [
                {
                    id: 1,
                    title: "NVIS (National Voting Intentions Survey) Report 1 is released",
                    description: "Our comprehensive survey on national voting intentions is now available. Gain insights into the current political landscape and voter sentiment across the country.",
                    date: "January 28, 2026",
                    link: "#",
                    image: "/src/assets/nvis-report.jpg",
                },
                {
                    id: 2,
                    title: "Youth Civic Engagement Summit 2025",
                    description: "Join us for our annual summit bringing together young leaders from across Africa to discuss civic participation, democratic governance, and community development.",
                    date: "January 15, 2025",
                    link: "#",
                    image: "/src/assets/discuss.jpg",
                },
                {
                    id: 3,
                    title: "Yiaga Africa have acquired ED Certified by NGOsource",
                    description: "We are pleased to announce that Yiaga Africa has achieved Equivalency Determination (ED) certification, further validating our commitment to transparency and global standards.",
                    date: "November 28, 2024",
                    link: "#",
                    image: "/src/assets/ngosource-ed.jpg",
                },
            ];
        }
    },

    getBlogs: async (): Promise<BlogPost[]> => {
        await delay(500);
        return blogPosts;
    },

    getBlogBySlug: async (slug: string): Promise<BlogPost | undefined> => {
        await delay(500);
        return blogPosts.find((post) => post.slug === slug);
    },

    getNews: async (): Promise<NewsItem[]> => {
        await delay(500);
        return newsItems;
    },

    getNewsBySlug: async (slug: string): Promise<NewsItem | undefined> => {
        await delay(500);
        return newsItems.find((item) => item.slug === slug);
    },

    getInitiatives: async (): Promise<Initiative[]> => {
        await delay(500);
        return initiatives;
    },

    getInitiativeBySlug: async (slug: string): Promise<Initiative | undefined> => {
        await delay(500);
        return initiatives.find((item) => item.slug === slug);
    },
};
