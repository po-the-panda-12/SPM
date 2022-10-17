<template>
    <div class = "container">
        <form>
            <div class="form-group mt-4">
                <h1 class = "mb-4"> Add New Skill </h1>
                <h5 class = "mb-4"> Skill Name </h5>
                <input v-model="skill_name" type ='text' class="text-bg-primary input-lg form-control " id="skill" placeholder="Enter skill" style="width: 100%; height: 50px">
            </div>
            <div> 
                <h5 class = "mt-4">Status</h5>
                <span class="badge rounded-pill text-bg-primary text-center"  style="width: 10%; height: 25px" >Active</span>
            </div>
            
            <div class="d-grid gap-2 mt-4 col-6 mx-auto">
                <button @click='createSkill()' class="btn btn-primary" type="button">Save</button>
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
            axios.post('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/skill'
            ,{
                "name": this.skill_name
            })
            .then(response => {
                // if skill created 
                if (response.data.status == 200) {
                    alert("Skill created successfully");
                }
                // if skill already exists
                else {
                    alert("Skill already exist! Please try again!");
                }
            })
        }
    }
}

</script>
