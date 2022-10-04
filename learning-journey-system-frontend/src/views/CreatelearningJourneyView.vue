<template>
    <div>
      <Navbar />
      <jobCards @view-skill="viewSkill" />
    </div>
  </template>
  
  <script>

  import Navbar from '@/components/Navbar.vue'
  import jobCards from '@/components/jobCards.vue'

  
  export default {
    name: 'CreateLearningJourneyView',
    components: {
      Navbar,
      jobCards
    },
}
  </script>
  











<!-- <template>
    <div>
        <Navbar/>
        <div class="container-fluid position-relative align-self-stretch p-5">
            <h1>Select Job Role</h1>
            <JobRoles></JobRoles>
            <p>SEE</p>
            <div v-on="createLearningJourney()"></div>
            <CreateLearningJourney></CreateLearningJourney>
        </div>
        
    </div>
</template>


<script>
    import Navbar from '@/components/Navbar.vue'
    import CreateLearningJourney from '@/components/CreateLearningJourney.vue'
    import JobRoles from '@/components/JobRoles.vue'
    
    export default {
        name: 'CreateLearningJourneyView',
        components: {
            Navbar,
            CreateLearningJourney,
            JobRoles,
            selectedJobRole:null
        }, 
        methods: {
            createLearningJourney() {

                var a = document.getElementsByTagName("a")
                console.log(a)

                for (let item of a) {
                    if(item.className == "btn") {
                        // console.log(item)
                        item.addEventListener("click", function() {
                            item.href = ""
                            this.selectedJobRole = item.id
                        })
                    }
                }

                console.log(this.selectedJobRole) //undefined 


                

            }
        }
    }
    </script> -->