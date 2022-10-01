<template>
    <div>
        <p>HELLO</p>
        <createlearningJourney></createlearningJourney>
    </div>
</template>


<script>
    import Navbar from '@/components/Navbar.vue'
    import CreateLearningJourney from '@/components/CreateLearningJourney.vue'
    
    export default {
        name: 'CreateLearningJourneyView',
        components: {
            Navbar,
            CreateLearningJourney
        }
    }
    </script>