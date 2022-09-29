<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                    <div>Learning Journey ID: {{ learningJourney.lj_id }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "LearningJourneyCard",
    props: ['learningJourney'],
    data() {
        return {
            //
        };
    },
};
</script>