<script setup>
import { onMounted, reactive } from 'vue';
import useAuthStore from '@/stores/auth';

const authStore = useAuthStore();
const { authenticate } = useAuthStore();

const formData = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

onMounted(
  () => (authStore.errors.value = {})
)

</script>


<template>
  <main>
    <h1 class="title">Register a new Account</h1>
    <form @submit.prevent="authenticate('register', formData)" class="w-1/2 mx-auto space-y-6">
      <div>
        <input type="text" placeholder="Name" v-model="formData.name" />
        <p v-if="authStore.errors.name" class="error">{{ authStore.errors.name[0] }}</p>
      </div>
      <div>
        <input type="email" placeholder="Email" v-model="formData.email" />
        <p v-if="authStore.errors.email" class="error">{{ authStore.errors.email[0] }}</p>
      </div>
      <div>
        <input type="password" placeholder="Password" v-model="formData.password" />
        <p v-if="authStore.errors.password" class="error">{{ authStore.errors.password[0] }}</p>
      </div>
      <div>
        <input type="password" placeholder="Confirm Password" name="confirm_password"
          v-model="formData.password_confirmation" />
      </div>
      <button class="primary-btn">Register</button>
    </form>
  </main>
</template>
