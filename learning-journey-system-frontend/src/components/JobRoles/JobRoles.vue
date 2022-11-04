<template>
    <Loading v-if="loading"></Loading>
    <div>
        <div class="d-flex my-4">
            <input type="text" v-model="search" @keyup="filteredRoles()" class="form-control" style="width:30%; min-width: fit-content; font-family: fontAwesome;" id="exampleFormControlInput1" placeholder="&#xf002; Search for job role">
        </div>
        <div v-if= "filtered_roles.length > 0" class="card-group row row-cols-1 row-cols-md-3 g-4 mt-4">
            <div v-for="role in filtered_roles">
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
    import Loading from '@/components/Common/Loading.vue'
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'

    export default {
        name: 'JobRoles',
        components: {
            JobRole,
            Loading
        },
        data() {
            return {
                roles: [],
                filtered_roles: [],
                search: "",
                loading: null
            }
        },
        methods: {
            async fetchData() {
                await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role?status=Active')
                .then(response => {
                    this.roles = response.data.data.job_roles;
                    this.filtered_roles = this.roles
                })
                .catch(error => alert(error));
            },
            filteredRoles() {
                this.filtered_roles = this.roles.filter((role) => role.role_name.toLowerCase().includes(this.search.toLowerCase()))
            }
        },
        async created() {
            this.loading = true
            await this.fetchData();
            this.loading = false
        }
    }
</script>