<template>
    <div class="card h-100 w-100" style="width: 18rem;">
        <img src="https://onlineidealab.com/wp-content/uploads/DM-new.png" class="card-img-top">
        <div class="card-body">
            <h6 class="card-title fw-bold mb-3">
                {{ course.course_id }} 
                {{ course.course_name }} &nbsp;
                <i class="fa fa-circle-question" data-bs-toggle="modal" :data-bs-target="'#staticBackdrop'+ course.course_id"></i>
            </h6>
                
            <!-- Modal -->
            <div class="modal fade" :id="'staticBackdrop'+ course.course_id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold" id="staticBackdropLabel">{{ course.course_name }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="https://onlineidealab.com/wp-content/uploads/DM-new.png" class="card-img-top w-70 mb-2">
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
            
            <p class="card-text text-muted" style="font-size:14px"><i class="fa-solid fa-house"></i>&nbsp; {{ course.course_type }} Course Type</p>
            <p class="card-text text-muted" style="font-size:14px"><i class="fa-solid fa-cubes"></i>&nbsp; {{ course.course_category }} Category</p>
            
            <div class="text-center">
                <button v-if="showDelete" class="btn btn-danger w-100 mt-2" data-bs-toggle="modal" :data-bs-target="'#deleteCourse'+ course.course_id">
                    Remove
                </button>
            </div>

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
                            <h5 class="modal-title fw-bold" id="staticBackdropLabel">Are You Sure?</h5>
                        </div>
                        <div class="modal-body">
                            <img src="https://onlineidealab.com/wp-content/uploads/DM-new.png" class="card-img-top w-70 mb-3">
                            <p>WARNING: You are about to delete {{ course.course_id }} {{ course.course_name }}</p>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-danger" @click="deleteCourse(course.course_id); this.$emit('refreshPage');" data-bs-dismiss="modal">Delete</button>
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