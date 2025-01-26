import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../store';
import { deleteBlog } from '../../store/blogSlice';
import toast from 'react-hot-toast';

const BlogDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const blog = useSelector((state: RootState) => state.blog.blogs.find(blog => blog.id === id));

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this blog?')) {
      dispatch(deleteBlog(id as string));
      toast.success('Blog deleted successfully!');
      router.push('/');
    }
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
      <p>{blog.description}</p>
      <p className="text-gray-500">{blog.category}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={() => router.push('/')}>Back to Home</button>
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>Delete Blog</button>
    </div>
  );
};

export default BlogDetails;