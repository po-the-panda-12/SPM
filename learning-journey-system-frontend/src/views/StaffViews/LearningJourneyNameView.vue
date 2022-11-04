<template>
    <div class="container">
        <p class="ps-4 pt-3 fs-1">What will you call your learning journey?</p>
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Learning Journey Name" aria-label="Recipient's username"
                aria-describedby="button-addon2" v-model="learningJourneyName" @keyup="checkLJInput()">
            <button class="btn btn-outline-secondary bg-primary" type="button" id="button-addon2" @click="storeLearningJourneyName()">
                Next
                <!-- <router-link :to="'/jobroles'" class="text-light" style="text-decoration: none" @click="storeLearningJourneyName()">
                    Next
                </router-link> -->
            </button>
        </div>
        <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p> 
    </div>
</template>

<script>
    export default {
        name: "LearningJourneyNameView",
        data() {
            return {
                newLJID: 0,
                learningJourneyName: "",
                errorMsg: ""
            }
        },
        methods: {
            checkLJInput(){
                if(this.learningJourneyName.length > 0){
                    this.errorMsg = ""
                }
            },
            storeLearningJourneyName(){
                if(this.learningJourneyName!= ""){
                    this.$store.commit('setCurrentLJName', this.learningJourneyName)
                    // this.$store.commit('setIndivLJId', this.newLJID)
                    this.$router.push('/jobroles')
                }
                else{
                    this.errorMsg = "Please enter a learning journey name"
                }
                
            },
            async createNewLJId(){
                // get all the learning journeys and find the highest id
                await axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey")
                .then(response => {
                console.log('name view', response)
                    for(let lj of response.data.data.learning_journey){
                        if (lj.lj_id > this.newLJID){
                            this.newLJID = lj.lj_id
                        }
                    }
                    this.newLJID += 1
                })
                .catch(error => {
                    console.log(error)
                })
            }
        },
        created() {
            // this.createNewLJId()
            
        }
    }
</script>
