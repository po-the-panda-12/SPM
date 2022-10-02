<template>
    <div class="home">

      <Navbar />
      <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
      <skillCards />
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
 
  import Navbar from '@/components/Navbar.vue'
  import skillCards from '@/components/skillCards.vue'
  
  export default {
    name: 'viewSkillsandCourses',
    components: {
      Navbar,
      skillCards
    }
  }
  </script>
  