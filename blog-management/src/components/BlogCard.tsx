export interface BlogCard {
    title: string;
    description: string;
    icon: string;
    component: React.ComponentType<any>;
    category: string;
    type: string;
    demo: boolean;
    demoCode: string;
  }
  
  export const blogCard: BlogCard = {
    title: 'Blog Card',
    description: 'A simple blog card component',
    icon: 'blog',
    component: BlogCardComponent,
    category: 'blog',
    type: 'component',
    demo: true,
    demoCode: `
      <BlogCardComponent />
    `,
  };