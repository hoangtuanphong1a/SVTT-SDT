import { acceptHMRUpdate, defineStore } from 'pinia';
import type { AppStoreState } from '@/types';

const DEFAULT_LOCALE = 'en';

export const useAppStore = defineStore('appStore', {
  state: (): AppStoreState => ({
    isLoading: false,
    sidebarCollapsed: false,
    locale: DEFAULT_LOCALE
  }),

  getters: {
    isSidebarCollapsed: (state): boolean => state.sidebarCollapsed
  },

  actions: {
    setLoading(loading: boolean) {
      this.isLoading = loading;
    },

    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },

    setSidebarCollapsed(collapsed: boolean) {
      this.sidebarCollapsed = collapsed;
    },

    setLocale(locale: string) {
      this.locale = locale;
    },

    reset() {
      this.isLoading = false;
      this.sidebarCollapsed = false;
      this.locale = DEFAULT_LOCALE;
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}
