<template>
    <div class="modal fade" :id="'update'+ role.role_id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Update Job Role for Role ID {{ role.role_id }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                <option v-for="skill in skillList" :value="skill">
                                    {{ skill.skill_name }}
                                </option>
                            </select>
                            <button @click="addSkill()" type="button" class="btn btn-primary">Add</button>
                        </div>
                    </div>
                    <!-- <input type="text" class="form-control mb-3" id="exampleFormControlInput1" placeholder="Search skills"> -->
                    <div class="border border-secondary p-2">
                        <div v-for="skill in role.skills" class="d-inline">
                            <span v-if="skill.skill_status=='Active'" class="badge border border-primary text-primary my-1 mx-1">{{skill.skill_name}}
                                <i @click="removeSkill(skill)" class="fa fa-solid fa-xmark text-danger"></i>
                            </span>
                            <span v-else class="badge border border-secondary text-secondary mx-1">{{skill.skill_name}} 
                                <i @click="removeSkill(skill)" class="fa fa-solid fa-xmark text-danger"></i>
                            </span>

                        </div>
                    </div>
                    <p>Remove skills by deleting tags.</p>
                
                </div>
                <div class="modal-footer">
                    <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p> 
                    <p v-if="successMsg" class="text-success">{{ successMsg }}</p> 
                    <button @click="resetFields()" type="button" class="btn btn-light border border-dark" data-bs-dismiss="modal">Cancel</button>
                    <button @click="updateJobRole()" type="submit" class="btn btn-primary border border-dark">Update</button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    // import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'
    import axios from 'axios'
    
    export default {
      name: 'updateJobRole',
      props: {
        role: Object
      },
      data(){
        return{
            skillList: [],
            selectedSkill: "",
            role_status: "",
            currentSkillList: [],
            updated_name: "",
            updated_status:"",
            errorMsg: "",
            successMsg:""
        }
      },
      
      methods: {
        changeStatus(){
            this.updated_status = this.role_status == true ? "Active" : "Retired"
        },
        async updateJobRole(){
            if(this.updated_name){
                if(this.updated_name != this.role.role_name || this.updated_status != this.role.role_status){
                    await axios.put('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/role', {
                        id: this.role.role_id,
                        name: this.updated_name,
                        status: this.updated_status
                    })
                    .then(response => {
                        console.log(response)
                        this.role.role_name = this.updated_name
                        this.role.role_status = this.updated_status
                        this.errorMsg = ""
                        this.successMsg = "Job Role updated successfully"
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
                else{
                    this.errorMsg = "No changes made"
                }
            }
            else{
                this.errorMsg = "Please enter a role name"
            }
        },
        async addSkill(){
            await axios.post('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/role_skill', {
                role: this.role.role_id,
                skill: this.selectedSkill.skill_id
            })
            .then(response => {
                console.log(response.data);
                if(response.data.code === 200){
                    this.role.skills.push(this.selectedSkill)
                }
                else{
                    alert("Error: " + message.message)
                }
            })
            .catch(error => alert(error));
        },
        async removeSkill(skill){
            await axios.delete('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/role_skill', {
                data: {
                    role: this.role.role_id,
                    skill: skill.skill_id
                }
            })
            .then(response => {
                console.log(response.data);
                if(response.data.code === 200){
                    let index = this.role.skills.findIndex(x => x.skill_id === skill.skill_id)
                    this.role.skills.splice(index, 1)
                }
                else{
                    alert("Error: " + message.message)
                }
            })
            .catch(error => alert(error));
        },
        resetFields(){
            this.updated_name = this.role.role_name
            this.updated_status = this.role.role_status
            this.role_status = this.role.role_status == "Active" ? true : false
        },
        async getAllSkills(){
            await axios.get('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/skill?status=Active')
            .then(response => {
                this.skillList = response.data.data.skills;
                for (let i = 0; i < this.currentSkillList.length; i++) {
                    for (let j = 0; j < this.skillList.length; j++) {
                        if(this.skillList[j].skill_id == this.currentSkillList[i].skill_id){
                            this.skillList.splice(j, 1);
                            continue
                        }
                    }
                }
                this.skillList.sort((a, b) => (a.skill_name < b.skill_name) ? -1 : 1)
            })
            .catch(error => alert(error));
        }
      },
      mounted(){
        this.getAllSkills()
        this.role_status = this.role.role_status == "Active" ? true : false
        this.currentSkillList = this.role.skills
        this.updated_name = this.role.role_name
        this.updated_status = this.role.role_status        
      }
    }
</script>

<style>
    i{
        cursor: pointer;
    }
</style>