<template>
    <div>
      <Navbar />
      <skillCards />
      <courseCards />
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import Navbar from '@/components/Navbar.vue'
  import skillCards from '@/components/skillCards.vue'
  import courseCards from '@/components/courseCards.vue'
  
  export default {
    name: 'viewSkillsandCourses',
    components: {
      Navbar,
      skillCards,
      courseCards
    }
  }
  </script>
  