<script setup>

import { reactive } from 'vue';

import { usePostsStore } from '@/stores/posts';

const postsStore = usePostsStore();
const { createPost } = usePostsStore();


const formData = reactive({
    title: '',
    body: '',
});

</script>

<template>
    <main>
        <h1 class="title">Create a new Post</h1>
        <form @submit.prevent="createPost(formData)" class="w-1/2 mx-auto space-y-6">
            <div>
                <input type="text" placeholder="Post Title" v-model="formData.title" />
                <p v-if="postsStore.errors.title" class="error">{{ postsStore.errors.title[0] }}</p>
            </div>
            <div>
                <textarea name="6" placeholder="Post Content" v-model="formData.body"></textarea>
                <p v-if="postsStore.errors.body" class="error">{{ postsStore.errors.body[0] }}</p>
            </div>

            <button class="primary-btn">Create</button>
        </form>
    </main>
</template>