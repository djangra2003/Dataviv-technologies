import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog } from '../store/blogSlice';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';

const CreateBlog: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Tech');
  const [tags, setTags] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState('');
  const [publishedStatus, setPublishedStatus] = useState('Draft');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBlog = {
      id: Date.now(),
      title,
      description,
      category,
      tags,
      coverImage,
      publishedStatus,
    };
    dispatch(addBlog(newBlog));
    // Reset form
    setTitle('');
    setDescription('');
    setCategory('Tech');
    setTags([]);
    setCoverImage('');
    setPublishedStatus('Draft');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-2xl font-bold">Create New Blog Post</h1>
      <FormInput label="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <FormInput label="Description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <FormSelect label="Category" options={['Tech', 'Lifestyle', 'Health']} value={category} onChange={(e) => setCategory(e.target.value)} />
      {/* Add more form fields as needed */}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Submit</button>
    </form>
  );
};

export default CreateBlog;