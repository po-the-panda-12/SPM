<template>
    <div class="card h-100 w-100" style="width: 18rem;">
        <img src="https://miro.medium.com/max/602/1*bO6lRwKN8TlPhEbxNTHhAA.png" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">
                {{ course.course_id }} 
                {{ course.course_name }}  
                <button class="btn" data-bs-toggle="modal" :data-bs-target="'#staticBackdrop'+ course.course_id">
                    <i class="fa fa-info-circle"></i>
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
                        <h6 class="card-subtitle mb-2 text-muted">Skills: <span class="badge rounded-pill text-bg-secondary mx-1" v-for="skill in course.skills">{{ skill.skill_name }}</span></h6>
                        <h6>{{ course.course_desc }}</h6>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light border border-dark" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
            
            <p class="card-text">Course Type: {{ course.course_type }}<br><br>Category: {{ course.course_category }}</p><br>
            <button @click="deleteCourse(course.course_id)" class="btn btn-danger" v-if="indvLJView" >
                Remove Course
            </button>

            <!-- <div class="modal fade" :id="'deleteCourse'+ course.course_id" data-bs-backdrop="static" data-bs-keyboard="false"
                tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title" id="staticBackdropLabel"> Are You Sure?</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <img src="https://miro.medium.com/max/602/1*bO6lRwKN8TlPhEbxNTHhAA.png" class="card-img-top w-70">
                            <p>
                                You are about to delete {{ course.course_id }} {{ course.course_name }}
                            </p>
                            <button class="btn btn-danger" @click="deleteCourse(course.course_id)">Remove Course from Learning Journey</button>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light border border-dark" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div> -->
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
            indvLJView: Boolean
        },
        methods:{
            async deleteCourse(course_id){
                const data = {
                    "lj":this.$store.state.current_lj.lj_id,
                    "course":course_id
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