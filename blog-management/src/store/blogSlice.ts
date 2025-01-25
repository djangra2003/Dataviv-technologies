import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Blog {
  id: string;
  title: string;
  description: string;
  category: string;
  tags?: string[];
  coverImage?: File | null;
  publishedStatus: 'draft' | 'published';
  publishedDate?: string | null;
}

interface BlogState {
  blogs: Blog[];
}

const initialState: BlogState = {
  blogs: [],
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addBlog: (state, action: PayloadAction<Blog>) => {
      state.blogs.push(action.payload);
    },
    deleteBlog: (state, action: PayloadAction<string>) => {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { addBlog, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;
