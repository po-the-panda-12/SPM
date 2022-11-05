<template>
    <div v-if="userLearningJourneys.length > 0">
        <div class="row">
            <div class="col-8">
                <h1 class="text-start m-5">My Learning Journeys</h1>
            </div>

            <div class="col-4 btn-group p-5 inline" role="group">
                <button class="btn btn-primary">
                    <router-link :to="'/NameLearningJourney'" class="text-light" style="text-decoration: none">
                        Create Learning Journey
                    </router-link>
                </button>
            </div>
        </div>
        <LearningJourneyCard v-for="learningJourney in userLearningJourneys" v-bind:learningJourney="learningJourney"
            :key="learningJourney" />
    </div>
    <div v-else>
        <div class="row">
            <h1 class="text-center my-5">Looks like you don't have a learning journey yet, create one now!</h1>
            <div class="col-4"></div>
            <div class="col-4 btn-group p-5 inline" role="group">
                <button class="btn btn-primary"><router-link :to="'/NameLearningJourney'" class="text-light" style="text-decoration: none">Create Learning Journey</router-link></button>
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
            userLearningJourneyIds: [],
            staffID: null
        }
    },
    methods:{
        async getUserLearningJourneys(){
            // get all learning journeys
            // TODO: get all learning journeys given userID
            await axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey?staff="+this.staffID)
                .then(response => {
                    console.log('response', response)
                    if(response.data.code === 404){
                        this.userLearningJourneys = []
                    }
                    else{
                        this.userLearningJourneys = response.data.data.learning_journey
                    }
                })
                .catch(error => console.log(error))
        },
        filterUserLearningJourneyIds(){
            this.userLearningJourneyIds = this.userLearningJourneys.map(learningJourney => learningJourney.lj_id)
        },
        
    },
    mounted() {
        this.staffID = this.$store.state.stored_staff_id
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
