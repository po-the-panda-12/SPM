<template>
    <Loading v-if="loading"></Loading>
    <div class="container">
        <div class="jobroles container-fluid position-relative align-self-stretch p-4 px-5">
            <a href="javascript:history.back()" class="btn btn-outline-dark my-auto mb-3"><i class="fa-solid fa-arrow-left"></i> Back</a>

            <div class="d-flex mb-3">
                <div class="fs-2 fw-bold">Job Roles</div> 
            </div>
            
            <JobRoles @loading="showLoad"></JobRoles>
        </div>
    </div>
    
</template>

<script>
    import JobRoles from '@/components/JobRoles/JobRoles.vue'
    import Loading from '@/components/Common/Loading.vue'
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'

    export default {
        name: 'JobRoleView',
        components: {
            JobRoles,
            Loading
        },
        data() {
            return {
                loading: null
            }
        },
        created(){
            if(!this.$store.state.stored_current_accessrole){
                this.$router.push('/')
            }
        },
        methods: {
            showLoad(loading){
                this.loading = loading
            }
        }  
    }  
    
</script>