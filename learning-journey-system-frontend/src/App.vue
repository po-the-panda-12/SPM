<template>
  <Navbar v-if="!route.meta.hideNavbar"/>
  <router-view/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</template>

<script>
  import Navbar from '@/components/Common/Navbar.vue'
  import { useRoute } from 'vue-router'
  
  export default {
    name: 'App',
    components: {
      Navbar
    },
    setup(){
      let route = useRoute()
      return { route }
    },
    created(){
      if(this.$store.state.stored_current_accessrole){
        this.$router.push('/home')
        }
      else{
        this.$router.push('/')
      }
    }    
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  height: 100%;
}
html,body{
  height: 100%;
}

nav {
  padding: 30px;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  /* color: #42b983; */
  background-color: #99E1D9;
  border-radius: 50rem !important;
  padding: 5px 15px !important;
}
</style>
