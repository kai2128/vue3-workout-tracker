import { Session, User } from '@supabase/supabase-js'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { MessageType, setMsg } from '~/composables/useFlashMessage';
type Nullable<T> = T | undefined | null;
export const useUserStore = defineStore('user', {
  state: () => {
    return {user: null as Nullable<Session>}
  },
  getters: {
    loggedIn: (state) => state.user != null ? true : false,
    loggedOut: (state) => state.user == null ? true : false,
    user: (state) => state.user
  },

  actions: {
    setUser(user?: Session){
      if(user == null && this.user == null)
        setMsg('Logged out. Please login or register a new account', MessageType.INFO);

      if (user == null && this.user != null)
        setMsg('Logged out.', MessageType.INFO);

      if (user != null && this.user != null)
        setMsg('Logged in.', MessageType.SUCCESS);

      if (user != null && this.user == null)
        setMsg('Logged in. ', MessageType.SUCCESS);

      this.user = user;
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
