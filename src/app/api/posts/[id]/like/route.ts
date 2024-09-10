import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const post = await prisma.post.update({
    where: { id: parseInt(params.id) },
    data: { likes: { increment: 1 } },
  })
  return NextResponse.json(post)
}