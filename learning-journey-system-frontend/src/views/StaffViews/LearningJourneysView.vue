<template>
    <Loading v-if="loading"></Loading>
    <div class="container p-5" v-if="userLearningJourneys.length != null || userLearningJourneys.length > 0">
        <div class="row mb-5">
            <div class="d-flex">
                <h1 class="fs-2 fw-bold me-auto my-auto">My Learning Journeys</h1>
                <div class="fs-6 ms-auto"><router-link :to="'/jobroles'" class="btn btn-outline-dark">Create Journey</router-link></div>
            </div>
        </div>
        <div class="row">
            <div class="text-center">
                <LearningJourneyCard v-for="learningJourney in userLearningJourneys" v-bind:learningJourney="learningJourney"
                    :key="learningJourney" />
            </div>
        </div>
    </div>

    <div class="container" v-else>
        <div class="text-center">
            <img src="https://bbs.binus.ac.id/mm-blendedlearning/wp-content/uploads/sites/13/2021/02/how-design-thinking-transforming-learning-experience-free-ebook.jpg" alt="" class="mt-5" style="width:45%">
            <h1 class="fs-2 mt-4 mb-5">Looks like you don't have a learning journey yet. <br>Click the button below to start!</h1>
            <router-link :to="'/jobroles'" class="btn btn-outline-dark px-4 py-2 fs-4" style="text-decoration: none">Start your Journey</router-link>
        </div>
    </div>
</template>
<script>
import LearningJourneyCard from '@/components/LearningJourneys/LearningJourneyCard.vue'
import Loading from '@/components/Common/Loading.vue';
import axios from 'axios'

export default {
    name: 'LearningJourneysView',
    components: {
        LearningJourneyCard,
        Loading
    },
    data() {
        return {
            userLearningJourneys: [],
            userLearningJourneyIds: [],
            staffID: null,
            loading: null
        }
    },
    
    methods:{
        async getUserLearningJourneys(){
            // get all learning journeys
            // TODO: get all learning journeys given userID
            await axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey?staff="+this.staffID)
                .then(response => {
                    this.userLearningJourneys = response.data.data.learning_journey
                })
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
    async mounted() {
        this.loading = true
        this.staffID = this.$store.state.stored_staff_id
        await this.getUserLearningJourneys()
        this.loading = false
    },
    created(){
        if(!this.$store.state.stored_current_accessrole){
        this.$router.push('/')
        }
    }    
}
</script>
