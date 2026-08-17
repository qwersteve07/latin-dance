export type Platform = "instagram" | "threads" | "medium" | "blog" | "other";

export type Article = {
  title: string;
  link: string;
  platform: Platform;
};

export type ArticleCategory = {
  id: string;
  articles: Article[];
};
