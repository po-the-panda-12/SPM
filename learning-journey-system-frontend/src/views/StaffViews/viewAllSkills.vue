<template>
    <div class = "container">
        <h1 class = 'text-left mt-4'> View all Skills </h1> 
        <div class = 'row'>
            <div v-for = 'skill in skills' :key="skill.skill_id" class= 'mt-4 mb-4 col-4'>
                <div class="card">

                    <img class='rounded mx-auto d-block' src="@/assets/skills_future.jpg">
                    <div class="card-body">
                        <h5 class="card-title ps-2 text-center">{{skill.skill_name}}</h5>
                    </div>
                    <div class="card-footer">
                        <div class = "row">
                            
                            
                            <div class = "col-6 text-center">
                                <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="{{skill.skill_name}}">Edit</button>

                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">New message</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form>
                                        <div class="mb-3">
                                            <label for="new_name" class="col-form-label" data-bs-dismiss="modal">New Skill name:</label>
                                            <input type="text" v-model="new_skill_name" class="form-control" required id="new_name">
                                        </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary" @click = "udpateSkill(skill, new_skill_name)">Save changes</button>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>


                            <div class = "col-6 text-center">
                                <button class = "btn btn-link btn-block" @click = "deleteSkill(skill.skill_id)"> Delete </button>
                            </div>
                        </div>
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
        name: 'viewAllSkills',
        components : {
            SkillCard
        },
        data(){
            return {
                skills: [], 
                new_skill_name: ''
            }
        },
        mounted() {
            // view all active skills
            axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill')
            .then(response => {
                this.skills = response.data.data.skills.filter(skill => skill.skill_status === "Active")
                // console.log(this.skills);
            })
            .catch(error => {
                console.log(error);
            })
        },

        methods: {

            udpateSkill(skill){
                console.log(this.new_skill_name)
                console.log(skill)

                //says successful but does not update in database
                axios.put('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill', {
                    "id": skill.skill_id,
                    "name": this.new_skill_name
                })
                .then(() => {
                    alert("Skill edited successfully!")
                })
                .catch(() => {
                    alert("Error editing skill!")
                })
                .finally(() => {
                    window.location.reload();
                })

            },


            deleteSkill(skill_id){

                console.log(skill_id)

                //says successful but does not update in database
                axios.put("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill", {
                    "id": skill_id,
                    "status": "Retired"
                })
                .then(() => {
                    alert("Skill deleted successfully!")
                })
                .catch(() => {
                    alert("Error deleting skill!")
                })
                .finally(() => {
                    window.location.reload();
                })
            }
        }
    }
</script>
