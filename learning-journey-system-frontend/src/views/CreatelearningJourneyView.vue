<template>
    <div>
      <Navbar />
      <!-- <jobCards @view-skill="viewSkill" /> -->
      <!-- <jobSkillCards @view-skill="viewSkill"/> -->
      <courseCards @view-skill="viewSkill"/>
      
    </div>
  </template>
  
  <script>

  import Navbar from '@/components/Navbar.vue'
//   import jobCards from '@/components/jobCards.vue'
  // import jobSkillCards from '@/components/jobSkillCards.vue'
  import courseCards from '@/components/courseCards.vue'

  
  
  export default {
    name: 'CreateLearningJourneyView',
    components: {
      Navbar,
    //   jobCards,
      // jobSkillCards,
      courseCards
    },
}
  </script>
  
