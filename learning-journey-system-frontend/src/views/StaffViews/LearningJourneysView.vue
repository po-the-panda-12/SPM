<template>
    <div v-if="userLearningJourneys.length > 0">
        <div class="row">
            <div class="col-8">
                <h1 class="text-start m-5">My Learning userLearningJourneys</h1>
            </div>

            <div class="col-4 btn-group btn-group-lg p-5 inline" role="group">
                <router-link :to="'/jobroles'" class="btn btn-outline-dark m-1 btn-primary text-light">Create Learning
                    Journey</router-link>
                <!-- <a href="/#/createlearningJourney" class="btn btn-outline-dark m-1">Create</a> -->
                <a href="" class="btn btn-outline-dark m-1">Update</a>
                <a href="" class="btn btn-outline-dark m-1">Delete</a>
            </div>
        </div>
        <LearningJourneyCard v-for="learningJourney in userLearningJourneys" v-bind:learningJourney="learningJourney"
            :key="learningJourney" />
    </div>
    <div v-else>
        <div class="row">
            <h1 class="text-center my-5">Looks like you don't have a learning journey yet, create one now!</h1>
            <div class="col-4"></div>
            <div class="col-4 btn-group btn-group-lg p-5 inline" role="group">
                <router-link :to="'/jobroles'" class="btn btn-outline-dark m-1 btn-primary text-light">Create Learning
                    Journey
                </router-link>
            </div>
            <div class="col-4"></div>
        </div>
    </div>
</template>
<script>
import LearningJourneyCard from '@/components/LearningJourneys/LearningJourneyCard.vue'
import axios from 'axios'

export default {
    name: 'LearningJourneysView',
    data() {
        return {
            userLearningJourneys: [],

        }
    },
    mounted() {
        axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey")
        .then(response => this.userLearningJourneys = response.data.data.learning_journey)
    },
    components: {
        LearningJourneyCard
    },
    created(){
        if(!this.$store.state.stored_current_accessrole){
        this.$router.push('/')
        }
    }    
}
</script>
