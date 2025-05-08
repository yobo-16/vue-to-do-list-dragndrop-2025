import { defineStore } from "pinia";
import { supabase } from "@/api/supabase";

export const useAuthStore = defineStore("auth",{
    state: () => ({
        user: null,
        //isAuthenticated: false,
    }),
    actions: {

        // Sign Up
        async register(email, password) {
            const { data, error } = await supabase.auth.signUp({
              email,
              password,
            });
      
            if (error) throw error;
            this.user = data.user;
          },  

        //   Login
        async login(email, password) {
            const { data, error } = await supabase.auth.signInWithPassword({
              email,
              password,
            });
      
            if (error) throw error;
            this.user = data.user;
          },
        //   Logout
        async logout() {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            this.user = null;
          },
          async fetchUser() {
            const { data: { user } } = await supabase.auth.getUser();
            this.user = user;
          },
    }
})