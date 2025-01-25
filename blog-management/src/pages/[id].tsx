import React from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { deleteBlog } from '@/store/blogSlice';
import { showToast } from '@/utils/toastHandler';

const BlogDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const blog = blogs.find((b) => b.id === id);
  const dispatch = useDispatch();

  if (!blog) return <p className="text-center">Blog not found.</p>;

  const handleDelete = () => {
    dispatch(deleteBlog(id as string));
    showToast('success', 'Blog deleted successfully!');
    router.push('/');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
      <p className="mb-4">{blog.description}</p>
      <p className="mb-4">Category: {blog.category}</p>
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-4"
        onClick={handleDelete}
      >
        Delete Blog
      </button>
      <button
        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mt-4 ml-4"
        onClick={() => router.push('/')}
      >
        Back to Home
      </button>
    </div>
  );
};

export default BlogDetailsPage;