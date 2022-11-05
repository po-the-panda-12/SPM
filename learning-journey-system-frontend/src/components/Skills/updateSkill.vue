<template>
    <div class="modal fade" :id="'updateModal'" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold" id="staticBackdropLabel">Update Skill ID {{ skill.skill_id }}</h5>
                    <button @click="resetFields(); this.$emit('reload')" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    
                    <div id="skill_name">
                        <label for="skill_name" class="form-label">Skill Name:</label> 
                        <input id="skill_name" type="text" v-model="updated_name" class="form-control" placeholder="Enter Skill Name" aria-label="Enter Skill Name" required>
                        <p v-if="updated_name==''" class="text-danger">Please enter a skill name</p>
                    </div>
                    <div id="status" class="my-3">
                        <label for="skill_status" class="form-label">Status:</label> 
                        <div id="skill_status" class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" skill="switch" id="flexSwitchCheckDefault" :checked="skill.skill_status=='Active'" @change="changeStatus()" v-model="skill_status">
                            <label class="form-check-label" for="flexSwitchCheckDefault">{{updated_status}}</label>
                        </div>
                    </div>
                
                </div>
                <div class="modal-footer">
                    <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p> 
                    <p v-if="successMsg" class="text-success">{{ successMsg }}</p> 
                    <button @click="resetFields(); this.$emit('reload')" type="button" class="btn btn-light border border-dark" data-bs-dismiss="modal">Cancel</button>
                    <button @click="updateSkill()" type="submit" class="btn btn-primary border border-dark">Update</button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'
    import axios from 'axios'
    
    export default {
      name: 'updateSkill',
      props: {
        skill: Object,
      },
      emits: ['reload'],
      data(){
        return{
            skill_status: "",
            updated_name: "",
            updated_status:"",
            errorMsg: "",
            successMsg:"",
            allSkills: []
        }
      },
      watch: {
        skill: function(){
            this.skill_status = this.skill.skill_status == "Active" ? true : false
            this.updated_name = this.skill.skill_name
            this.updated_status = this.skill.skill_status
        }
      },
      methods: {
        changeStatus(){
            this.updated_status = this.skill_status == true ? "Active" : "Retired"
        },
        async updateSkill(){
            this.errorMsg = ""
            this.successMsg = ""
            if(this.updated_name){
                if(this.updated_name != this.skill.skill_name || this.updated_status != this.skill.skill_status){
                    if(this.updated_name != this.skill.skill_name){
                        await this.getallSkills()
                        let index = this.allSkills.findIndex(x => x.skill_name === this.updated_name)
                        if(index > -1){
                            this.errorMsg = "Skill name already exists"
                        }
                    }

                    if(this.errorMsg == "" && (this.updated_name != this.skill.skill_name || this.updated_status != this.skill.skill_status)){
                        this.updateSkillAPI()
                    }
                } 
                else{
                    this.errorMsg = "No changes made"
                    this.successMsg = ""
                }
            }
            else{
                this.errorMsg = "Please enter a skill name"
                this.successMsg = ""
            }
        },

        async updateSkillAPI(){
            await axios.put('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill', {
                id: this.skill.skill_id,
                name: this.updated_name,
                status: this.updated_status
            })
            .then(response => {
                if(response.data.code === 200){
                    this.skill.skill_name = this.updated_name
                    this.skill.skill_status = this.updated_status
                    this.errorMsg = ""
                    this.successMsg = "Skill updated successfully"
                }
                else{
                    this.errorMsg = "Error updating Skill"
                    this.successMsg = ""
                }
                

            })
            .catch(error => {
                console.log(error)
            })
        },
        
        resetFields(){
            this.updated_name = this.skill.skill_name
            this.updated_status = this.skill.skill_status
            this.skill_status = this.skill.skill_status == "Active" ? true : false

            this.errorMsg = ""
            this.successMsg = ""

        },
        async getallSkills(){
            await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill')
            .then(response => {
                if(response.data.code === 200){
                    this.allSkills = response.data.data.skills
                }
                else{
                    console.log("Error: " + response.data.message)
                }
            })
            .catch(error => console.log(error));
        }
      },
      computed: {
      }
    }
</script>

<style>
    i{
        cursor: pointer;
    }
</style>