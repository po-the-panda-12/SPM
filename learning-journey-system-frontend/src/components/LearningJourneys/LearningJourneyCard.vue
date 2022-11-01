<template>
    <div class="card mx-5">
        <div class="card-body">
            <div class="row">
                <div class="col-4 mx-auto col-md-2 col-lg-2" style="display:flex; align-items:center;">
                    <img src="https://blush.design/api/download?shareUri=WpJInu49H&w=800&h=800&fm=png" alt="" style="width:100%">
                </div>
                <div class="col-12 m-auto col-md-6">
                    <h5 class="card-title text-start">{{ learningJourney.lj_name }}</h5>
                    <p class="card-text text-start" style="font-size:14px">{{ learningJourney.job_role.role_name }}</p>
                    
                    <ProgressBar :progress="getProgress" class="mb-2 mt-4"></ProgressBar>
                </div>
                <div class="col-12 col-md-2 m-auto">
                    <div class="mb-3 mt-2 w-100">
                        <span class="border fs-2 py-1 mb-1 text-center d-block">{{ learningJourney.courses.length }}</span>
                        <p class="card-text text-center" style="font-size: small;">Courses Enrolled</p>
                    </div>
                    <div class="text-center ">
                        <router-link :to="'/indivlearningJourneys'" @click='saveLJId(learningJourney)' class="btn btn-outline-dark d-block" style="font-size:small">View More</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from '@/components/Common/ProgressBar.vue';

export default {
    name: "LearningJourneyCard",
    props: ['learningJourney'],
    data() {
        return {
            lj_id: 0,
            progress_status: 0,
        }
    },
    components: {
        ProgressBar
    },

    methods: {
        saveLJId(lj) {
            this.$store.commit('setIndivLJId', lj.lj_id)
            this.$store.commit('setRoleId', lj.job_role.role_id)
        },
    },
    computed: {
        getProgress(){
            var completed_courses = 0
            var incompleted_courses = 0
            var progress_status = 0
            var lj_courses = this.learningJourney.courses
            
            for (var i = 0; i < lj_courses.length; i++) {
                if (lj_courses[i].registration.completion_status == "Completed") {
                    completed_courses += 1
                }
                else{
                    incompleted_courses += 1
                }
            }
            progress_status = Math.floor(completed_courses / (incompleted_courses + completed_courses) * 100)
            
            return progress_status
        }
    }
};
</script>