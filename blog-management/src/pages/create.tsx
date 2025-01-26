import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog } from '../store/blogSlice';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import FormRadio from '../components/FormRadio';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const CreateBlog: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [publishedStatus, setPublishedStatus] = useState<'Draft' | 'Published'>('Draft');
  const [publishedDate, setPublishedDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.length < 5) {
      toast.error('Title must be at least 5 characters long.');
      return;
    }
    if (description.length < 10) {
      toast.error('Description must be at least 10 characters long.');
      return;
    }
    if (!category) {
      toast.error('Category is required.');
      return;
    }
    const newBlog = {
      id: uuidv4(),
      title,
      description,
      category,
      tags,
      coverImage: coverImage ? URL.createObjectURL(coverImage) : undefined,
      publishedStatus,
      publishedDate: publishedStatus === 'Published' ? publishedDate : undefined,
    };
    dispatch(addBlog(newBlog));
    toast.success('Blog created successfully!');
    // Reset form
    setTitle('');
    setDescription('');
    setCategory('');
    setTags([]);
    setCoverImage(null);
    setPublishedStatus('Draft');
    setPublishedDate('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <FormInput label="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <FormInput label="Description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <FormSelect
          label="Category"
          options={['Tech', 'Lifestyle', 'Health']}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <FormInput
          label="Tags (comma separated)"
          type="text"
          value={tags .join(', ')}
          onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files ? e.target.files[0] : null)}
          className="mb-4"
        />
        <FormRadio
          label="Published Status"
          options={[
            { value: 'Draft', label: 'Draft' },
            { value: 'Published', label: 'Published' },
            
          ]}
          selectedValue={publishedStatus}
          onChange={(value: 'Draft' | 'Published') => setPublishedStatus(value)}
        />
        {publishedStatus === 'Published' && (
          <FormInput
            label="Published Date"
            type="date"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
          />
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;