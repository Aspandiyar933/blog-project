
import { PrismaClient } from '@prisma/client';
import PostContent from './PostContent';

const prisma = new PrismaClient();

export default async function Post({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
  });

  if (!post) return <div>Post not found</div>;

  return <PostContent post={post} />;
}