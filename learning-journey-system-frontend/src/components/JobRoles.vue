<template>
    <div class="card-group row row-cols-1 row-cols-md-3 g-4">
        <div v-for="role in roles">
            <div class="col">
                <JobRole :role="role"></JobRole>
            </div>
            <p>hello world</p>
        </div>
    </div>
</template>

<script>
    import JobRole from './JobRole.vue'
    import axios from 'axios'
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'

    export default {
        name: 'JobRoles',
        components: {
            JobRole
        },
        data() {
            return {
                roles: []
            }
        },
        mounted() {
                axios.get('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/role?status=Active')
                .then(response => {
                    this.roles = response.data.data.job_roles;
                })
                .catch(error => alert(error));
                console.log("mounted")
            }
    }
</script>