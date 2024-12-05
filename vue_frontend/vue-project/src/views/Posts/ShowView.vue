<script setup>

import { onMounted, reactive, ref } from 'vue';

import { usePostsStore } from '@/stores/posts';
import useAuthStore from '@/stores/auth';
import { useRoute } from 'vue-router';

const route = useRoute(); // * get the vue router, to get the segment, in the url.

const postsStore = usePostsStore();
const authStore = useAuthStore();
const { getSinglePost, deletePost } = usePostsStore();

const post = ref(null);


onMounted(async () => post.value = await getSinglePost(route.params.id));


</script>

<template>
    <main>
        <div v-if="post">
            <div class="border-l-4 border-blue-500 pl-4 mt-12">
                <h2 class="font-bold text-3xl">{{ post.title }}</h2>
                <p class="text-sm text-slate-600 mb-4">{{ post.user.name }}</p>
                <p>
                    {{ post.body }}
                </p>
                <div v-if="authStore.user && authStore.user.id === post.user_id" class="flex items-center gap-6 mt-6">
                    <form @submit.prevent="deletePost(post)"
                        class="text-red-500 font-bold px-2 py-1 border border-red-300">
                        <button>Delete</button>
                    </form>
                    <RouterLink class="text-green-500 font-bold px-2 py-1 border border-green-300"
                        :to="{ name: 'edit', params: { id: post.id } }">Update</RouterLink>
                </div>
            </div>
        </div>
        <div v-else>Post does not exist.</div>
    </main>
</template>