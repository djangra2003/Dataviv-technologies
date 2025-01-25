import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

interface Blog {
  id: string;
  title: string;
  description: string;
  category: string;
  tags?: string[];
  coverImage?: string;
  publishedStatus: 'Draft' | 'Published';
  publishedDate?: string;
}

interface BlogState {
  blogs: Blog[];
}

const initialState: BlogState = {
  blogs: [],
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addBlog: (state, action: PayloadAction<Blog>) => {
      state.blogs.push(action.payload);
    },
    deleteBlog: (state, action: PayloadAction<string>) => {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
    },
    // ... other reducers (updateBlog, etc.)
  },
});

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, blogSlice.reducer)

export const { addBlog, deleteBlog } = blogSlice.actions;

export const store = configureStore({
  reducer: {
    blogs: persistedReducer,
  },
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;