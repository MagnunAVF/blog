import Post from "@/models/post";

export class PostsRepository {
  private store: Post[] = [
    new Post("First Post", "Welcome to the blog!"),
    new Post("Another Post", "This is a sample content body."),
  ];

  async getAllPosts(): Promise<Post[]> {
    return this.store;
  }

  async findPostById(id: string): Promise<Post | undefined> {
    return this.store.find((p) => p.id === id);
  }

  async addPost(title: string, content: string): Promise<Post> {
    const post = new Post(title, content);
    this.store.push(post);

    return post;
  }

  async updatePost(
    id: string,
    data: Partial<Pick<Post, "title" | "content">>
  ): Promise<Post | undefined> {
    const post = await this.findPostById(id);
    if (!post) return undefined;

    if (typeof data.title === "string") post.title = data.title;
    if (typeof data.content === "string") post.content = data.content;

    post.updatedAt = new Date();

    return post;
  }

  async deletePost(id: string): Promise<boolean> {
    const idx = this.store.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    this.store.splice(idx, 1);

    return true;
  }
}

const postsRepository = new PostsRepository();

export default postsRepository;
