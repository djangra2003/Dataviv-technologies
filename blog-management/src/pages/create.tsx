import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog } from '../store/blogSlice';
import { showToast } from '../utils/toastHandler';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

const CreateBlogPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [publishedStatus, setPublishedStatus] = useState('draft');
  const [publishedDate, setPublishedDate] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = () => {
    if (title.length < 5 || description.length < 10 || !category) {
      showToast('error', 'Please fill in all required fields correctly.');
      return;
    }

    const newBlog = {
      id: uuidv4(),
      title,
      description,
      category,
      tags,
      coverImage,
      publishedStatus,
      publishedDate: publishedStatus === 'published' ? publishedDate : null,
    };

    dispatch(addBlog(newBlog));
    showToast('success', 'Blog created successfully!');
    router.push('/');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Blog</h1>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
          required
        ></textarea>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
          required
        >
          <option value="">Select Category</option>
          <option value="Tech">Tech</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Health">Health</option>
        </select>
        <input
          type="file"
          onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
          className="border border-gray-300 rounded p-2 w-full"
        />
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="draft"
              checked={publishedStatus === 'draft'}
              onChange={(e) => setPublishedStatus(e.target.value)}
            />
            <span>Draft</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="published"
              checked={publishedStatus === 'published'}
              onChange={(e) => setPublishedStatus(e.target.value)}
            />
            <span>Published</span>
          </label>
        </div>
        {publishedStatus === 'published' && (
          <input
            type="date"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        )}
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;