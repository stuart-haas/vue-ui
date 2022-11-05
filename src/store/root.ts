import { defineStore, _GettersTree } from 'pinia';

export interface Actions {
  [key: string]: unknown;
}

export interface State {
  loading: boolean;
}

export const useRootStore = defineStore<
  string,
  State,
  _GettersTree<State>,
  Actions
>('root', {
  state: (): State => ({
    loading: false,
  }),
  actions: {},
});
