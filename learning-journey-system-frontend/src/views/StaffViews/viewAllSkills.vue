<template>
    <div class = "container">
        <h1 class = 'text-left mt-4'> View all Skills </h1> 
        <div class = 'row'>
            <div v-for = 'skill in skills' :key="skill.skill_id" class= 'mt-4 mb-4 col-4'>
                <div class="card">
                    <div class="card-body">
                    <img class='rounded mx-auto d-block' src="@/assets/skills_future.jpg">
                    </div>
                    <text class="ps-2 text-center"> Skill ID : {{ skill.skill_id }}</text>
                    <text class="ps-2 text-center"> Skill Name: {{skill.skill_name}} </text>
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
                skills: []
            }
        },
        mounted() {
            // view all skills
            axios.get('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/skill')
            .then(response => {
                this.skills = response.data.data.skills;
                console.log(this.skills);
            })
            .catch(error => {
                console.log(error);
            })
        },
    }
</script>
