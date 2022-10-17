<template>
    <div class = "container">
        <h1 class = 'text-left mt-4'> View all Courses </h1> 
        <div class = 'row'>
            <div v-for = 'course in courses' :key="course.course_id" class= 'mt-4 mb-4 col-4'>
                <div class="card">
                    <div class="card-body">
                    <img class='rounded mx-auto d-block' src="@/assets/courses.png">
                    </div>
                    <text class="ps-2 mt-2 text-center">Course Name: {{course.course_name}} </text>
                    <text class="ps-2 mt-2 text-center">Description: {{course.course_desc}} </text>
                    <text class="ps-2 mt-2 text-center"> Type: {{course.course_type}} </text>
                    <text class="ps-2 mt-2 text-center"> Category: {{course.course_category}} </text>
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
        name: 'viewAllSkills',
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
            axios.get('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/course')
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
