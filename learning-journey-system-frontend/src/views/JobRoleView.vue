<template>
    <div class="jobroles container-fluid position-relative align-self-stretch p-5">
        <h1>Job Roles</h1>
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
    }
    }
</script>