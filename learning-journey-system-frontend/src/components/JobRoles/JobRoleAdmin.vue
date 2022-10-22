<template>
    <div class="card h-100 w-100" style="width: 18rem;">
        <img src="@/assets/software_developer.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title d-inline me-2 fw-bold">{{ role.role_name}} </h5>
            <span v-if="role.role_status == 'Active'" class="badge bg-success">{{role.role_status}}</span>
            <span v-else class="badge bg-danger">{{role.role_status}}</span><br>
            
            <div v-if="role.skills != null || role.skills.length > 0">
                <h6 class="card-text mt-3 fs-6">Skills Required </h6>
                <div v-for="skill in firstFourSkills(role.skills)" class="d-inline">
                    <span v-if="skill.skill_status== 'Active'" class="badge bg-primary mx-1">{{skill.skill_name}}</span>
                    <span v-else class="badge bg-secondary mx-1">{{skill.skill_name}}</span>
                </div>

                <div v-if="role.skills.length > 4" class="mt-2">
                    <span data-test="modal" class="badge rounded-pill text-bg-dark btn btn-outline-dark mb-3" data-bs-toggle="modal" :data-bs-target="'#staticBackdrop'+role.role_id">See more</span><br>
                    <SkillsModalAdmin :role="role"></SkillsModalAdmin>
                </div> 
                <div class="mt-3 text-center">
                    <router-link :to="{ name: 'viewSkillsandCourses'}" @click="saveRoleId(role.role_id)" class="btn btn-outline-dark">View Skills and Courses</router-link><br>
                </div>
            </div>
            <div class="mt-3 text-center">
                <div class="mt-3 text-center">
                    <span @click="this.$emit('update-role', role)" id="edit">
                        <i class="fa fa-light fa-pencil"></i> Edit 
                    </span> |
                    <span id="delete" data-test="modal" data-bs-toggle="modal" :data-bs-target="'#delete'+role.role_id">
                        <i class="fa fa-light fa-trash mx-1"></i>Delete
                    </span>
                </div>
            </div>
            <deleteJobRole @reload="$emit('reload')" :role="role"></deleteJobRole>
        </div>
    </div>
</template>

<script>
    import SkillsModalAdmin from '@/components/Skills/SkillsModalAdmin.vue'
    import updateJobRole from '@/components/JobRoles/updateJobRole.vue'
    import deleteJobRole from '@/components/JobRoles/deleteJobRole.vue'
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'
    import axios from 'axios'
    export default {
        name: 'JobRoleAdmin',
        props: {
            role: Object,
            allSkills: Array
        },
        components: {
            SkillsModalAdmin,
            updateJobRole,
            deleteJobRole
        },
        emits: ['reload', 'update-role'],
        data() {
            return {
                skills: []
            }
        },
        methods: {
            saveRoleId(role_id) {
                this.$store.commit('setRoleId', role_id)
            },

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
            
        },
        created(){
            if(this.role.skills == null){
                this.role.skills = []
            }
        }
    }
</script>

<style scoped>
    #edit, #delete {
        cursor: pointer;
    }
</style>