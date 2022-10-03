<template>
    <div class="card h-100 w-100" style="width: 18rem;">
        <img src="@/assets/software_developer.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title d-inline me-2">{{ role.role_name}} </h5>
            <span v-if="role.role_status == 'Active'" class="badge bg-success">{{role.role_status}}</span>
            <span v-else class="badge bg-danger">{{role.role_status}}</span> <br>
            
            
            <div v-if="role.skills">
                <p class="card-text my-3">Skills Gained 
                    <span data-test="modal" class="badge rounded-pill text-bg-dark btn btn-outline-dark mb-3" data-bs-toggle="modal" :data-bs-target="'#staticBackdrop'+role.role_id">See more</span><br>
                    <SkillsModal :role="role"></SkillsModal>

                    
                        <div v-for="skill in firstFourSkills(role.skills)" class="d-inline">
                            <span class="badge bg-secondary mx-1">{{skill}}</span>
                        </div>      
                </p>
            </div>

            <div class="mt-3 text-center">
                <a href="#" class="btn btn-light border border-dark">Select Role</a>
            </div>
        </div>
    </div>
</template>

<script>
    import SkillsModal from './SkillsModal.vue'
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'
    export default {
        name: 'JobRole',
        props: {
            role: Object
        },
        components: {
            SkillsModal
        },
        methods: {
            firstFourSkills(skills) {
                let skillsList = []
                let count = 0

                for (let i = 0; i < skills.length; i++) {
                    if(count < 4) {
                        if (skills[i].skill_status == 'Active') {
                            skillsList.push(skills[i].skill_name);
                            count ++
                        }
                    }
                }
                return skillsList
            }
        }  
    }
</script>