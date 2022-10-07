<template>
    <div class="my-3">
        <h2>Active</h2>
        <div v-if= "active_roles.length > 0" class="card-group row row-cols-1 row-cols-md-3 g-4">
            <div v-for="role in active_roles">
                <div class="col h-100">
                    <JobRoleAdmin :role="role"></JobRoleAdmin>
                </div>
            </div>
        </div>
        <div v-else>
            <h3>No active roles.</h3>
        </div>

    </div>
    <hr>
    <div class="my-3">
        <h2>Retired</h2>
        <div v-if= "retired_roles.length > 0" class="card-group row row-cols-1 row-cols-md-3 g-4">
            <div v-for="role in retired_roles">
                <div class="col h-100">
                    <JobRoleAdmin :role="role"></JobRoleAdmin>
                </div>
            </div>
        </div>
        <div v-else>
            <p>No retired roles.</p>
        </div>
    </div>
</template>

<script>
    import JobRoleAdmin from './JobRoleAdmin.vue'
    import axios from 'axios'
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'

    export default {
        name: 'JobRolesAdmin',
        components: {
            JobRoleAdmin
        },
        data() {
            return {
                roles: [],
                active_roles: [],
                retired_roles: []
            }
        },
        methods: {
            async fetchData() {
                await axios.get('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/role')
                .then(response => {
                    this.roles = response.data.data.job_roles;
                })
                .catch(error => alert(error));
            },
            getStatus(){
                for (let i = 0; i < this.roles.length; i++) {
                    if (this.roles[i].role_status == 'Active') {
                        this.active_roles.push(this.roles[i])
                    }
                    else{
                        this.retired_roles.push(this.roles[i])
                    }
                }
            }
            
        },
        async created() {
            await this.fetchData();
            this.getStatus();
            }
    }
</script>