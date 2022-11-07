<template>
    <div class="jobroles container-fluid position-relative align-self-stretch p-5">
        <h1>Select Job Role</h1>
        <div class="card-group row row-cols-1 row-cols-md-3 g-4">
            <div v-for="role in roles" :key="role.id">
                <div class="card h-100 w-100" style="width: 18rem;">
                    <img src="@/assets/software_developer.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title text-center">{{role.role_name}} </h5>
                        <div class="mt-3 text-center">
                            <button @click="getRole(role.role_id)" class="btn btn-light border border-dark">Select Role</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
    import axios from 'axios'
    import Navbar from '@/components/Common/Navbar.vue'

    export default {
        name: 'SelectRole',
        
        components: {
            Navbar
        },

        data() {
            return {
                roles: [],
                api: this.$store.state.api
            }
        },
        mounted() {
                axios.get(this.api + '/role?status=Active')
                .then(response => {
                    this.roles = response.data.data.job_roles;
                })
                .catch(error => alert(error));
                console.log("mounted")
            },

        methods: {
            getRole(id) {
                console.log(id)
            }
        }
        
    }
</script>