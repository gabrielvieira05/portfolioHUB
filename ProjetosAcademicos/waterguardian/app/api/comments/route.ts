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
    const { content, postId } = body;

    if (!content || !postId) {
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

    const post = await prisma.post.findUnique({
      where: {
        id: postId
      }
    });

    if (!post) {
      return new NextResponse("Post não encontrado", { status: 404 });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: user.id,
        postId
      }
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.log("[COMMENT_CREATE_ERROR]", error);
    return new NextResponse("Erro interno", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return new NextResponse("ID do post é necessário", { status: 400 });
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId
      },
      include: {
        author: {
          select: {
            name: true,
            image: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.log("[COMMENTS_GET_ERROR]", error);
    return new NextResponse("Erro interno", { status: 500 });
  }
} 