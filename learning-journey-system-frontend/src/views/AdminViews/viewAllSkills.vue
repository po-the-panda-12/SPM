<template>
    <div class = "container">
        <div class = "row"> 
            <h1 class = 'text-left mt-4'> View Skills </h1> 
            <!-- redirect to createSkills.vue -->
            <div class = "d-grid gap-2 d-md-flex justify-content-md-end">
                <button @click ="navigateToCreateSkill()" class = "btn btn-primary"> Create Skill </button>
            </div> 
        </div>
        <div class = 'row'>
            <div v-for = 'skill in skills' :key="skill.skill_id" class= 'mt-4 mb-4 col-4'>
                <div class="card">
                    <div class="card-body">
                    <img class='rounded mx-auto d-block' src="@/assets/skills_future.jpg">
                    </div>
                    <text class="ps-2 text-center"> {{skill.skill_name}} </text>
                    <text class="ps-2 text-center"> {{skill.skill_status}} </text>
                    <button class = "btn btn-primary"> Edit Skill </button>
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
        methods: {
          // naviate to createSkills.vue
            navigateToCreateSkill(){
                this.$router.push('/createSkills');
            }
        },  
        mounted() {
            // view all skills
            axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill')
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
