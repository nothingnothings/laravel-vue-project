<script setup>

import { reactive } from 'vue';

import { useRoute, useRouter } from 'vue-router';

import { usePostsStore } from '@/stores/posts';

import useAuthStore from '@/stores/auth';


const authStore = useAuthStore();
const { editPost, getSinglePost, updatePost } = usePostsStore();
const postsStore = usePostsStore();

const route = useRoute(); // * get the vue router, to get the segment, in the url.
const router = useRouter();

const formData = reactive({
    title: '',
    body: '',
});

const post = ref(null);

onMounted(async () => {
    post.value = await getSinglePost(route.params.id);

    if (authStore.user.value.id !== post.value.user_id) {
        router.push({ name: 'home' });
    } else {
        formData.title = post.value.title;
        formData.body = post.value.body;
    }
});


</script>

<template>
    <main>
        <h1 class="title">Update a Post</h1>
        <form @submit.prevent="updatePost(post, formData)" class="w-1/2 mx-auto space-y-6">
            <div>
                <input type="text" placeholder="Post Title" v-model="formData.title" />
                <p v-if="postsStore.errors.title" class="error">{{ postsStore.errors.title[0] }}</p>
            </div>
            <div>
                <textarea name="6" placeholder="Post Content" v-model="formData.body"></textarea>
                <p v-if="postsStore.errors.body" class="error">{{ postsStore.errors.body[0] }}</p>
            </div>

            <button class="primary-btn">Update</button>
        </form>
    </main>
</template>