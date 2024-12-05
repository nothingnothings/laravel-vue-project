import useAuthStore from './auth';

import { defineStore } from 'pinia';

export const usePostsStore = defineStore('posts', {
  state: () => {
    return {
      errors: {},
    };
  },
  actions: {
    async getAllPosts() {
      const res = await fetch('/api/posts');
      const data = await res.json();

      return data;
    },
    async getSinglePost(id) {
      const res = await fetch(`/api/posts/${id}`);
      const data = await res.json();

      return data.post; // return only the post, without the user.
    },
    async createPost(formData) {
      const res = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();

      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.router.push({ name: 'home' });
        this.errors = {};
      }
    },
    async deletePost(post) {
      const authStore = useAuthStore();

      if (authStore.user.id === post.user_id) {
        const res = await fetch(`/api/posts/${post.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();

        if (res.ok) {
          this.router.push({ name: 'home' });
          this.errors = {};
        }
      }
    },
    async updatePost(post, formData) {
      const authStore = useAuthStore();

      if (authStore.user.id === post.user_id) {
        const res = await fetch(`/api/posts/${post.id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (data.errors) {
          this.errors = data.errors;
        } else {
          this.router.push({ name: 'home' });
          this.errors = {};
        }
      }
    },
  },
});

export default usePostsStore;
