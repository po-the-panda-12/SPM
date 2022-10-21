<template>
    <div class="jobroles container-fluid position-relative align-self-stretch p-5">
        <div class="d-flex mb-3 mt-2">
            <div class="fs-3 me-auto"><h1>Job Roles</h1></div> 
            <div class="fs-6 ms-auto"><router-link :to="'/createjobrole'" class="btn btn-outline-dark m-1 btn-primary text-light">Add a Job Role</router-link></div>
        </div>
        
        <div class="dropdown position-absolute top-0 end-0 m-3">
            <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{role}}
            </button>

            <ul class="dropdown-menu">
                <li><a class="dropdown-item" @click="changeRole()">Staff</a></li>
                <li><a class="dropdown-item" @click="changeRole()">Admin</a></li>
            </ul>
        </div>
        <JobRoles v-if="role=='Staff'"></JobRoles>
        <JobRolesAdmin v-else></JobRolesAdmin>
    </div>
</template>

<script>
    import JobRoles from '@/components/JobRoles/JobRoles.vue'
    import JobRolesAdmin from '@/components/JobRoles/JobRolesAdmin.vue'
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'

    export default {
      name: 'JobRoleView',
      components: {
        JobRoles,
        JobRolesAdmin
        },
    data(){
        return {
            role: "Staff"
        }
    },
    methods: {
        changeRole() {
            this.role = this.role == "Staff" ? "Admin" : "Staff"
        }
    },
    created(){
        if(!this.$store.state.stored_current_accessrole){
        this.$router.push('/')
        }
    }    
    }
</script>