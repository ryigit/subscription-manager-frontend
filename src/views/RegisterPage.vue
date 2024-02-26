<template>
  <div class="relative flex flex-col justify-center min-h-screen overflow-hidden">
    <div
      class="w-full p-6 m-auto bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 lg:max-w-md"
    >
      <form class="mt-6" @submit="register">
        <div>
          <label for="email" class="block text-sm text-gray-800">Email</label>
          <input
            v-model="email"
            required
            type="email"
            class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div>
          <label for="name" class="block text-sm text-gray-800">Name</label>
          <input
            v-model="name"
            required
            type="text"
            class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div class="mt-4">
          <div>
            <label for="password" class="block text-sm text-gray-800">Password</label>
            <input
              v-model="password"
              required
              type="password"
              class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a href="#" class="text-xs text-gray-600 hover:underline">Forget Password?</a>
          <div class="mt-6">
            <button
              class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Register
            </button>
          </div>
        </div>
      </form>
      <p class="mt-8 text-xs font-light text-center text-gray-700">
        Have an account?
        <a href="/login" class="font-medium text-purple-600 hover:underline">Login</a>
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
      name: '',
      password: '',
      info: ''
    }
  },

  methods: {
    register(e) {
        console.log(this.email)
        axios
        .post('http://127.0.0.1:8000/api/auth/register', {
            email: this.email,
            name: this.name,
            password: this.password,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        .then(function (response) {
            console.log(response);
        })
        .catch(error => console.log(error))
        setTimeout(() => {
            this.$router.push({ 
                name: 'login', 
                query: { successMessage: 'Registration successful. You can now login.' } 
            });
        }, 1000);
        e.preventDefault();
    }
  }
}
</script>
