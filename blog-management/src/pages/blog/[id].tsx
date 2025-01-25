import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../store/store';

const BlogDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const blog = blogs.find(blog => blog.id === Number(id));

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{blog.title}</h1>
      <p>{blog.description}</p>
      <p className="text-gray-500">{blog.category}</p>
      <button onClick={() => router.push('/')} className="mt-4">Back to Home</button>
    </div>
  );
};

export default BlogDetails;