<template>
    <div>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      localStorage.removeItem('token');
      
      this.$router.push({ name: 'login' });
    }
  };
  </script>