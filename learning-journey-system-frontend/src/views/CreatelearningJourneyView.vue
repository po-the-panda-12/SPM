<template>
    <div>
        <Navbar/>
        <SelectRole/>
    </div>
</template>

<script>
    import Navbar from '@/components/Navbar.vue'
    import SelectRole from '@/components/SelectRole.vue'

    export default {
        name: 'CreatelearningJourneyView',
        
        components: {
            Navbar,
            SelectRole
        }
        
    }
    
</script>