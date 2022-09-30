<template>
    <div class="row">
        <div class="col-md-2 col-sm-1"></div>
        <div class="col-md-8 col-sm-10">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title col-sm-10 text-start">Learning Journey Name: {{ learningJourney.lj_name }}</h5>
                    <p class="card-text col-sm-10 text-start">Role: {{ learningJourney.job_role.role_name }}</p>
                    <div class="row">
                        <div class="col-8">
                            <p class="card-text col-sm-10 text-start">No. of Courses Enrolled {{ learningJourney.courses.length }}</p>
                        </div>
                        <div class="col-4">
                            <a href="#" class="btn btn-primary">View Learning Journey</a>
                        </div>
                    </div>
                    
                    <p class="text-start" >Learning Journey Progress</p>
                    <CProgress class="mb-3">
                        <CProgressBar 
                            :value="50"
                            color="success"
                        />
                    </CProgress>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-sm-1"></div>
    </div>
</template>
<script>
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CProgress, CProgressBar } from '@coreui/vue';
export default {
    name: "LearningJourneyCard",
    props: ['learningJourney'],
    data() {
        return {
            //
        };
    },
    components: {
        CProgress,
        CProgressBar
    }
};
</script>