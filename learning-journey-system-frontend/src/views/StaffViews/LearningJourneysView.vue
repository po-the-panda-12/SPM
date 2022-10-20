<template>
    <div class="">

        <div class="row">
            <div class="col-8">
                <h1 class="text-start m-5">My Learning userLearningJourneys</h1>
            </div>

            <div class="col-4 btn-group btn-group-lg p-5 inline" role="group">
                <router-link :to="'/jobroles'" class="btn btn-outline-dark m-1 btn-primary text-light" @click="createNewLearningJourneyId">Create Learning Journey</router-link>
                <!-- <a href="/#/createlearningJourney" class="btn btn-outline-dark m-1">Create</a> -->
                <a class="btn btn-outline-dark m-1">Update</a>
                <a href="" class="btn btn-outline-dark m-1">Delete</a>
            </div>
        </div>
        {{ filterUserLearningJourneyIds() }}
        <LearningJourneyCard v-for="learningJourney in userLearningJourneys" v-bind:learningJourney="learningJourney" :key="learningJourney"/>
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
            userLearningJourneyIds: [],
        }
    },
    methods:{
        getUserLearningJourneys(){
            // get all learning journeys
            // TODO: get all learning journeys given userID
            axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey")
                .then(response => this.userLearningJourneys = response.data.data.learning_journey)
                .catch(error => console.log(error))
        },
        filterUserLearningJourneyIds(){
            this.userLearningJourneyIds = this.userLearningJourneys.map(learningJourney => learningJourney.lj_id)
        },
        createNewLearningJourneyId(){
            const newId = Math.max(...this.userLearningJourneyIds) + 1
            this.$store.commit('setCurrentLJId', newId)
        }
    },
    mounted() {
        this.getUserLearningJourneys()
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
