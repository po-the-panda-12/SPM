<template>
    <div class="container mt-5">
        <h1 class='fs-2 fw-bold mt-5'> View all Courses </h1> 
        <div class="d-flex my-4">
            <i class="fa-solid fa-magnifying-glass my-auto"></i>&nbsp;&nbsp;
            <input type="text" v-model="search" @keyup="filteredCourses()" class="form-control" style="width:30%; min-width: fit-content;" id="exampleFormControlInput1" placeholder="Search course">
        </div>

        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 card-group mb-5">
            <div id="complete_course" v-for="course in filteredCoursesArray" :key="course">
                <div class="col h-100">
                    <div>
                        <Course :course="course" indvLJView='false' @refresh="getCourses"></Course>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'
    import Course from '@/components/Courses/Course.vue'
    import SkillCard from '@/components/Skills/SkillCard.vue'
    import axios from 'axios'

    export default {
        name: 'ViewAllCoursesAdmin',
        components : {
            SkillCard,
            Course
        },
        data(){
            return {
                courses: [],
                filteredCoursesArray: [],
                search: ""
            }
        },
        methods: {
            getCourses(){
                axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course')
                    .then(response => {
                        this.courses = response.data.data.courses;
                        this.filteredCoursesArray = this.courses;
                        console.log(this.courses);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            filteredCourses() {
                this.filteredCoursesArray = this.courses.filter((course) => course.course_name.toLowerCase().includes(this.search.toLowerCase()))
            }
        },
        mounted() {
            // view all Courses
            this.getCourses();
            
        },
    }
</script>
