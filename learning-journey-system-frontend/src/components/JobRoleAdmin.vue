<template>
    <div class="card h-100 w-100" style="width: 18rem;">
        <img src="@/assets/software_developer.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title d-inline me-2 fw-bold">{{ role.role_name}} </h5>
            <span v-if="role.role_status == 'Active'" class="badge bg-success">{{role.role_status}}</span>
            <span v-else class="badge bg-danger">{{role.role_status}}</span><br>
            
            <div v-if="role.skills">
                <h6 class="card-text mt-3 fs-6">Skills Required </h6>
                <div v-for="skill in firstFourSkills(role.skills)" class="d-inline">
                    <span v-if="skill.skill_status== 'Active'" class="badge bg-primary mx-1">{{skill.skill_name}}</span>
                    <span v-else class="badge bg-secondary mx-1">{{skill.skill_name}}</span>
                </div>

                <div class="mt-2">
                    <span data-test="modal" class="badge rounded-pill text-bg-dark btn btn-outline-dark mb-3" data-bs-toggle="modal" :data-bs-target="'#staticBackdrop'+role.role_id">Update Skills</span><br>
                    <SkillsModalAdmin :role="role"></SkillsModalAdmin>
                </div> 
                
            </div>

            <div class="mt-3 text-center position-absolute bottom-0 start-50 translate-middle-x">
                <i class="fa fa-light fa-pencil">Edit</i> |
                <i class="fa fa-light fa-trash">Delete</i>
            </div>
        </div>
    </div>
</template>

<script>
    import SkillsModalAdmin from './SkillsModalAdmin.vue'
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'
    export default {
        name: 'JobRoleAdmin',
        props: {
            role: Object
        },
        components: {
            SkillsModalAdmin
        },
        methods: {
            firstFourSkills(skills) {
                let skillsList = []
                let count = 0

                for (let i = 0; i < skills.length; i++) {
                    if(count < 4) {
                        skillsList.push(skills[i]);
                        count ++
                        
                    }
                }
                return skillsList
            }
        }  
    }
</script>