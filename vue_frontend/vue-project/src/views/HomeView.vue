<script setup>
import { onMounted, ref } from 'vue';

// import TheWelcome from '../components/TheWelcome.vue'
import { usePostsStore } from '@/stores/posts';

const { getAllPosts } = usePostsStore();

const posts = ref([]); // local state.

onMounted(async () => posts.value = await getAllPosts());

</script>

<template>
  <main>
    <h1 class="title">Latest Posts</h1>

    <div v-if="posts.length > 0">
      <div v-for="post in posts" :key="post.id" class="border-l-4 border-blue-500 pl-4 mb-12">
        <h2 class="font-bold text-3xl">{{ post.title }}</h2>
        <p class="text-sm text-slate-600 mb-4">{{ post.user.name }}</p>
        <p>
          {{ post.body }}
          <RouterLink class="text-blue-500 font-bold-underline" :to="{ name: 'show', params: { id: post.id } }">Read
            more...
          </RouterLink>
        </p>
      </div>
    </div>
    <div v-else>No posts found. <RouterLink class="text-blue-500 font-bold-underline" :to="{ name: 'create' }">Create a
        new post</RouterLink>
    </div>
  </main>
</template>
