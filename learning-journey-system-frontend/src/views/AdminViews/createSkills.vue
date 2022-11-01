<template>
    <div class="container p-5">
        <form>
            <div class="form-group">
                <h1 class="fs-2 fw-bold"> Add New Skill </h1>
                <h5 class="fs-5 mt-4 mb-3"><span style="color:red;">*</span> Skill Name </h5>
                <div class="input-group input-group-lg">
                    <input v-model="skill_name" type ='text' class="text form-control " id="skill" placeholder="Your skill name goes here....">
                </div>
            </div>
            <div> 
                <h5 class="fs-5 mt-4">Status</h5>
                <span class="badge bg-success rounded-pill my-auto px-3">Active</span>
            </div>
            
            <div class="text-center mt-5">
                <button @click='createSkill()' class="btn btn-outline-dark" type="button" style="padding: 10px 15%" >Create skill</button>
            </div>
        </form>
    </div>
</template>


<script>
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'

    import axios from 'axios'

    export default {
        name: 'createSkills',
    
    data(){
        return {
            skill_name: ''
        }
    },
    methods: {
        async createSkill() {
        //POST skill to API endpoint 
            axios.post('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill'
            ,{
                "name": this.skill_name
            })
            .then(response => {
                // check length of skill_name
                if (this.skill_name.length == 0) {
                    alert("Skill name cannot be empty!")
                } 
                else {
                    if (response.data.code == 200) {
                        alert("Skill created successfully");
                        // redirect to view all skills page
                        this.$router.push('/viewAllSkills');
                        }
                    // else skill already exists
                    else {
                        alert("Skill already exist! Please try again!");
                        }
                    }    
                })
            }
        }
    }

</script>
