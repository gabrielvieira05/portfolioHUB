import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse("Não autorizado", { status: 401 });
    }

    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return new NextResponse("Dados incompletos", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    });

    if (!user) {
      return new NextResponse("Usuário não encontrado", { status: 404 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: user.id
      }
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("[POST_CREATE_ERROR]", error);
    return new NextResponse("Erro interno", { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
            image: true
          }
        },
        comments: {
          include: {
            author: {
              select: {
                name: true,
                image: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.log("[POSTS_GET_ERROR]", error);
    return new NextResponse("Erro interno", { status: 500 });
  }
} 