import { blogPosts, BlogPost } from "../data/blogData";
import { newsItems, NewsItem } from "../data/newsData";
import { initiatives, Initiative } from "../data/initiativesData";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
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
