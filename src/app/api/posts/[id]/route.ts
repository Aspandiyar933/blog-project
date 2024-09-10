import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(params.id) },
  })
  return NextResponse.json(post)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const post = await prisma.post.update({
    where: { id: parseInt(params.id) },
    data: {
      title: body.title,
      content: body.content,
      thumbnail: body.thumbnail,
    },
  })
  return NextResponse.json(post)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.post.delete({
    where: { id: parseInt(params.id) },
  })
  return new NextResponse(null, { status: 204 })
}