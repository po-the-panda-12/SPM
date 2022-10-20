<template>
    <div class="my-3">
        <input type="text" v-model="search" @keyup="filteredRoles()" class="form-control mb-3" id="exampleFormControlInput1" placeholder="Search job role">
        <h2>Active</h2>
        <div v-if= "filtered_active_roles.length > 0" class="card-group row row-cols-1 row-cols-md-3 g-4">
            <div v-for="role in filtered_active_roles">
                <div class="col h-100">
                    <JobRoleAdmin @update-role="updateRole" :role="role" :allSkills="allSkills"></JobRoleAdmin>
                </div>
            </div>
        </div>
        <div v-else>
            <p>No active roles.</p>
        </div>

    </div>
    <hr>
    <div class="my-3">
        <h2>Retired</h2>
        <div v-if= "filtered_retired_roles.length > 0" class="card-group row row-cols-1 row-cols-md-3 g-4">
            <div v-for="role in filtered_retired_roles">
                <div class="col h-100">
                    <JobRoleAdmin @update-role="updateRole" :role="role" :allSkills="allSkills"></JobRoleAdmin>
                </div>
            </div>
        </div>
        <div v-else>
            <p>No retired roles.</p>
        </div>
    </div>
    <updateJobRole :role="currentRole" :allSkills="allSkills"></updateJobRole>
</template>

<script>
    import JobRoleAdmin from './JobRoleAdmin.vue'
    import updateJobRole from '@/components/JobRoles/updateJobRole.vue'
    import axios from 'axios'
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'

    export default {
        name: 'JobRolesAdmin',
        components: {
            JobRoleAdmin,
            updateJobRole
        },
        data() {
            return {
                roles: [],
                active_roles: [],
                retired_roles: [],
                filtered_active_roles: [],
                filtered_retired_roles: [],
                search: "",
                allSkills: [],
                currentRole: {}
            }
        },
        methods: {
            updateRole(role) {
                this.currentRole = role
                $('#updateModal').modal('show')
            },
            async fetchData() {
                await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role')
                .then(response => {
                    this.roles = response.data.data.job_roles;
                })
                .catch(error => console.log(error));
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
                this.filtered_active_roles = this.active_roles
                this.filtered_retired_roles = this.retired_roles
            },
            filteredRoles() {
                this.filtered_active_roles = this.active_roles.filter((role) => role.role_name.toLowerCase().includes(this.search.toLowerCase()))
                this.filtered_retired_roles = this.retired_roles.filter((role) => role.role_name.toLowerCase().includes(this.search.toLowerCase()))
            },
            async getAllSkills(){
                await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill?status=Active')
                .then(response => {
                    this.allSkills = response.data.data.skills;
                })
                .catch(error => console.log(error));
            }
            
        },
        async created() {
            await this.fetchData();
            await this.getStatus();
            await this.getAllSkills();
        }
    }
</script>