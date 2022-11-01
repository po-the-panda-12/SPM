<template>
    <div class="card h-100 w-100" style="width: 18rem;">
        <img src="https://miro.medium.com/max/602/1*bO6lRwKN8TlPhEbxNTHhAA.png" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">
                {{ course.course_id }} 
                {{ course.course_name }} 
                <button class="btn btn-light" data-bs-toggle="modal" :data-bs-target="'#staticBackdrop'+ course.course_id">
                    <i class="fa fa-circle-info"></i>
                </button>
            </h5>
                
            <!-- Modal -->
            <div class="modal fade" :id="'staticBackdrop'+ course.course_id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">{{ course.course_name }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="https://miro.medium.com/max/602/1*bO6lRwKN8TlPhEbxNTHhAA.png" class="card-img-top w-70">
                        <div v-if="course.skills != null">
                            <h6 class="card-subtitle mb-2 text-muted">Skills: 
                                <span class="badge rounded-pill text-bg-primary m-1" v-for="skill in course.skills">{{ skill.skill_name }}</span>
                            </h6>
                        </div>
                        <h6>{{ course.course_desc }}</h6>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light border border-dark" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
            
            <p class="card-text">Course Type: {{ course.course_type }}</p>
            <p class="card-text">Course Category: {{ course.course_category }}</p>
            <!-- <p class="card-text">Course Type: {{ course.course_type }}<br><br>Category: {{ course.course_category }}</p><br> -->
            <!-- <button @click="deleteCourse(course.course_id)" class="btn btn-danger" v-if="indvLJView" >
                Remove Course
            </button> -->
            
            <button v-if="showDelete" class="btn btn-danger" data-bs-toggle="modal" :data-bs-target="'#deleteCourse'+ course.course_id">
                Remove
            </button>

            <div v-if="showEdit" class="mt-3 text-center">
                <div class="mt-3 text-center">
                    <span @click="this.$emit('update-course', course)" id="edit" class="btn btn-outline-dark w-100">
                        <i class="fa fa-light fa-pencil"></i> Edit 
                    </span>
                </div>
            </div>


            <div class="modal fade" :id="'deleteCourse'+ course.course_id" data-bs-backdrop="static" data-bs-keyboard="false"
                tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title" id="staticBackdropLabel"> Are You Sure?</h1>
                        </div>
                        <div class="modal-body">
                            <img src="https://miro.medium.com/max/602/1*bO6lRwKN8TlPhEbxNTHhAA.png" class="card-img-top w-70">
                            <p>
                                You are about to delete {{ course.course_id }} {{ course.course_name }}
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-success" @click="deleteCourse(course.course_id)" data-bs-dismiss="modal">Yes</button>
                            <button type="button" class="btn btn-light border border-dark" data-bs-dismiss="modal">No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'
    import axios from 'axios';

    export default {
        name: 'course',
        props: {
            course: Object,
            showDelete: Boolean,
            showEdit: Boolean,
            incompletedCoursesList: Array,
            completedCoursesList: Array,
            
        },
        methods:{
            async deleteCourse(course_id){
                if(this.incompletedCoursesList || this.completedCoursesList){
                    if(this.incompletedCoursesList.length === 1 && this.completedCoursesList.length === 0){
                        alert('This is the last course in your learning journey. You need to have at least one course in progress for your learning journey')
                        return null
                    }
                }
                var data = null
                if (!this.showDelete){
                    data = {
                        "course":course_id
                    }
                }
                else{
                    data = {
                        "lj": this.$store.state.current_lj.lj_id,
                        "course": course_id
                    }
                }
                
                console.log(data)
                await axios.delete("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey_course", { data: data})
                .then(response => {
                    if(response.status === 200){
                        alert(`Course Deleted Successfully`)
                        this.$emit('refreshPage')
                    }
                })
                .catch(error => console.log(error))
            }
        }

    }
</script>

<style scoped>
    #edit {
        cursor: pointer;
    }
</style>