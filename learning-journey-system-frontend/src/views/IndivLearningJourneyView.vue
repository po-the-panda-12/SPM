<template>
    <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

        <Navbar />
        <div class="container">
            <IndivLearningJourney></IndivLearningJourney>
        </div>
    </div>
</template>

<script>
    import Navbar from "@/components/Navbar.vue";
    import IndivLearningJourney from '@/components/IndivLearningJourney.vue'
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'

    export default {
      name: 'IndivLJView',
      components: {
        IndivLearningJourney,
        Navbar
        }

    }
</script>