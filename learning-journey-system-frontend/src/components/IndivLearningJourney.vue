<template>
    <div>
        <div class="d-flex mb-3 mt-5">
            <div class="fs-3 me-auto">{{ lj.lj_name }}</div> 
            <div class="fs-6 ms-auto"><button type="button" class="btn btn-outline-dark"><a style="text-decoration: none;" href="#"><i class="fa fa-pencil"></i> Edit</a></button></div>
        </div>

        <div class="d-flex mt-4 mb-2">
            <div class="fs-6 me-auto"><p>Learning Progress</p></div> 
            <div class="fs-6 ms-auto">{{ progress }}% Completed</div>
        </div>
        
        <div class="progress">
            <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" :aria-valuenow="progress"
            aria-valuemin="0" aria-valuemax="100" :style="'width:'+ progress + '%'">
            {{ progress }}%
            </div>
        </div>
        <br><br>

        <div class="container">
            <h5 class="mb-4">Incomplete Courses</h5>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 card-group">
                <div id="incomplete_course" v-for="course in incompleted_courses_list">
                    <div class="col">
                        <div v-if="course.status == 'Incomplete'">
                            <Course :course="course"></Course>
                        </div>
                    </div>
                </div>
            </div>
        
            <h3 class="fs-5 mb-4 mt-5">Completed Courses</h3>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 card-group mb-5">
                <div id="complete_course" v-for="course in completed_courses_list">
                    <div class="col">
                        <div v-if="course.status == 'Complete'">
                            <Course :course="course"></Course>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Course from './Course.vue'
    import axios from 'axios'
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'

    export default{
        data() {
            return {
                lj: [],
                lj_courses: [],
                completed_courses: 0,
                incompleted_courses: 0,
                progress: 0,
                completed_courses_list: [],
                incompleted_courses_list: []
            }
        },
        components: {
            Course
        },

        methods: {
            getLJ() {
                // need to change this depending on which staff
                axios.get('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/journey?lj=1')
                    .then(response => {
                        // need to change this when onclick from View all learning journeys
                        this.lj = response.data.data.learning_journey[0]
                        this.lj_courses = response.data.data.learning_journey[0].courses
                        
                        for (var i = 0; i < this.lj_courses.length; i++) {
                        
                            if (this.lj_courses[i].status == "Complete") {
                                this.completed_courses += 1
                                this.completed_courses_list.push(this.lj_courses[i])
                            }
                            else{
                                this.incompleted_courses += 1
                                this.incompleted_courses_list.push(this.lj_courses[i])
                            }
                        }

                        this.progress = Math.floor(this.completed_courses / (this.incompleted_courses + this.completed_courses) * 100)
                    
                    })
                    .catch(error => alert(error));
            },
        },

        created() {
            this.getLJ()
        }
    }

</script>