<template>
    <div>
        <div class="container">
            <IndivLearningJourney></IndivLearningJourney>
        </div>
    </div>
</template>

<script>
    import IndivLearningJourney from '@/components/LearningJourneys/IndivLearningJourney.vue'
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'

    export default {
        name: 'IndivLJView',
        components: {
            IndivLearningJourney
        },
        
        created(){
            if(!this.$store.state.stored_current_accessrole){
            this.$router.push('/')
        }
    }    

    }
</script>