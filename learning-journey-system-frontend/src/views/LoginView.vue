<template>
    <Loading v-if="loading"></Loading>
    <div id="container" class="container-fluid position-relative align-self-stretch p-5 text-center h-100">
        <div class="row h-100 m-auto">
            <div class="col-2 ">

            </div>
            <div class="col-6 col-sm-12 col-md-8 m-auto">
                <div id="login" class="align-middle p-5 bg-white m-auto rounded-4">
                    <img id="logo" src="../assets/ljps_logo.png" alt="logo" class="logo">
                    <h2>Login</h2>
                    <select id="ddlUser" class="form-select my-4 mx-auto" aria-label="Default select example" v-model="selectedUser" @change="errorMsg=''">
                        <option disabled selected hidden>Select a user</option>
                        <option v-for="staff in staffList" :value="staff">
                            {{ staff.staff_fname }} {{ staff.staff_lname }} ({{staff.role.role_name}})
                        </option>
                    </select>
                    <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>                    
                    <button id="loginBtn" type="button" class="btn btn-outline-dark" @click="navigate()">Login</button>
                </div>
            </div>
            <div class="col-2">

            </div>
        </div>   
    </div>

</template>
<script>
import Loading from '@/components/Common/Loading.vue'

export default {
  components: { Loading },
    name: 'LoginView',
    data() {
        return {
            staffList: [],
            errorMsg: "",
            selectedUser:"",
            loading: null,
            api: this.$store.state.api
        }
    },
    methods: {
        async fetchData() {
            await axios.get(this.api + '/staff')
            .then(response => {
                this.staffList = response.data.data.staffs;
            })
            .catch(error => alert(error));
        },
        navigate(){
            if(this.selectedUser) {
                this.$store.commit('setStaffId', this.selectedUser.staff_id)
                this.$store.commit('setCurrentAccessRole', this.selectedUser.role.role_name)
                this.$router.push({ name: 'learningJourneys'})
            }
            else{
                this.errorMsg = 'Please select a user'
            }
            
        }
    },
    async mounted() {
        this.loading = true
        await this.fetchData();
        this.loading = false
    }
}
</script>

<style>
    #container{
        height: 100%;
        background-color: #F0F7F4;
        background-image: linear-gradient(180deg, #99E1D9, #F0F7F4);
        background-repeat: no-repeat;
        background-size: cover;
    }

    #logo {
        max-width: 300;
        width: 75%;
    }

    @media (max-width:576px) {
        #ddlUser, #loginBtn {
            width: 100%;
        }
    }
    @media (min-width:577px) {
        #ddlUser  {
            width: 75%;
        }
        #loginBtn{
            width: 50%;
        }
    }
    
</style>