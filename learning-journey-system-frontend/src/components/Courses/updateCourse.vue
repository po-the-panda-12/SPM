<template>
    <div class="modal fade" :id="'updateModal'" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold" id="staticBackdropLabel">Update Course ID {{ course.course_id }}</h5>
                    <button @click="resetFields(); this.$emit('reload')" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    
                    <div id="course_name" data-test="course_name">
                        Course: <b>{{course.course_name}}</b>
                    </div>
                    
                    <div id="skills" class="my-3">
                        <label for="course_skill" class="form-label">Skills:</label> 
                        <div id="course_skill" class="d-flex">
                            <select id="skills" class="form-select me-2" aria-label="Default select example" v-model="selectedSkill" data-test="selectedSkill">
                                <option v-for="skill in getUnselectedSkills" :value="skill" data-test="activeSkill">
                                    {{ skill.skill_name }}
                                </option>
                            </select>
                            <button @click="addSkilltoList()" type="button" class="btn btn-primary" data-test="addBtn">Add</button>
                        </div>
                    </div>
                    <div class="border border-secondary p-2">
                        <div v-if="currentSkillList">
                            <div v-for="skill in currentSkillList" class="d-inline" data-test="currentSkill">
                                <span v-if="skill.skill_status=='Active'" class="badge border border-primary text-primary my-1 mx-1">{{skill.skill_name}}
                                    <i @click="removeSkillfromList(skill)" class="fa fa-solid fa-xmark text-danger" :data-test="'remove' + skill.skill_id"></i>
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
                    <button @click="updateCourse()" type="submit" class="btn btn-primary">Update</button>
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
      name: 'updateCourse',
      props: {
        course: Object,
        allSkills: Array
      },
      emits: ['reload'],
      data(){
        return{
            skillList: [],
            selectedSkill: "",
            currentSkillList: [],
            errorMsg: "",
            successMsg:"",
            addedSkills: [],
            removedSkills: [],
            filtered_skillList: [],
            api: ""
        }
      },
      watch: {
        course: function(){
            if(this.course.skills == null){
                this.course.skills = []
            }
            this.currentSkillList = this.course.skills
            this.skillList = this.allSkills
            this.selectedSkill = ""
            this.api = this.$store.state.api
        }
      },
      methods: {
        async updateCourse(){
            this.errorMsg = ""
            this.successMsg = ""
            if(this.addedSkills.length > 0 || this.removedSkills.length > 0){
                
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
                    this.errorMsg = "Course should have at least 1 skill"
                }
            } 
            else{
                this.errorMsg = "No changes made"
                this.successMsg = ""
            }
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
            await axios.post(this.api + '/course_skill', {
                course: this.course.course_id,
                skill: skill.skill_id
            })
            .then(response => {
                if(response.data.code === 200){
                    this.successMsg = "Course updated successfully"
                    this.errorMsg = ""
                }
                else{
                    this.errorMsg = "An error occurred while updating Course"
                }
            })
            .catch(error => console.log(error));
        },
        async removeSkill(skill){
            await axios.delete(this.api + '/course_skill', {
                data: {
                    course: this.course.course_id,
                    skill: skill.skill_id
                }
            })
            .then(response => {
                if(response.data.code === 200){
                    this.successMsg = "Course updated successfully"
                    this.errorMsg = ""
                }
                else{
                    console.log("Error: " + response.data.message)
                }
            })
            .catch(error => console.log(error));
        },
        resetFields(){
            this.currentSkillList = this.course.skills
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