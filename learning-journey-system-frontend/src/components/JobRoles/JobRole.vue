<template>
    <div class="card h-100 w-100" style="width: 18rem;">
        <img src="@/assets/software_developer.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title d-inline me-2 fw-bold">{{ role.role_name}} </h5>            
            
            <div v-if="countActiveSkills(role.skills) > 0">
                <h6 class="card-text mt-3 fs-6">Skills Required </h6>
                <div v-for="skill in firstFourSkills(role.skills)" class="d-inline">
                    <span class="badge bg-primary mx-1">{{skill}}</span>
                </div> 

                <div v-if="countActiveSkills(role.skills) > 4" class="mt-2">
                    <span data-test="modal" class="badge rounded-pill text-bg-dark btn btn-outline-dark mb-3" data-bs-toggle="modal" :data-bs-target="'#staticBackdrop'+role.role_id">See more</span><br>
                    <SkillsModal :role="role"></SkillsModal>
                </div> 

                <div class="mt-3 text-center">
                    <router-link :to="{ name: 'viewSkillsandCourses'}" @click="saveRoleId(role.role_id)" class="btn btn-outline-dark">View Skills and Courses</router-link>
                </div>
            </div>

            
        </div>
    </div>
</template>

<script>
    import SkillsModal from '@/components/Skills/SkillsModal.vue'
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'
    export default {
        name: 'JobRole',
        data() {
            return {
                // id: 4
            }
        },
        props: {
            role: Object
        },
        components: {
            SkillsModal
        },
        methods: {
            saveRoleId(role_id) {
                this.$store.commit('setRoleId', role_id)
                console.log('roleId', this.$store.state.stored_role_id)
            },
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
            },
            countActiveSkills(skills) {
                let count = 0
                if(skills){
                    for (let i = 0; i < skills.length; i++) {
                        if (skills[i].skill_status == 'Active') {
                            count ++
                        }
                    }
                }
                
                return count
            }
        }  
    }
</script>