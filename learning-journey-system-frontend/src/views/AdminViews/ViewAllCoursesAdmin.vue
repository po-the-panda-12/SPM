<template>
    <div class = "container">
        <h1 class = 'text-left mt-4'> View all Courses </h1> 
        <input type="text" v-model="search" @keyup="filteredCourses()" class="form-control mb-3" id="exampleFormControlInput1" placeholder="Search course">

        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 card-group mb-5">
            <div id="complete_course" v-for="course in filteredCoursesArray" :key="course">
                <div class="col h-100">
                    <Course  @update-course="updateCourse" :course="course" indvLJView='false' :showEdit=showEdit @refresh="getCourses"></Course> 
                </div>
            </div>
        </div>
        <updateCourse @reload="getCourses" :course="currentCourse" :allSkills="allSkills"></updateCourse>
    </div>
</template>


<script>
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'
    import Course from '@/components/Courses/Course.vue'
    import SkillCard from '@/components/Skills/SkillCard.vue'
    import updateCourse from '@/components/Courses/updateCourse.vue'
    import axios from 'axios'

    export default {
        name: 'ViewAllCoursesAdmin',
        components : {
            SkillCard,
            Course,
            updateCourse
        },
        data(){
            return {
                courses: [],
                filteredCoursesArray: [],
                search: "",
                allSkills: [],
                currentCourse: {},
                showEdit: null
            }
        },
        methods: {
            updateCourse(course) {
                this.currentCourse = course
                $('#updateModal').modal('show')
            },
            getCourses(){
                axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course')
                    .then(response => {
                        this.courses = response.data.data.courses;
                        this.filteredCoursesArray = this.courses;
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            filteredCourses() {
                this.filteredCoursesArray = this.courses.filter((course) => course.course_name.toLowerCase().includes(this.search.toLowerCase()))
            },
            async getAllSkills(){
                await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill?status=Active')
                .then(response => {
                    this.allSkills = response.data.data.skills;
                })
                .catch(error => console.log(error));
            }
        },
        mounted() {
            // view all Courses
            this.getCourses();
            this.getAllSkills();
            this.showEdit = true;
        },
    }
</script>
