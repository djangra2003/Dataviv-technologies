import React from 'react';

interface BlogCardProps {
  title: string;
  description: string;
  category: string;
  onDelete: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, description, category, onDelete }) => {
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="font-bold">{title}</h2>
      <p>{description}</p>
      <p className="text-gray-500">{category}</p>
      <button onClick={onDelete} className="text-red-500">Delete</button>
    </div>
  );
};

export default BlogCard;