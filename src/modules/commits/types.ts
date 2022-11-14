import { Commit, File } from '@/api';

export type SetCommitDetail = (item: Commit) => void;

export type SetFileDetail = (item: File, rawData: string) => void;
