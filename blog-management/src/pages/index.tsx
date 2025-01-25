import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deleteBlog } from '../store/blogSlice';
import { BlogCard } from '@/components/BlogCard';
import { useRouter } from 'next/router';

const HomePage: React.FC = () => {
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDelete = (id: string) => {
    dispatch(deleteBlog(id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Management</h1>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => router.push('/create')}
      >
        Create New Post
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onDelete={handleDelete}
            onReadMore={() => router.push(`/blog/${blog.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;