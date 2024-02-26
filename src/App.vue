<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="bg-gray-800">
        <div class="mx-auto max-w-7xl">
          <div class="relative flex h-16 items-center justify-between">
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div class="hidden sm:ml-6 sm:block">
                <div class="flex space-x-4">
                  <RouterLink class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" to="/subscriptions">All Subscriptions</RouterLink>
                  <RouterLink v-if="isLoggedIn" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" to="/mysubscriptions">My Subscriptions</RouterLink>
                </div>
              </div>
              <div class="hidden sm:ml-6 sm:block">
                <div class="flex space-x-4">
                  <RouterLink v-if="isLoggedIn" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" to="/logout">Logout</RouterLink>
                  <RouterLink v-else class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium text-end" to="/login">Login</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script>
  export default {
      data() {
          return {
              isLoggedIn: !!localStorage.getItem('token')
          };
      }
  };
</script>
