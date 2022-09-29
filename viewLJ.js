var app = Vue.createApp({
    data() {
        return {
            lj: [],
            lj_courses: [],
            completed_courses: 0,
            incompleted_courses: 0,
            progress: 0,
            completed_courses_list: [],
            incompleted_courses_list: []
        }
    },

    methods: {
        getLJ() {
            // need to change this depending on which staff
            axios.get('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/journey?staff=1')
                .then(response => {
                    // need to change this when onclick from View all learning journeys
                    // console.log(response.data.data.learning_journey[0])
                    // console.log(response.data.data.learning_journey[0].courses)
                    
                    this.lj = response.data.data.learning_journey[0]
                    this.lj_courses = response.data.data.learning_journey[0].courses
                    
                    this.overall_courses = this.lj_courses.length
                    
                    for (var i = 0; i < this.lj_courses.length; i++) {
                        
                        if (this.lj_courses[i].status == "Complete") {
                            this.completed_courses += 1
                            this.completed_courses_list.push(this.lj_courses[i])
                        }
                        else{
                            this.incompleted_courses += 1
                            this.incompleted_courses_list.push(this.lj_courses[i])
                        }
                    }

                    this.progress = Math.ceil(this.completed_courses / (this.incompleted_courses + this.completed_courses) * 100)
                    
                })
                .catch(error => alert(error));
        },
    },

    created() {
        this.getLJ()
    }
})

app.component('course-modal', {
    props: ['course'],
    template: `
    <div class="modal fade" :id="'staticBackdrop'+ course.course_id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">{{ course.course_name }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <h6 class="card-subtitle mb-2 text-muted">Skills: <span class="badge rounded-pill text-bg-secondary mx-1" v-for="skill in course.skills">{{ skill.skill_name }}</span></h6>
            <h6>{{ course.course_desc }}</h6>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-light border border-dark" data-bs-dismiss="modal">Close</button>
        </div>
        </div>
    </div>
</div>`
})

app.mount('#app')

