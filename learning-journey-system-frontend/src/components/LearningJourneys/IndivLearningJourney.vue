<template>
    <div class="container">
        <div class="d-flex mb-3 mt-5">
            <div class="fs-3 me-auto">{{ lj.lj_name }}</div> 
            <button v-if="edit_status === false" class="btn btn-primary" @click="editLJ()">Edit Learning Journey</button>
            <div v-if="edit_status === true">
                <router-link :to="'/viewSkillsandCourses'" class="btn btn-outline-dark m-1 btn-primary text-light">
                    Add Courses +
                </router-link>
            </div>
            <button v-if="edit_status === true" class="btn btn-danger px-2" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete Learning Journey</button>
            <button v-if="edit_status === true" class="btn btn-success" @click="editLJ()">Done</button>
        </div>
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Are you sure?</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        You are about to delete {{ lj.lj_name }}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger" @click="deleteLJ()" data-bs-dismiss="modal">Delete Learning Journey</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="fs-5">{{role_name}}</div>
        <ProgressBar :progress="progress"></ProgressBar>

        <br><br>

        <div class="container">
            <h5 class="mb-4 mt-2">Incomplete Courses</h5>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4 card-group">
                <div id="incomplete_course" v-for="course in incompleted_courses_list">
                    <div class="col h-100">
                        <div v-if="course.registration.completion_status != 'Completed' " class="h-100">
                            <Course :course="course" :incompletedCoursesList="incompleted_courses_list" :completedCoursesList="completed_courses_list" :showDelete="edit_status" @refreshPage="getLJ()"></Course>
                        </div>
                    </div>
                </div>
            </div>
        
            <h3 class="fs-5 mb-4 mt-5">Completed Courses</h3>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 card-group mb-5">
                <div id="complete_course" v-for="course in completed_courses_list">
                    <div class="col h-100">
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
        components: {
            Course,
            ProgressBar
        },

        methods: {
            // get learning journey based on LJ_ID
            async getLJ() {
                await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey?id=' + this.$store.state.stored_indivLJ_id)
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

                        for (var i = 0; i < this.lj_courses.length; i++) {
                            if (this.lj_courses[i].registration.completion_status == "Completed") {
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
            editLJ(){
                this.edit_status = !this.edit_status
            },
            async deleteLJ(){
                console.log(this.lj_id)
                await axios.delete("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey", {data:{ id: this.lj_id}})
                .then(response => {
                    console.log(response.data)
                    if(response.data.code === 200){
                        alert("Learning Journey Deleted Successfully")
                        this.$router.push({ path: "/learningJourneys/" })
                    }
                })
                .catch(error => alert(error));
            }
        },
        created() {
            this.lj_id = this.$store.state.stored_indivLJ_id
            this.getLJ()
        }
    }

</script>