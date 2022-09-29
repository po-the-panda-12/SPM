<template>
    <div class="about">
        <Navbar />
        <h1>This is Learning Journeys Page</h1>
        
        <LearningJourneyCard v-for="learningJourney in userLearningJourneys" v-bind:learningJourney="learningJourney"/>
        <!-- <div>
            {{ userLearningJourneys }}
        </div> -->
    </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
import LearningJourneyCard from '@/components/LearningJourneyCard.vue'

export default {
    name: 'LearningJourneysView',
    data() {
        return {
            userLearningJourneys: []
        }
    },
    mounted() {
        axios.get("https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/journey")
        .then(response => this.userLearningJourneys = response.data.data.learning_journey)
        .then(response => console.log(response))
    },
    components: {
        Navbar,
        LearningJourneyCard
    }
}
</script>
