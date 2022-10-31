<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"/>
    <div class="jobroles container-fluid position-relative align-self-stretch p-5">
        <div class="d-flex mb-3 mt-2">
            <div class="fs-3 me-auto"><h1>Job Roles</h1></div> 
        </div>
        
        <JobRoles></JobRoles>
    </div>
</template>

<script>
    import JobRoles from '@/components/JobRoles/JobRoles.vue'
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'

    export default {
        name: 'JobRoleView',
        components: {
            JobRoles
        },
        created(){
            if(!this.$store.state.stored_current_accessrole){
                this.$router.push('/')
            }
        }  
    }  
    
</script>