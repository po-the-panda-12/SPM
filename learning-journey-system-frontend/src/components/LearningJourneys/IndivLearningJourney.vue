<template>
    <div class="container p-4 px-5">
        <a href="javascript:history.back()" class="btn btn-outline-dark my-auto mb-3"><i class="fa-solid fa-arrow-left"></i> Back</a>
        <div class="d-flex mb-3">
            <div class="fs-3 fw-bold me-auto px-2">{{ lj.lj_name }}</div>
            <button v-if="edit_status === false" class="btn btn-outline-dark" @click="editLJ()">Edit Journey</button>
            <button v-if="edit_status" class="btn btn-outline-dark" @click="editLJ()">Finished Editing</button>
        </div>
        <div class="fs-5 fst-italic mb-4">...as a {{role_name}}</div>
        <div class="col-8 mx-auto mb-5">
            <ProgressBar :progress="progress"></ProgressBar>
        </div>

        <div class="container">
            <div class="d-flex mb-4 mt-3">
                <h5 class="my-auto me-auto">Incomplete Courses</h5>
                <div v-if="edit_status">
                    <router-link :to="'/viewSkillsandCourses'" class="btn btn-outline-dark"><i class="far fa-plus"></i> Add Courses
                    </router-link>
                </div>
            </div>

            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 card-group">
                <div id="incomplete_course" v-for="course in incompleted_courses_list">
                    <div class="col h-100">
                        <div v-if="course.registration.completion_status != 'Completed' " class="h-100">
                            <Course :course="course" :incompletedCoursesList="incompleted_courses_list" :completedCoursesList="completed_courses_list" :showDelete="edit_status" @refreshPage="getLJ()"></Course>
                        </div>
                    </div>
                </div>
            </div>
        
            <h5 class="mt-5">Completed Courses</h5>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 card-group mb-5">
                <div id="complete_course" v-for="course in completed_courses_list">
                    <div class="col h-100 mb-5">
                        <div v-if="course.registration.completion_status == 'Completed'">
                            <Course :course="course" :incompletedCoursesList="incompleted_courses_list" :completedCoursesList="completed_courses_list" :showDelete="false" @refreshPage="getLJ()"></Course>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ProgressBar from '@/components/Common/ProgressBar.vue'
    import Course from '@/components/Courses/Course.vue'
    import axios from 'axios'
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'

    export default{
        components: {
            Course,
            ProgressBar
        },
        
        data() {
            return {
                lj: [],
                lj_courses: [],
                completed_courses: 0,
                incompleted_courses: 0,
                progress: 0,
                completed_courses_list: [],
                incompleted_courses_list: [],
                lj_id: 0,
                job_role_id:0,
                edit_status: false,
                role_name: ""
            }
        },

        methods: {
            // get learning journey based on LJ_ID
            async getLJ() {
                await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey?id=' + this.lj_id)
                    .then(response => {
                        console.log(response.data)
                        
                        // store learning object in vuex store
                        this.$store.commit('setCurrentLJ', response.data.data.learning_journey[0])
                        this.lj = response.data.data.learning_journey[0]
                        this.lj_courses = response.data.data.learning_journey[0].courses
                        this.job_role_id = response.data.data.learning_journey[0].job_role.role_id
                        this.role_name = response.data.data.learning_journey[0].job_role.role_name

                        this.completed_courses_list = []
                        this.incompleted_courses_list = []
                        this.completed_courses = 0
                        this.incompleted_courses = 0

                        for (var i = 0; i < this.lj_courses.length; i++) {
                            if (this.lj_courses[i].registration.completion_status == "Completed") {
                                this.completed_courses += 1
                                this.completed_courses_list.push(this.lj_courses[i])
                                console.log(this.completed_courses)
                            }
                            else{
                                this.incompleted_courses += 1
                                this.incompleted_courses_list.push(this.lj_courses[i])
                                console.log(this.incompleted_courses)
                            }
                        }

                        this.progress = Math.floor(this.completed_courses / (this.incompleted_courses + this.completed_courses) * 100)
                    
                    })
                    .catch(error => alert(error));
            },
            editLJ(){
                this.edit_status = !this.edit_status
            }
        },
        created() {
            this.lj_id = this.$store.state.stored_indivLJ_id
            this.getLJ()
        }
    }

</script>