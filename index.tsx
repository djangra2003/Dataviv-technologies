import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store'; // Ensure these are correctly exported in your store file
import { deleteBlog } from '../store/blogSlice'; // Action to delete a blog
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogCard from '../components/BlogCard'; // BlogCard component
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Correctly type the dispatch
  const blogs = useSelector((state: RootState) => state.blog.blogs); // Fetch blogs from Redux state
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        // Dispatch the deleteBlog action and wait for it to complete
        await dispatch(deleteBlog(id)); // No need to unwrap if not using createAsyncThunk
        toast.success("Blog deleted successfully!"); // Success notification
      } catch (error: any) {
        toast.error(error?.message || "Error deleting blog."); // Error notification
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blog Management</h1>
      <button
        onClick={() => navigate('/create')}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Create New Post
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            description={blog.description}
            category={blog.category}
            onReadMore={() => navigate(`/blog/${blog.id}`)}
            onDelete={() => handleDelete(blog.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
