<template>
    <div class="container">
        <div class="mb-3 mt-5">
            <h1>Add new Job Role</h1>
        </div>

        <div>
            <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="success_response !=''">
                <strong>Success!</strong> Job role has been added. {{clearForm()}}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

            <h3 class="fs-5 mt-4 mb-3"><span style="color:red;">*</span> Role name</h3>
            
            <div class="input-group mb-4 input-group-lg">
                <input type="text" class="form-control text-bg-primary py-4 fs-2" placeholder="Your role name goes here....." aria-label="Username" v-model="role_name">
            </div>
            <!-- check if role name already exists -->
            <div v-for="name in jobroleNames">
                <!-- <p>{{name.role_name}}</p> -->
                <p class="mb-3" v-if="name.role_name.toLowerCase() === role_name.toLowerCase()" style="color:red">This job role already exists. Enter another role name</p>
            </div>

            <h3 class="fs-5 my-3">Skills required</h3>
            <div class="mb-3">
                <div v-for="selected_skill in role_skills" class="d-inline">
                    <span class="badge bg-primary mx-1 mb-3">{{selected_skill.skill_name}}</span>
                </div>
                <!-- Search bar and list of skills -->
                <input type="text" class="form-control mb-3" v-model="skill" placeholder="Search skills"/>
                <div class="form-check" v-for="skill in filteredSkills">
                    <input class="form-check-input" type="checkbox" :value="skill" :id="skill.skill_id" v-model="role_skills">
                    <label class="form-check-label" :for="skill.skill_id">
                        {{skill.skill_name}}
                    </label>
                </div>
            </div>

            <div class="text-center mb-5">
                <button class="btn btn-primary mt-4" style="padding: 10px 15%" @click="addJobRole(); activate();">Save</button>
            </div>

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
            existing_roles: [], // existing job role names
            skill: '', // search bar
            role_skills: [], // skills selected by the user
            all_skills: [], // all skills in the database
            role_id: 0,
            success_response: "",
            }
        },
        methods: {
            addJobRole(){
                // if role_name exists in jobroleNames, then don't add it
                if(this.jobroleNames.some(name => name.role_name.toLowerCase() === this.role_name.toLowerCase())){
                    alert("This job role already exists")
                }
                else if(this.role_name == ''){
                    alert("Please enter a role name")
                }
                else{
                    axios.post('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/role', {
                        name: this.role_name
                    })
                    .then(response => {
                        console.log(response)
                        this.success_response = response
                    })
                    .catch(error => alert(error));

                }
            },

            getNewJobRoleID(){
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
                    this.existing_roles = response.data.data.job_roles
                })
                .catch(error => alert(error));
            },

            activate(){
                setTimeout(this.getNewJobRoleID, 300000)
                // set timer to call addskilltojobrole
                setTimeout(this.addSkilltoJobRole, 330000)
            },

            addSkilltoJobRole: async function(){
                for (var i = 0; i < this.role_skills.length; i++){
                    console.log(this.role_skills[i].skill_id)
                    await axios.post('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/role_skill', {
                        role: this.role_id,
                        skill: this.role_skills[i].skill_id
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
            },

            clearForm(){
                this.role_name = ''
                alert("Job role added successfully")
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
                return this.existing_roles.filter(p => {
                    return p.role_name.toLowerCase().indexOf(this.role_name.toLowerCase()) != -1;
                });
            }
        }
    }

</script>