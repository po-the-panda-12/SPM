<template>
    <Navbar />
    <div class="jobroles container-fluid position-relative align-self-stretch p-5">
        <h1>Job Roles</h1>
        <JobRoles></JobRoles>
    </div>
</template>

<script>
    import Navbar from "@/components/Navbar.vue";
    import JobRoles from '@/components/JobRoles.vue'
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'

    export default {
      name: 'JobRoleView',
      components: {
        JobRoles,
        Navbar
        }
    }
</script>