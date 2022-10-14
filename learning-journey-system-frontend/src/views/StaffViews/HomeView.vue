<template>
    <div class="container-fluid position-relative align-self-stretch p-5">
        <h1>Welcome {{role}} {{staffId}}!</h1>
    </div>
</template>

<script>
export default {
    name: 'HomeView',
    data(){
        return {
            staffId: this.$store.state.stored_staff_id,
            role: this.$store.state.stored_current_accessrole
        }
    }
}
</script>