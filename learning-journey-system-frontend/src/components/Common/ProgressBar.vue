<template>
    <div>
        <div class="d-flex mt-3">
            <div class="fs-6 me-auto"><p>Learning Progress</p></div> 
            <div class="fs-6 ms-auto">{{ progress }}% Completed</div>
        </div>
        
        <div class="progress">
            <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" :aria-valuenow="progress"
            aria-valuemin="0" aria-valuemax="100" :style="'width:'+ progress + '%'">
            {{ progress }}%
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'
    export default {
        name: 'progress',
        props: {
            progress: Number
        },

    }
</script>