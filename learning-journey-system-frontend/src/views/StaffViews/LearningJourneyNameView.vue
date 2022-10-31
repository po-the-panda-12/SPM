<template>
    <div class="container">
        <p class="ps-4 pt-3 fs-1">What will you call your learning journey?</p>
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Learning Journey Name" aria-label="Recipient's username"
                aria-describedby="button-addon2" v-model="learningJourneyName">
            <button class="btn btn-outline-secondary bg-primary" type="button" id="button-addon2">
                <router-link :to="'/jobroles'" class="text-light" style="text-decoration: none" @click="storeLearningJourneyName()">Next
                </router-link>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LearningJourneyNameView",
        data() {
            return {
                learningJourneyName: null,
            }
        },
        methods: {
            storeLearningJourneyName(){
                this.$store.commit('setCurrentLJName', this.learningJourneyName)
            },
        }
    }
</script>
