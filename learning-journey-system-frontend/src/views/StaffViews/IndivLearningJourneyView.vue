<template>
    <Loading v-if="loading"></Loading>
    <div class="container">
        <IndivLearningJourney @loading="showLoad"></IndivLearningJourney>
    </div>
</template>

<script>
    import IndivLearningJourney from '@/components/LearningJourneys/IndivLearningJourney.vue'
    import Loading from '@/components/Common/Loading.vue'
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'

    export default {
        name: 'IndivLJView',
        components: {
            IndivLearningJourney,
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
        },        
        created(){
            if(!this.$store.state.stored_current_accessrole){
            this.$router.push('/')
        }
    }    

    }
</script>