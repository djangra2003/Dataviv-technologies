import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { createBlog } from '../store/blogSlice';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Blog } from '../types';

const CreateBlogPage = () => {
  const [blogData, setBlogData] = useState<Omit<Blog, 'id'>>({
        title: '',
        description: '',
        category: '',
        published: false,
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const dispatch = useDispatch();
    const router = useRouter();

    const categories = ["Tech", "Lifestyle", "Health", "Travel"]; // Example categories

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setBlogData({ ...blogData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear error on change
    };

    const validateForm = () => {
        let newErrors: { [key: string]: string } = {};
        if (blogData.title.length < 5) newErrors.title = "Title must be at least 5 characters.";
        if (blogData.description.length < 10) newErrors.description = "Description must be at least 10 characters.";
        if (!blogData.category) newErrors.category = "Category is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await dispatch(createBlog({ ...blogData, id: Date.now().toString() })).unwrap();
            toast.success("Blog created successfully!");
            router.push('/');
        } catch (error: any) {
            toast.error(error?.message || "Error creating blog.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create New Blog</h1>
            <form onSubmit={handleSubmit}>
                <FormInput label="Title" name="title" value={blogData.title} onChange={handleChange} error={errors.title} required />
                <FormInput label="Description" name="description" type="textarea" rows={5} value={blogData.description} onChange={handleChange} error={errors.description} required />
                <FormSelect label="Category" name="category" value={blogData.category} onChange={handleChange} options={categories} error={errors.category} required />
                <button type="submit" className="bg-blue-500 hover"></button>import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { useRouter } from 'next/router';
import { createBlog } from '../store/blogSlice';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Blog } from '../types';

const CreateBlogPage = () => {
  const [blogData, setBlogData] = useState<Omit<Blog, 'id'>>({
    title: '',
    description: '',
    category: '',
    published: false, // You might want a published status input later
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error: createError } = useSelector((state) => state.blogs); // Get loading and error from Redux

  const categories = ["Tech", "Lifestyle", "Health", "Travel"];

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!blogData.title.trim()) newErrors.title = "Title is required."; // Check for empty strings
    else if (blogData.title.length < 5) newErrors.title = "Title must be at least 5 characters.";

    if (!blogData.description.trim()) newErrors.description = "Description is required.";
    else if (blogData.description.length < 10) newErrors.description = "Description must be at least 10 characters.";

    if (!blogData.category) newErrors.category = "Category is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await dispatch(createBlog({ ...blogData, id: Date.now().toString() })).unwrap();
      toast.success("Blog created successfully!");
      router.push('/');
    } catch (error) {
      toast.error(error?.message || "Error creating blog.");
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Blog</h1>
      {createError && <p className="text-red-500 mb-4">{createError}</p>} {/* Display Redux error */}
      <form onSubmit={handleSubmit}>
        <FormInput label="Title" name="title" value={blogData.title} onChange={handleChange} error={errors.title} required />
        <FormInput label="Description" name="description" type="textarea" rows={5} value={blogData.description} onChange={handleChange} error={errors.description} required />
        <FormSelect label="Category" name="category" value={blogData.category} onChange={handleChange} options={categories} error={errors.category} required />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Creating..." : "Create Blog"} {/* Show loading message */}
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;