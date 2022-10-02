<template>
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
            JobRoles
        }, 
        methods: {
            createLearningJourney() {
                var attr = this.$refs.someName
                console.log(this.$refs)
                console.log("HERE")
            }
        }
    }
    </script>