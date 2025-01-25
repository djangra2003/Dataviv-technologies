export interface Blog {
    id: string;
    title: string;
    description: string;
    category: string;
    tags?: string[];
    coverImage?: string;
    published: boolean;
    publishedDate?: string;
  }