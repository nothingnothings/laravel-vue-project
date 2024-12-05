<script setup>
import { onMounted, reactive } from 'vue';
import useAuthStore from '@/stores/auth';

const authStore = useAuthStore();
const { authenticate } = useAuthStore();

const formData = reactive({
    email: '',
    password: '',
});

onMounted(
    () => (authStore.errors.value = {})
)

</script>


<template>
    <main>
        <h1 class="title">Log In</h1>
        <form @submit.prevent="authenticate('login', formData)" class="w-1/2 mx-auto space-y-6">
            <div>
                <input type="email" placeholder="Email" v-model="formData.email" />
                <p v-if="authStore.errors.email" class="error">{{ authStore.errors.email[0] }}</p>
            </div>
            <div>
                <input type="password" placeholder="Password" v-model="formData.password" />
                <p v-if="authStore.errors.password" class="error">{{ authStore.errors.password[0] }}</p>
            </div>
            <button class="primary-btn">Log In</button>
        </form>
    </main>
</template>
