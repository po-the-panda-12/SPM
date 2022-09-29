<template>
    <div class="card h-100 w-100" style="width: 18rem;">
        <img src="https://miro.medium.com/max/602/1*bO6lRwKN8TlPhEbxNTHhAA.png" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ course.course_name }}  
                <button class="btn" data-bs-toggle="modal" :data-bs-target="'#staticBackdrop'+ course.course_id">
                    <i class="fa fa-info-circle"></i>
                </button>
                
                <!-- Modal -->
                <course-modal :course="course"></course-modal>
            </h5>
            
            <p class="card-text">Course Type: {{ course.course_type }}</br></br>Category: {{ course.course_category }}</p><br>
        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'
    export default {
        name: 'course',
        props: {
            course: Object
        },

    }
</script>