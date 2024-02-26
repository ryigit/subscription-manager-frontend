<template>
    <div class="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
        <div
            class="w-full p-6 m-auto bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 lg:max-w-md">
            <form class="mt-6" @submit.prevent="login">
                <div>
                    <label for="email" class="block text-sm text-gray-800">Email</label>
                    <input type="email"
                        v-model="email"
                        required
                        class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40">
                </div>
                <div class="mt-4">
                    <div>
                        <label for="password" class="block text-sm text-gray-800">Password</label>
                        <input type="password"
                            v-model="password"
                            required
                            class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40">
                    </div>
                    <a href="#" class="text-xs text-gray-600 hover:underline">Forget Password?</a>
                    <div class="mt-6">
                        <button
                            class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Login
                        </button>
                    </div>
                </div>
            </form>
            <p class="mt-8 text-xs font-light text-center text-gray-700"> Don't have an account? 
                <a href="/register" class="font-medium text-purple-600 hover:underline">Sign up</a>
            </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    msg: String
  },

  data() {
    return {
      email: '',
      password: '',
      successMessage: ''
    }
  },
  created() {
    if (this.$route.query.successMessage) {
        this.successMessage = this.$route.query.successMessage;
    }
  },
  methods: {
    async login(e) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
          email: this.email,
          password: this.password
        });

        const token = response.data.token;

        localStorage.setItem('token', token);

        this.$router.push({ name: 'home' });
      } catch (error) {
        console.error('Login error: ', error);
      }
      e.preventDefault();
    }
  }
}
</script>