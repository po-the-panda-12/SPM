<template>
  <div class="home">
    <Navbar />
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>This is the home page</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    Navbar
  }
}
</script>
