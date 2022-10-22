<template>
    <div class = "container">
        <h1 class = 'text-left mt-4'> View all Courses </h1> 
        <div class = 'row'>
            <div v-for = 'course in courses' :key="course.course_id" class= 'mt-4 mb-4 col-4'>
                <div class="card" style="height: 450px;">
                    <div class="card-body">
                        <img class='rounded mx-auto d-block' src="@/assets/courses.png">
                    
                        <div class="ps-2 mt-2 text-center">Course Name: {{course.course_name}}</div>
                        <div class="ps-2 mt-2 text-center">Description: {{course.course_desc}}</div>
                        <div class="ps-2 mt-2 text-center"> Type: {{course.course_type}}</div>
                        <div class="ps-2 mt-2 text-center"> Category: {{course.course_category}}</div>
                    </div>
                    
                </div>
            </div>
        </div>    
    </div>
</template>


<script>
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'
    import SkillCard from '@/components/Skills/SkillCard.vue'
    import axios from 'axios'

    export default {
        name: 'StaffViewCourses',
        components : {
            SkillCard
        },
        data(){
            return {
                courses: []
            }
        },
        mounted() {
            // view all Courses
            axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course')
            .then(response => {
                this.courses = response.data.data.courses;
                console.log(this.courses);
            })
            .catch(error => {
                console.log(error);
            })
        },
    }
</script>
