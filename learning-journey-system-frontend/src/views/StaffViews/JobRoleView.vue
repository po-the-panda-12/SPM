<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"/>
    <div class="jobroles container-fluid position-relative align-self-stretch p-5">
        <h1>Job Roles</h1>
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
            role: "Admin"
        }
    },
    methods: {
        changeRole() {
            this.role = this.role == "Staff" ? "Admin" : "Staff"
        }
    }
    }
</script>