'use client';

import Image from "next/image"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Post {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  likes: number;
}

export default function PostContent({ post }: { post: Post }) {
  const [likes, setLikes] = useState(post.likes);
  const router = useRouter();

  const handleLike = async () => {
    const response = await fetch(`/api/posts/${post.id}/like`, { method: 'POST' });
    if (response.ok) {
      setLikes(likes + 1);
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`/api/posts/${post.id}`, { method: 'DELETE' });
    if (response.ok) {
      router.push('/');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Image src={post.thumbnail} alt={post.title} className="w-full h-64 object-cover mb-8" />
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="flex items-center justify-between">
        <Link href={`/edit/${post.id}`} className="bg-blue-500 text-white px-4 py-2 rounded">
          Edit
        </Link>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
        <button onClick={handleLike} className="bg-green-500 text-white px-4 py-2 rounded">
          Like ({likes})
        </button>
      </div>
    </div>
  );
}