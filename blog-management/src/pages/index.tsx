// pages/index.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import BlogCard from '../components/BlogCard';
import { deleteBlog } from '../store/blogSlice';
import Link from 'next/link';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state: RootState) => state.blog.blogs);

  const handleDelete = (id: string) => {
    dispatch(deleteBlog(id));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog Management</h1>
      <Link href="/create">
        <button className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition">
          Create New Post
        </button>
      </Link>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <BlogCard key={blog.id} blog={blog} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Home;