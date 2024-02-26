<template>
    <div class="w-full p-6 m-auto bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 lg:max-w-md mt-5">
        <h1>Error</h1>
        <p class="block text-sm text-gray-800 mb-5">{{ errorMessage }}</p>
        <RouterLink class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" to="/login">Login</RouterLink>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        errorMessage: 'You do not have access to this page. Please log in to continue.'
      };
    }
  };
  </script>