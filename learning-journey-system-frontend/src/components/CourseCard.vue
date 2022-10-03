<template>
    <div class="col col-sm-3 col-md-3 ">
            <div class="card text-start my-3" style="width: 18rem;">
                <!-- TODO: placeholder image to be inserted -->
                <!-- <img src="..." class="card-img-top" alt="..."> -->
                <div class="card-body">
                    <h5 class="card-title"> {{ course.course_id }} {{ course.course_name }}</h5>
                    <p class="card-text">{{ course.course_type }}</p>
                    <p class="card-text">{{ course.course_desc }}</p>
                    <a href="#" class="btn btn-primary">Add Course</a>
                </div>
            </div>
    </div>
</template>
<script>
    export default {
        name: 'CourseCard',
        data() {
            return {
                courses: [],
            }
        },
        methods: {
        },
        props: {
            course: {
                course_category: String,
                course_desc: String,
                course_id: String,
                course_name: String,
                course_status: String,
                course_type: String,
            }
        }
    }
</script>