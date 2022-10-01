<template>
    <div>
        <h2>Select Role</h2>
    </div>
</template>

<script>
    import axios from 'axios'
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'

    export default {
        name: 'CreateLearningJourney',
        data() {
            return {
                newLearningJourneys: []
            }
        },
        mounted() {
            axios.post("https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/journey", {
                "name": "Learning Journey 1",
                "staff_id": 3,
                "role": 3
            })
            // .then(response => console.log(response)) 
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
</script>