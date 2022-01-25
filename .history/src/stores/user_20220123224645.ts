import { User } from '@supabase/supabase-js'
import { acceptHMRUpdate, defineStore } from 'pinia'
type Nullable<T> = T | undefined | null;
export const useUserStore = defineStore('user', {
  state: () => {
    return {user: null as Nullable<User>}
  },
  getters: {},

  actions: {
    setUser(user: User){
      this.user = user;
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
