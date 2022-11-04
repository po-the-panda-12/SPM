<template>
    <Loading v-if="loading"></Loading>
    <div class="container p-5">
        <div class="d-flex mb-4">
            <h1 class='fs-2 fw-bold me-auto my-auto'>Skills</h1> 
            <!-- redirect to createSkills.vue -->
            <button @click ="navigateToCreateSkill()" class="btn btn-outline-dark m-1"><i class="far fa-plus"></i>&nbsp; Add Skill </button>
        </div>
        <SkillsAdmin></SkillsAdmin>

    </div>
</template>


<script>
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'
    // import SkillCard from '@/components/Skills/SkillCard.vue'
    import SkillsAdmin from '@/components/Skills/SkillsAdmin.vue'
    import Loading from '@/components/Common/Loading.vue'
    import axios from 'axios'

    export default {
        name: 'viewAllSkills',
        components : {
            // SkillCard,
            SkillsAdmin,
            Loading

        },
        data(){
            return {
                skills: [],
                loading: null
            }
        },
        methods: {
          // naviate to createSkills.vue
            navigateToCreateSkill(){
                this.$router.push('/createSkills');
            },
        },  
        async mounted() {
            this.loading = true
            // view all skills
            await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill')
            .then(response => {
                this.skills = response.data.data.skills;
                console.log(this.skills);
            })
            .catch(error => {
                console.log(error);
            })
            this.loading = false
        },
    }
</script>
