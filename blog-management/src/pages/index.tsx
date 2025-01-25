import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import BlogCard from '../components/BlogCard';
import { deleteBlog } from '../store/blogSlice';

const Home: React.FC = () => {
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch(deleteBlog(id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Blog Management</h1>
      <button className="bg-blue-500 text-white p-2 rounded mt-4"> Create New Post</button>
      <div className="mt-4">
        {blogs.map(blog => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            description={blog.description}
            category={blog.category}
            onDelete={() => handleDelete(blog.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;