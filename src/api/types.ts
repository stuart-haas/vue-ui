export type Repository = {
  id: number;
  name: string;
  html_url: string;
  visibility: string;
  topics: string[];
  pushed_at: string;
  created_at: string;
  owner: { login: string };
};
