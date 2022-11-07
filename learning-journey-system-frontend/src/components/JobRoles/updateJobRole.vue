<template>
    <div class="modal fade" :id="'updateModal'" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" data-test="modalJob">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold" id="staticBackdropLabel">Update Job Role ID {{ role.role_id }}</h5>
                    <button @click="resetFields(); this.$emit('reload')" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    
                    <div id="role_name">
                        <label for="role_name" class="form-label">Role Name:</label> 
                        <input id="role_name" type="text" v-model="updated_name" class="form-control" placeholder="Enter Role Name" aria-label="Enter Role Name" required>
                        <p v-if="updated_name==''" class="text-danger">Please enter a role name</p>
                    </div>
                    <div id="status" class="my-3">
                        <label for="role_status" class="form-label">Status:</label> 
                        <div id="role_status" class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" :checked="role.role_status=='Active'" @change="changeStatus()" v-model="role_status">
                            <label class="form-check-label" for="flexSwitchCheckDefault">{{updated_status}}</label>
                        </div>
                    </div>
                    <div id="skills" class="my-3">
                        <label for="role_skill" class="form-label">Skills:</label> 
                        <div id="role_skill" class="d-flex">
                            <select id="skills" class="form-select me-2" aria-label="Default select example" v-model="selectedSkill">
                                <option v-for="skill in getUnselectedSkills" :value="skill">
                                    {{ skill.skill_name }}
                                </option>
                            </select>
                            <button @click="addSkilltoList()" type="button" class="btn btn-primary">Add</button>
                        </div>
                    </div>
                    <div class="border border-secondary p-2">
                        <div v-if="currentSkillList">
                            <div v-for="skill in currentSkillList" class="d-inline" data-test="currentSkill">
                                <span v-if="skill.skill_status=='Active'" class="badge border border-primary text-primary my-1 mx-1">{{skill.skill_name}}
                                    <i @click="removeSkillfromList(skill)" class="fa fa-solid fa-xmark text-danger"></i>
                                </span>
                                <span v-else class="badge border border-secondary text-secondary mx-1">{{skill.skill_name}} 
                                    <i @click="removeSkillfromList(skill)" class="fa fa-solid fa-xmark text-danger"></i>
                                </span>

                            </div>
                        </div>
                    </div>
                    <p>Remove skills by deleting tags.</p>
                
                </div>
                <div class="modal-footer">
                    <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p> 
                    <p v-if="successMsg" class="text-success">{{ successMsg }}</p> 
                    <button @click="updateJobRole()" type="submit" class="btn btn-primary">Update</button>
                    <button @click="resetFields(); this.$emit('reload')" type="button" class="btn btn-light border border-dark" data-bs-dismiss="modal">Cancel</button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    // import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    // import 'bootstrap/dist/css/bootstrap.min.css'
    import axios from 'axios'
    
    export default {
      name: 'updateJobRole',
      props: {
        role: Object,
        allSkills: Array
      },
      emits: ['reload'],
      data(){
        return{
            skillList: [],
            selectedSkill: "",
            role_status: "",
            currentSkillList: [],
            updated_name: "",
            updated_status:"",
            errorMsg: "",
            successMsg:"",
            addedSkills: [],
            removedSkills: [],
            filtered_skillList: [],
            allRoles: [],
            api: this.$store.state.api
        }
      },
      watch: {
        role: function(){
            if(this.role.skills == null){
                this.role.skills = []
            }
            this.role_status = this.role.role_status == "Active" ? true : false
            this.updated_name = this.role.role_name
            this.updated_status = this.role.role_status
            this.currentSkillList = this.role.skills
            this.skillList = this.allSkills
            this.selectedSkill = ""
        }
      },
      methods: {
        changeStatus(){
            this.updated_status = this.role_status == true ? "Active" : "Retired"
        },
        async updateJobRole(){
            this.errorMsg = ""
            this.successMsg = ""
            if(this.updated_name){
                if(this.updated_name != this.role.role_name || this.updated_status != this.role.role_status || this.addedSkills.length > 0 || this.removedSkills.length > 0){
                    if(this.updated_name != this.role.role_name){
                        await this.getAllRoles()
                        let index = this.allRoles.findIndex(x => x.role_name === this.updated_name)
                        if(index > -1){
                            this.errorMsg = "Role name already exists"
                        }
                    }
                    
                    if(this.currentSkillList.length > 0) {
                        if(this.addedSkills.length > 0){
                            for(let i=0; i<this.addedSkills.length; i++){
                                this.addSkill(this.addedSkills[i])
                            }
                            this.addedSkills = []
                        }

                        if(this.removedSkills.length > 0){
                            for(let i=0; i<this.removedSkills.length; i++){
                                this.removeSkill(this.removedSkills[i])
                            }
                            this.removedSkills = []
                        }
                    }
                    else {
                        this.errorMsg = "Job Role should have at least 1 skill"
                    }

                    if(this.errorMsg == "" && (this.updated_name != this.role.role_name || this.updated_status != this.role.role_status)){
                        this.updateJobRoleAPI()
                    }
                } 
                else{
                    this.errorMsg = "No changes made"
                    this.successMsg = ""
                }
            }
            else{
                this.errorMsg = "Please enter a role name"
                this.successMsg = ""
            }
        },

        async updateJobRoleAPI(){
            await axios.put(this.api + '/role', {
                id: this.role.role_id,
                name: this.updated_name,
                status: this.updated_status
            })
            .then(response => {
                if(response.data.code === 200){
                    this.role.role_name = this.updated_name
                    this.role.role_status = this.updated_status
                    this.errorMsg = ""
                    this.successMsg = "Job Role updated successfully"
                }
                else{
                    this.errorMsg = "Error updating Job Role"
                    this.successMsg = ""
                }
                

            })
            .catch(error => {
                console.log(error)
            })
        },
        
        addSkilltoList(){
            if(this.selectedSkill !== ""){
                this.errorMsg = ""
                this.currentSkillList.push(this.selectedSkill)
                this.getUnselectedSkills

                let indexAdd = this.addedSkills.findIndex(x => x.skill_id === this.selectedSkill.skill_id)
                if(indexAdd == -1){
                    this.addedSkills.push(this.selectedSkill)
                }

                let indexRemove = this.removedSkills.findIndex(x => x.skill_id === this.selectedSkill.skill_id)
                if(indexRemove != -1){
                    this.removedSkills.splice(indexRemove, 1)
                }

                this.selectedSkill = ""
            }
            else{
                this.errorMsg = "Please select a skill before adding"
                this.successMsg = ""
            }
        },
        removeSkillfromList(skill){
            let index = this.currentSkillList.findIndex(x => x.skill_id === skill.skill_id)
            this.currentSkillList.splice(index, 1)
            this.getUnselectedSkills

            let indexAdd = this.addedSkills.findIndex(x => x.skill_id === skill.skill_id)
            if(indexAdd != -1){
                this.addedSkills.splice(indexAdd, 1)
            }
            let indexRemove = this.removedSkills.findIndex(x => x.skill_id === skill.skill_id)
            if(indexRemove == -1){
                this.removedSkills.push(skill)
            }
            
            
        },
        async addSkill(skill){
            await axios.post(this.api + '/role_skill', {
                role: this.role.role_id,
                skill: skill.skill_id
            })
            .then(response => {
                if(response.data.code === 200){
                    this.successMsg = "Job Role updated successfully"
                    this.errorMsg = ""
                }
                else{
                    this.errorMsg = "An error occurred while updating Job Role"
                }
            })
            .catch(error => console.log(error));
        },
        async removeSkill(skill){
            await axios.delete(this.api + '/role_skill', {
                data: {
                    role: this.role.role_id,
                    skill: skill.skill_id
                }
            })
            .then(response => {
                if(response.data.code === 200){
                    this.successMsg = "Job Role updated successfully"
                    this.errorMsg = ""
                }
                else{
                    console.log("Error: " + response.data.message)
                }
            })
            .catch(error => console.log(error));
        },
        resetFields(){
            this.updated_name = this.role.role_name
            this.updated_status = this.role.role_status
            this.role_status = this.role.role_status == "Active" ? true : false
            this.currentSkillList = this.role.skills
            this.errorMsg = ""
            this.successMsg = ""

            if(this.addedSkills.length > 0){
                for(let i=0; i<this.addedSkills.length; i++){
                    let index = this.currentSkillList.findIndex(x => x.skill_id === this.addedSkills[i].skill_id)
                    if(index > -1){
                        this.currentSkillList.splice(index, 1)
                    }
                }
            }

            if(this.removedSkills.length > 0){
                for(let i=0; i<this.removedSkills.length; i++){
                    let index = this.currentSkillList.findIndex(x => x.skill_id === this.removedSkills[i].skill_id)
                    if(index == -1){
                        this.currentSkillList.push(this.removedSkills[i])
                    }
                }
            }

            this.addedSkills = []
            this.removedSkills = []
        },
        async getAllRoles(){
            await axios.get(this.api + '/role')
            .then(response => {
                if(response.data.code === 200){
                    this.allRoles = response.data.data.job_roles
                }
                else{
                    console.log("Error: " + response.data.message)
                }
            })
            .catch(error => console.log(error));
        }
      },
      computed: {
        getUnselectedSkills(){
            if(this.currentSkillList){
                this.filtered_skillList = this.skillList.filter((skill) => this.currentSkillList.findIndex(x => x.skill_id === skill.skill_id) < 0)
            }
            this.filtered_skillList.sort((a, b) => (a.skill_name < b.skill_name) ? -1 : 1)
            return this.filtered_skillList
        }
      }
    }
</script>

<style>
    i{
        cursor: pointer;
    }
</style>