<template>
    <div>
        <div v-if= "roles.length > 0" class="card-group row row-cols-1 row-cols-md-3 g-4">
            <div v-for="role in roles">
                <div class="col h-100">
                    <JobRole :role="role"></JobRole>
                </div>
            </div>
        </div>
        <div v-else>
            <p>No available job roles.</p>
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
        methods: {
            async fetchData() {
                await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role?status=Active')
                .then(response => {
                    this.roles = response.data.data.job_roles;
                })
                .catch(error => alert(error));
            }
        },
        async created() {
            await this.fetchData();
            }
    }
</script>