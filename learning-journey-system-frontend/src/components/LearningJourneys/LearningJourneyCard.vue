<template>
    <div class="row">
        <div class="col-sm-1"></div>
        <div class="col-md-10">
            <div class="card">
                <div class="card-body">
                    <div class="row d-flex">
                        <div class="col-2 mx-2" style="display:flex; align-items:center;">
                            <img src="https://blush.design/api/download?shareUri=WpJInu49H&w=800&h=800&fm=png" alt="" style="width:100%">
                        </div>
                        <div class="col-7">
                            <h5 class="card-title col-sm-10 text-start">{{ learningJourney.lj_name }}</h5>
                            <p class="card-text col-sm-10 text-start" style="font-size:14px">{{ learningJourney.job_role.role_name }}</p>
                            
                            <p class="text-start" >Learning Progress</p>
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped bg-success" role="progressbar" aria-label="Success striped example"
                                    style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div class="col-2 mx-auto">
                            <div class="row mb-3 mt-2">
                                <span class="border fs-2 py-2 mb-2 text-center">{{ learningJourney.courses.length }}</span>
                                <p class="card-text text-center" style="font-size: small;">Courses Enrolled</p>
                            </div>
                            <div class="row">
                                <router-link :to="'indivlearningJourneys'" @click='saveLJId(learningJourney)' class="btn btn-outline-dark" style="font-size:small">View More</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-1"></div>
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
    }
};
</script>