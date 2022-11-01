<template>
    <div class="row">
        <div class="col-md-2 col-sm-1"></div>
        <div class="col-md-8 col-sm-10">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title col-sm-10 text-start">Learning Journey Name: {{ learningJourney.lj_name }}
                        <button class="btn btn-primary" @click="changeName()">Edit Name</button>
                    </h5>
                    
                    <p class="card-text col-sm-10 text-start">Role: {{ learningJourney.job_role.role_name }}</p>
                    <div class="row">
                        <div class="col-8" v-if="learningJourney.courses.length !== null">
                            <p class="card-text col-sm-10 text-start">No. of Courses Enrolled {{ learningJourney.courses.length }}</p>
                        </div>
                        <div class="col-4">
                            <router-link :to="'indivlearningJourneys'" @click='saveLJId(learningJourney)' class="btn btn-primary" >View Learning Journey</router-link>
                        </div>
                    </div>
                    
                    <p class="text-start" >Learning Journey Progress</p>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped bg-success" role="progressbar" aria-label="Success striped example"
                            style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-sm-1"></div>
    </div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css';
export default {
    name: "LearningJourneyCard",
    props: ['learningJourney'],

    data() {
        return {
            lj_id: 0
        }
    },
    methods: {
        saveLJId(lj) {
            this.$store.commit('setIndivLJId', lj.lj_id)
            this.$store.commit('setRoleId', lj.job_role.role_id)
        },
        changeName:function()
        {
        
        }
    }
};
</script>