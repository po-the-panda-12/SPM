<template>
    <Loading v-if="loading"></Loading>
    <div class="container">
        <div class="jobroles container-fluid position-relative align-self-stretch p-5">
            <div class="d-flex mb-3">
                <div class="fs-2 fw-bold me-auto my-auto">Job Roles</div> 
                <div class="fs-6 ms-auto"><router-link :to="'/createjobrole'" class="btn btn-outline-dark m-1"><i class="far fa-plus"></i>&nbsp; Add Job Role</router-link></div>
            </div>
            <JobRolesAdmin @loading="showLoad"></JobRolesAdmin>
        </div>
    </div>
    
</template>

<script>
    import JobRolesAdmin from '@/components/JobRoles/JobRolesAdmin.vue'
    import Loading from '@/components/Common/Loading.vue'
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'

    export default {
        name: 'JobRoleViewAdmin',
        components: {
            JobRolesAdmin,
            Loading
        },
        data() {
            return {
                loading: null
            }
        },
        methods: {
            showLoad(loading){
                this.loading = loading
            }
        }
    }
</script>