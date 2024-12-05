<script setup>
import { reactive } from 'vue';
import useAuthStore from '@/stores/auth';

const authStore = useAuthStore();

const formData = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

</script>



<template>
  <main>
    <h1 class="title">Register a new Account</h1>
    <form @submit.prevent="() => { authStore.authenticate('register', formData) }" class="w-1/2 mx-auto space-y-6">
      <div>
        <input type="text" placeholder="Name" v-model="formData.name" />
      </div>
      <div>
        <input type="email" placeholder="Email" v-model="formData.email" />
      </div>
      <div>
        <input type="password" placeholder="Password" v-model="formData.password" />
      </div>
      <div>
        <input type="password" placeholder="Confirm Password" name="confirm_password"
          v-model="formData.password_confirmation" />
      </div>
      <button class="primary-btn">Register</button>
    </form>
  </main>
</template>
