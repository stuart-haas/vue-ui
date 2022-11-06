import { defineStore, _GettersTree } from 'pinia';

export interface Actions {
  toggleSidebar: () => void;
}

export interface State {
  sidebarOpen: boolean;
}

export const useRootStore = defineStore<
  string,
  State,
  _GettersTree<State>,
  Actions
>('root', {
  state: (): State => ({
    sidebarOpen: true,
  }),
  actions: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    }
  },
});
