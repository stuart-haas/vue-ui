export type Repository = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  visibility: string;
  topics: string[];
  pushed_at: string;
  created_at: string;
  owner: { login: string };
};

export type Author = {
  html_url: string;
  avatar_url: string;
  name: string;
  date: string;
};

export type CommitAuthor = {
  name: string;
  email: string;
  date: string;
};

export type CommitData = {
  message: string;
  author: CommitAuthor;
};

export type CommitStats = {
  additions: number;
  deletions: number;
  total: number;
};

export type Commit = {
  node_id: number;
  url: string;
  html_url: string;
  commit: CommitData;
  author: Author;
  stats: CommitStats;
  files: File[];
  sha: string;
};

export type File = {
  filename: string;
  previous_filename: string;
  status: 'added' | 'modified' | 'removed' | 'renamed';
  contents_url: string;
  additions: number;
  deletions: number;
  changes: number;
};

export type Branch = {
  name: string;
};
