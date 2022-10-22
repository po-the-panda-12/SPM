<template>
    <div>
        <SelectRole/>
    </div>
</template>

<script>
    import SelectRole from '@/components/JobRoles/SelectRole.vue'

    export default {
        name: 'CreatelearningJourneyView',
        
        components: {
            SelectRole
        },
        created(){
        if(!this.$store.state.stored_current_accessrole){
        this.$router.push('/')
        }
    }    
        
    }
    
</script>