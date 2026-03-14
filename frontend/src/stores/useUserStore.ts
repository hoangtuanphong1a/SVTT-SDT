import { acceptHMRUpdate, defineStore } from 'pinia';
import type { User, UserStoreState } from '@/types';

const PERSIST_KEY = 'user-store';
const PERSIST_PATHS = ['currentUser', 'token', 'refreshToken', 'expiresAt'] as const;

type PersistedKeys = Pick<UserStoreState, (typeof PERSIST_PATHS)[number]>;

function loadPersistedState(): Partial<PersistedKeys> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return PERSIST_PATHS.reduce(
      (acc, key) => {
        if (key in parsed) acc[key] = parsed[key] as PersistedKeys[typeof key];
        return acc;
      },
      {} as Partial<PersistedKeys>
    );
  } catch {
    return {};
  }
}

function savePersistedState(state: UserStoreState) {
  if (typeof window === 'undefined') return;
  try {
    const toSave = PERSIST_PATHS.reduce(
      (acc, key) => {
        acc[key] = state[key];
        return acc;
      },
      {} as Record<string, unknown>
    );
    localStorage.setItem(PERSIST_KEY, JSON.stringify(toSave));
  } catch {
    // ignore
  }
}

const persisted = loadPersistedState();

export const useUserStore = defineStore('userStore', {
  state: (): UserStoreState => ({
    users: [],
    currentUser: persisted.currentUser ?? null,
    token: persisted.token ?? null,
    refreshToken: persisted.refreshToken ?? null,
    expiresAt: persisted.expiresAt ?? null
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.token,
    userToken: (state): string | null => state.token,
    isTokenExpired: (state): boolean => {
      if (!state.expiresAt) return false;
      return Date.now() >= state.expiresAt;
    },
    getUserById:
      (state) =>
      (id: string): User | undefined =>
        state.users.find((u) => u.id === id)
  },

  actions: {
    setUsers(users: User[]) {
      this.users = users ?? [];
    },

    setCurrentUser(user: User | null) {
      this.currentUser = user;
      savePersistedState(this.$state);
    },

    setToken(token: string | null, expiresAt?: number | null) {
      this.token = token;
      this.expiresAt = expiresAt ?? null;
      savePersistedState(this.$state);
    },

    setRefreshToken(refreshToken: string | null) {
      this.refreshToken = refreshToken;
      savePersistedState(this.$state);
    },

    /** Đăng nhập - lưu user + token */
    login(user: User, token: string, refreshToken?: string | null, expiresAt?: number | null) {
      this.currentUser = user;
      this.token = token;
      this.refreshToken = refreshToken ?? null;
      this.expiresAt = expiresAt ?? null;
      savePersistedState(this.$state);
    },

    /** Đăng xuất - xóa toàn bộ auth state */
    logout() {
      this.currentUser = null;
      this.token = null;
      this.refreshToken = null;
      this.expiresAt = null;
      savePersistedState(this.$state);
    },

    /** Cập nhật thông tin user hiện tại */
    updateCurrentUser(partial: Partial<User>) {
      if (this.currentUser) {
        this.currentUser = { ...this.currentUser, ...partial };
        savePersistedState(this.$state);
      }
    },

    /** Thêm/sửa user trong danh sách */
    upsertUser(user: User) {
      const index = this.users.findIndex((u) => u.id === user.id);
      if (index >= 0) {
        this.users[index] = user;
      } else {
        this.users.push(user);
      }
    },

    /** Xóa user khỏi danh sách */
    removeUser(id: string) {
      this.users = this.users.filter((u) => u.id !== id);
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
