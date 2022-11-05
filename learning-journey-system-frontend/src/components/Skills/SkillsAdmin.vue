<template>
    <div class="my-4">
        <div class="d-flex my-4">
            <input type="text" v-model="search" @keyup="filteredSkills()" class="form-control" style="width:30%; min-width: fit-content; font-family: fontAwesome;" id="exampleFormControlInput1" placeholder="&#xf002; Search for skill">
        </div>

        <h2 class="fs-4 mb-4">Active Skills</h2>
        <div v-if= "filtered_active_skills.length > 0" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 card-group">
            <div v-for="skill in filtered_active_skills" :key="skill">
                <div class="col h-100">
                    <SkillAdmin @reload="reload" @update-skill="updateSkill" :skill="skill"></SkillAdmin>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="mb-5">No active skills.</p>
        </div>

        <hr>
        <div class="my-3">
            <h2 class="fs-4 mb-4">Retired Skills</h2>
            <div v-if= "filtered_retired_skills.length > 0" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 card-group">
                <div v-for="skill in filtered_retired_skills" :key="skill">
                    <div class="col h-100">
                        <SkillAdmin @reload="reload" @update-skill="updateSkill" :skill="skill" ></SkillAdmin>
                    </div>
                </div>
            </div>
            <div v-else>
                <p>No retired skills.</p>
            </div>
        </div>

        <updateSkill @reload="reload" :skill="currentSkill"></updateSkill>
    </div> 
</template>

<script>
    import SkillAdmin from './SkillAdmin.vue'
    import updateSkill from '@/components/Skills/updateSkill.vue'
    import axios from 'axios'
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'

    export default {
        name: 'SkillsAdmin',
        components: {
            SkillAdmin,
            updateSkill
        },
        data() {
            return {
                skills: [],
                active_skills: [],
                retired_skills: [],
                filtered_active_skills: [],
                filtered_retired_skills: [],
                search: "",
                currentSkill: {}
            }
        },
        methods: {
            reload(){
                this.getStatus();
            },
            updateSkill(skill) {
                this.currentSkill = skill
                $('#updateModal').modal('show')
            },
            async fetchData() {
                await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill')
                .then(response => {
                    this.skills = response.data.data.skills;
                })
                .catch(error => console.log(error));
            },
            getStatus(){
                this.active_skills = []
                this.retired_skills = []
                for (let i = 0; i < this.skills.length; i++) {
                    if (this.skills[i].skill_status == 'Active') {
                        this.active_skills.push(this.skills[i])
                    }
                    else{
                        this.retired_skills.push(this.skills[i])
                    }
                }
                this.filtered_active_skills = this.active_skills
                this.filtered_retired_skills = this.retired_skills
            },
            filteredSkills() {
                this.filtered_active_skills = this.active_skills.filter((skill) => skill.skill_name.toLowerCase().includes(this.search.toLowerCase()))
                this.filtered_retired_skills = this.retired_skills.filter((skill) => skill.skill_name.toLowerCase().includes(this.search.toLowerCase()))
            },
            
        },
        async created() {
            await this.fetchData();
            this.getStatus();
        }
    }
</script>