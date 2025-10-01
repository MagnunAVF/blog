import { NextResponse } from "next/server";
import PostsRepository from "@/services/posts-repository";

export async function GET() {
  try {
    const posts = await PostsRepository.getAllPosts();

    return NextResponse.json(posts, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch posts." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = typeof body?.title === "string" ? body.title.trim() : "";
    const content =
      typeof body?.content === "string" ? body.content.trim() : "";

    if (!title || !content) {
      return NextResponse.json(
        { error: "Both 'title' and 'content' are required." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const created = await PostsRepository.addPost(title, content);

    return NextResponse.json(created, {
      status: 201,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }
}
