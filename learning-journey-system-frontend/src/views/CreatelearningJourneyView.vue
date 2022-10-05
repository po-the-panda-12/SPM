<template>
    <div>
      <Navbar />

      <courseCards @save-journey="saveJourney"/>
      <!-- <courseCards @view-skill="viewSkill"/> -->
      
    </div>
  </template>
  
  <script>

  import axios from 'axios'
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

    methods: {
      
      saveJourney(role_id, skill_id, course_id) {
        console.log(role_id, skill_id, course_id)
        // axios.post("https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/learning_journey", this.journey)
        // .then(response => {
        //   console.log(response);
        //   this.$router.push({ name: 'LearningJourneyView' });
        // })
        // .catch(error => alert(error));
      },
    }
}
  </script>
  
