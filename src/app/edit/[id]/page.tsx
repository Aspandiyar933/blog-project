import PostForm from '@/components/PostForm';

export default function EditPost({ params }: { params: { id: string } }) {
  return <PostForm post={params.id} />;
}