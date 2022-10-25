<template>
    <div class = "container">
        <h1 class = 'text-left mt-4'> View all Courses </h1> 
        <input type="text" v-model="search" @keyup="filteredCourses()" class="form-control mb-3" id="exampleFormControlInput1" placeholder="Search course">

        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 card-group mb-5">
            <div id="complete_course" v-for="course in filteredCoursesArray" :key="course">
                <div class="col h-100">
                    <div>
                        <Course :course="course" indvLJView='false' @refresh="getCourses"></Course>
                    </div>
                </div>
            </div>
        </div>

             <!--   <div class="row">
                    <div v-for = 'course in courses' :key="course.course_id" class= 'mt-4 mb-4 col-4'>
                        <div class="card text-start my-3" style="width: 18rem;">
                            <img src="@/assets/courses.png" class="card-img-top" alt="">
                            
                                <div class="card-body">
                                    <div class="ps-2 mt-2 text-center">Course Name: {{course.course_name}}</div>
                                    <div class="ps-2 mt-2 text-center">Description: {{course.course_desc}}</div>
                                    <div class="ps-2 mt-2 text-center"> Type: {{course.course_type}}</div>
                                    <div class="ps-2 mt-2 text-center"> Category: {{course.course_category}}</div>
                                </div>
                        </div>
                    </div>
                </div>-->
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
