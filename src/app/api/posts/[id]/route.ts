import { NextResponse } from "next/server";
import PostsRepository from "@/services/posts-repository";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const post = await PostsRepository.findPostById(id);

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }

    return NextResponse.json(post, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch post." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const data: { title?: string; content?: string } = {};
    if (typeof body?.title === "string") data.title = body.title.trim();
    if (typeof body?.content === "string") data.content = body.content.trim();

    if (!("title" in data) && !("content" in data)) {
      return NextResponse.json(
        { error: "Provide at least 'title' or 'content' to update." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const { id } = await params;
    const updated = await PostsRepository.updatePost(id, data);
    if (!updated) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }

    return NextResponse.json(updated, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const ok = await PostsRepository.deletePost(id);
    if (!ok) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }
    return new Response(null, {
      status: 204,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete post." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
