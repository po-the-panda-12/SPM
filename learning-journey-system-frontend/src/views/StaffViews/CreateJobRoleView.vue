<template>
    <div class="container">
        <div class="mb-3 mt-5">
            <h1>Add new Job Role</h1>
        </div>

        <div>
            <h3 class="fs-5 mt-4 mb-3"><span style="color:red;">*</span> Role Name</h3>
            
            <!-- check if role name already exists -->
            <div v-if="jobroleNames.includes(role_name)">
                <p>{{role_name}}</p>
            </div>
            <div class="input-group mb-4 input-group-lg">
                <input type="text" class="form-control" placeholder="Your role name goes here....." aria-label="Username" v-model="role_name">
            </div>

            <h3 class="fs-5 my-3"><span style="color:red;">*</span> Skills</h3>
            <div class="mb-3">
                <div v-for="selected_skill in role_skills" class="d-inline">
                    <span class="badge bg-primary mx-1 mt-2 mb-3">{{selected_skill.skill_name}}</span>
                </div>
                <input type="text" class="form-control mb-3" v-model="skill" placeholder="Search skills"/>
                <div class="form-check" v-for="skill in filteredSkills">
                    <input class="form-check-input" type="checkbox" :value="skill" :id="skill.skill_id" v-model="role_skills">
                    <label class="form-check-label" :for="skill.skill_id">
                        {{skill.skill_name}}
                    </label>
                </div>
            </div>

            <button class="btn btn-primary mt-4 px-5" @click="addJobRole(); addSkilltoJobRole()">Save</button>

        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'
    import axios from 'axios'

    export default {
      name: 'CreateJobRoleView',
      data() {
        return {
            role_name: '',
            existing_roleName: [], // existing job role names
            skill: '', // search bar
            role_skills: [], // skills selected by the user
            all_skills: [], // all skills in the database
            role_id: 0
            }
        },
        methods: {
            addJobRole(){
                axios.post('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/role', {
                    role_name: this.role_name,
                })
                .then(response => {
                    console.log(response)
                
                })
                .catch(error => alert(error));

                axios.get('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/role')
                .then(response => {
                    console.log(response.data.data.job_roles.slice(-1)[0].role_id)
                    this.role_id = response.data.data.job_roles.slice(-1)[0].role_id
                })
                .catch(error => alert(error));
            },

            getJobRole(){
                axios.get('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/role')
                .then(response => {
                    console.log(response.data.data.job_roles)
                    this.existing_roleName = response.data.data.job_roles
                })
                .catch(error => alert(error));
            },

            addSkilltoJobRole(){
                for (var i = 0; i < this.role_skills.length; i++){
                    axios.post('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/role/skill', {
                        role_id: this.role_id,
                        skill_id: this.role_skills[i].skill_id
                    })
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => alert(error));
                }
            },

            getAllSkills(){
                axios.get('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/skill')
                    .then(response => {
                        // console.log(response.data.data.skills)
                        this.all_skills = response.data.data.skills
                    })
                    .catch(error => alert(error));
            }
        },
        created() {
            this.getAllSkills(),
            this.getJobRole()
        },
        computed: {
            filteredSkills() {
                return this.all_skills.filter(p => {
                    // return true if the product should be visible

                    // in this example we just check if the search string
                    // is a substring of the product name (case insensitive)
                    return p.skill_name.toLowerCase().indexOf(this.skill.toLowerCase()) != -1;
                });
            },
            // for checking if the job role name already exists
            jobroleNames() {
                return this.existing_roleName.filter(p => {
                    return p.role_name.toLowerCase().indexOf(this.role_name.toLowerCase()) != -1;
                });
            }
        }
    }

</script>