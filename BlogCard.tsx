import Link from 'next/link';
import { Blog } from '../types';

interface BlogCardProps {
  blog: Blog;
  onDelete: (id: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, onDelete }) => {
  return (
    <div className="border p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold">{blog.title}</h2>
      <p className="text-gray-600 line-clamp-3">{blog.description}</p> {/* Added line-clamp */}
      <p className="text-sm text-gray-500">Category: {blog.category}</p>
      <div className="mt-2 flex justify-between">
        <Link href={`/blogs/${blog.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Read More
        </Link>
        <button onClick={() => onDelete(blog.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogCard;