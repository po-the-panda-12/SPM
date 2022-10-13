<template>
    <div class="container-fluid position-relative align-self-stretch p-5">
        <h1>Login Page</h1>
        <select class="form-select w-50 my-4" aria-label="Default select example" @change="updateCurrentUser($event)">
            <option disabled selected hidden>Select a user</option>
            <option v-for="staff in staffList" :value="staff.staff_id">
                {{ staff.staff_fname }} {{ staff.staff_lname }} ({{staff.role.role_name}})
            </option>
        </select>
        <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>

        <!-- <router-link :to="{ name: 'home'}" class="btn btn-outline-dark">Login</router-link> -->

        <button type="button" class="btn btn-outline-dark" @click="navigate()">Login</button>
        
    </div>
</template>

<script>
export default {
    name: 'LoginView',
    data() {
        return {
            staffList: [],
            errorMsg: "",
            role: ""
        }
    },
    methods: {
        async fetchData() {
            await axios.get('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/staff')
            .then(response => {
                this.staffList = response.data.data.staffs;
            })
            .catch(error => alert(error));
        },
        updateCurrentUser(event){
            this.$store.commit('setStaffId', event.target.value)
            console.log('staffId', this.$store.state.stored_staff_id)
            this.errorMsg = ""
            
        },
        navigate(){
            if(this.$store.state.stored_staff_id){
                this.$router.push({ name: 'home'})
            }
            else{
                this.errorMsg = 'Please select a user'
            }
            
        }
    },
    async created() {
        await this.fetchData();
    }
}
</script>

<style scoped>

</style>