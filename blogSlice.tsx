import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Blog } from '../types';

// Mock API calls (replace with actual API calls)
const mockApiCall = (data: any, timeout = 500) =>
  new Promise<any>((resolve) => setTimeout(() => resolve(data), timeout));

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  return mockApiCall([
    { id: '1', title: 'First Blog', description: 'This is the first blog post.', category: 'Tech', published: true },
    { id: '2', title: 'Second Blog', description: 'This is the second blog post.', category: 'Lifestyle', published: false },
  ] as Blog[]);
});

export const createBlog = createAsyncThunk('blogs/createBlog', async (blog: Omit<Blog, 'id'>) => {
    return mockApiCall({...blog, id: Date.now().toString()});
});

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id: string) => {
  return mockApiCall(id);
});

interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch blogs.';
      })
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create blog.';
      })
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete blog.';
      });
  },
});

export default blogSlice.reducer;