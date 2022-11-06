<template>
    <div class="container p-4 px-5">
        <a href="javascript:history.back()" class="btn btn-outline-dark my-auto mb-3"><i class="fa-solid fa-arrow-left"></i> Back</a>
        <div class="mx-5">
            <p class="mb-4 fs-1 fw-bold">Enter your learning journey name</p>

            <div class="input-group-lg mb-2">
                <input type="text" class="form-control" placeholder="Enter your learning journey name here..." aria-label="Recipient's username"
                v-model="learningJourneyName" @keyup="checkLJInput()">
            </div>
            <p v-if="errorMsg" class="text-danger mx-2">{{ errorMsg }}</p>

            <div class="text-center mb-5">
                <button class="btn btn-outline-dark my-5" type="button" style="padding: 10px 15%" @click="storeLearningJourneyName()">Next</button>
            </div>

        </div>
         
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
