import React from 'react';
import { Blog } from '../store/blogSlice';
import Link from 'next/link';

interface BlogCardProps {
  blog: Blog;
  onDelete: (id: string) => void; // Expect a function that takes an id
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, onDelete }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{blog.title}</h2>
      <p>{blog.description}</p>
      <p className="text-gray-500">{blog.category}</p>
      <Link href={`/blog/${blog.id}`}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Read More</button>
      </Link>
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => onDelete(blog.id)}>
        Delete
      </button>
    </div>
  );
};

export default BlogCard;