<template>
    <div class="about">
        <Navbar />
        <h1>This is Learning Journeys Page</h1>
        <div>
            {{ userLearningJourneys }}
        </div>
    </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
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
    },
    components: {
        Navbar
    }
}
</script>
