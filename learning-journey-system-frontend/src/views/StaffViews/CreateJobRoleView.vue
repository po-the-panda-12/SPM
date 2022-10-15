<template>
    <div class="container">
        <div class="mb-3 mt-5">
            <h1>Add new Job Role</h1>
        </div>

        <div>
            <h3 class="fs-5 mt-4 mb-3"><span style="color:red;">*</span> Role Name</h3>
            <div class="input-group mb-3 input-group-lg">
                <input type="text" class="form-control" placeholder="Your role name goes here....." aria-label="Username" aria-describedby="basic-addon1" v-model="role_name">
            </div>

            <h3 class="fs-5 mt-4 mb-3"><span style="color:red;">*</span> Skills</h3>
            <div class="mb-3">
                <!-- do for each loop on role_skills -->
                <p>Skills is: {{ skill }}</p>
                <input type="text" class="form-control" v-model="skill" placeholder="+ Search new skill here"/>
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
            skill,
            role_skills: [],
            role_id: 0
            }
        },
        components: {
        
        },
        methods: {
            addJobRole(){
                // axios.post('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/role', {
                //     name: this.role_name,
                // })
                // .then(response => {
                //     console.log(response.data)
                
                // })
                // .catch(error => alert(error));
            },

            getJobRoleID(){
                axios.get('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/role')
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => alert(error));
            },

            addSkilltoJobRole(){
                // axios.post('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/role_skill', {
                //     role_id: this.role_id,
                //     skills: this.role_skills,
                // })
                // .then(response => {
                //     console.log(response.data)
                
                // })
                // .catch(error => alert(error));
            },

            getAllSkills(){
                axios.get('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/skill')
                    .then(response => {
                        console.log(response.data.data)
                    
                    })
                    .catch(error => alert(error));
            }
        }
    }

</script>