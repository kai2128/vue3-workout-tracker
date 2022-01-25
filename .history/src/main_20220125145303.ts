import { useUserStore } from './stores/user';
// register vue composition api globally
import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'

// windicss layers
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
// your custom styles here
import './styles/main.css'
// windicss utilities should be the last style import
import 'virtual:windi-utilities.css'
// windicss devtools support (dev only)
import 'virtual:windi-devtools'
import { supabase } from './supabase/init';
import { MessageType, setMsg } from './composables/useFlashMessage';

const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.globEager('./modules/*.ts')).forEach(i => i.install?.(ctx))

    // const pinia = createPinia();
    // ctx.app.use(pinia)

    // if (import.meta.env.SSR) {
    //   ctx.initialState.pinia = pinia.state.value
    // } else {
    //   pinia.state.value = ctx.initialState.pinia || {}
    // }

    // ctx.router.beforeEach((to, from, next) => {
    //   const store = useUserStore(pinia)
    //   if (!store.user)
    //     // perform the (user-implemented) store action to fill the store's state
    //     store.user = supabase.auth.user();
    //   next()
    // })

    ctx.router.beforeEach((to, from, next) => {
      const user = supabase.auth.user();
      if(to.matched.some((res) => res.meta.auth)) {
        if(user) {
          next();
          return;
        }
        setMsg('You are not logged in, please login or register a new account', MessageType.ERROR);
        next({name: "Login"});
      }
      next();
    })
  },
)
