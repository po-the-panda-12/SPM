<template>
    <div class="">

        <div class="row">
            <div class="col-8">
                <h1 class="text-start m-5">My Learning userLearningJourneys</h1>
            </div>

            <div class="col-4 btn-group btn-group-lg p-5 inline" role="group">
                <router-link :to="'/jobroles'" class="btn btn-outline-dark m-1 btn-primary text-light">Create Learning Journey</router-link>
                <!-- <a href="/#/createlearningJourney" class="btn btn-outline-dark m-1">Create</a> -->
                <a href="" class="btn btn-outline-dark m-1">Update</a>
                <a href="" class="btn btn-outline-dark m-1">Delete</a>
            </div>
        </div>

        <LearningJourneyCard v-for="learningJourney in userLearningJourneys" v-bind:learningJourney="learningJourney" :key="learningJourney"/>

    </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
import LearningJourneyCard from '@/components/LearningJourneyCard.vue'
import axios from 'axios'

export default {
    name: 'LearningJourneysView',
    data() {
        return {
            userLearningJourneys: [],

        }
    },
    mounted() {
        axios.get("https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/journey")
        .then(response => this.userLearningJourneys = response.data.data.learning_journey)
        .then(response => console.log(response))
        .then(response => console.log(this.userLearningJourneys))
    },
    components: {
        LearningJourneyCard
    }
}
</script>
