<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"/>
    <div class="jobroles container-fluid position-relative align-self-stretch p-5">
        <div class="d-flex mb-3 mt-2">
            <div class="fs-3 me-auto"><h1>Job Roles</h1></div> 
            <div class="fs-6 ms-auto"><router-link :to="'/createjobrole'" class="btn btn-outline-dark m-1 btn-primary text-light">Add a Job Role</router-link></div>
        </div>
        <JobRolesAdmin></JobRolesAdmin>
    </div>
</template>

<script>
    import JobRolesAdmin from '@/components/JobRoles/JobRolesAdmin.vue'
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'

    export default {
        name: 'JobRoleViewAdmin',
        components: {
            JobRolesAdmin
        }
    }
</script>