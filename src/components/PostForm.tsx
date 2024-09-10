'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "../app/api/uploadthing/core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function PostForm({ post }: { post?: any }) {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [thumbnail, setThumbnail] = useState(post?.thumbnail || '');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = post ? `/api/posts/${post.id}` : '/api/posts';
    const method = post ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, thumbnail }),
    });

    if (response.ok) {
      router.push('/');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{post ? 'Edit Post' : 'Create New Post'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            <UploadButton<OurFileRouter, "imageUploader">
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res && res[0]) {
                  console.log("Upload completed. File URL:", res[0].url);
                  setThumbnail(res[0].url);
                }
              }}
              onUploadError={(error: Error) => {
                console.error("Upload error:", error);
                alert(`Upload ERROR! ${error.message}`);
              }}
            />
            {thumbnail && (
              <>
                <p>Current thumbnail URL: {thumbnail}</p>
                <img 
                  src={thumbnail} 
                  alt="Thumbnail preview" 
                  className="mt-2 h-32 object-cover rounded-md" 
                  onError={(e) => {
                    console.error("Image failed to load:", e);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" onClick={handleSubmit}>
          {post ? 'Update' : 'Create'} Post
        </Button>
      </CardFooter>
    </Card>
  );
}