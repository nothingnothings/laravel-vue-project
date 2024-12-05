import { defineStore } from 'pinia';

const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: 'jon',
    };
  },
  actions: {
    authenticate: async (apiRoute, formData) => {
      const res = await fetch(`/api/${apiRoute}`, {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
    },
  },
  //   getters: {
  //     userAge: (state) => state.user
  // }, // * Computed properties are set here.
});

export default useAuthStore;
