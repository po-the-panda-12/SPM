<template>
    <div class = "container">
        <form>
            <div class="form-group mt-4">
                <h1 class = "mb-4">Update Skill</h1>
                <input v-model="old_skill_name" type ='text' class="input-lg form-control " id="skill" placeholder="Old Skill Name" style="width: 100%; height: 50px">
                <input v-model="new_skill_name" type ='text' class="input-lg form-control " id="skill" placeholder="New Skill Name" style="width: 100%; height: 50px">
            </div>
            <div> 
                <h5 class = "mt-4">Status</h5>
                <span class="badge rounded-pill text-bg-primary text-center"  style="width: 10%; height: 25px" >Active</span>
            </div>
            
            <div class="d-grid gap-2 mt-4 col-6 mx-auto">
                <button @click='updateSkill()' class="btn btn-primary" type="button">Save</button>
            </div>
        </form>
    </div>
</template>


<script>
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'

    import axios from 'axios'


    export default {
        name: 'updateSkills',
    
    data(){
        return {
            old_skill_name: '',
            new_skill_name: '',
            skillID: ''
        }
    },
    methods: {


        getSkillID() {
            // get skill id from url
            axios.get('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/skill')
            .then(async response => {
                this.skillID = await response.data.data.skills.filter(skill => skill.skill_name === this.old_skill_name)[0].skill_id
            })
            .catch(() => alert("Skill does not exist! Please edit an existing skill"));            
       
        },

        async updateSkill() {

            await this.getSkillID();
            console.log(this.skillID)

            // axios.put('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/skill'
            // ,{
            //     "id": this.skillID,
            //     "name": this.new_skill_name
            // })
            // .then (response => {
            //     // if skill updated
            //     if (response.data.status == 200) {
            //         alert("Skill udpated successfully");
            //     }
            //     // if skill already exists
            //     else {
            //         alert("Skill already exist! Please try again!");
            //     }
            // })
        }
    }
}

</script>
