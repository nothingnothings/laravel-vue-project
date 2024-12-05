import { defineStore } from 'pinia';

const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: null,
      errors: {},
    };
  },
  actions: {
    // * GET authenticated user:

    async getUser() {
      if (localStorage.getItem('token')) {
        const res = await fetch('/api/user', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          this.user = data;
        }
      }
    },

    // * Login or register user:
    async authenticate(apiRoute, formData) {
      const res = await fetch(`/api/${apiRoute}`, {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.errors) {
        console.log(data.errors);
        this.errors = data.errors;
      } else {
        localStorage.setItem('token', data.token);
        this.user = data.user;
        this.errors = null;
        this.router.push({ name: 'home' }); // * Use the router embedded into pinea, in app.js
      }
    },

    // * Log user out:
    async logout() {
      const res = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.removeItem('token');
        this.user = null;
        this.errors = {};
        this.router.push({ name: 'home' });
      }
    },
  },
  //   getters: {
  //     userAge: (state) => state.user
  // }, // * Computed properties are set here.
});

export default useAuthStore;
