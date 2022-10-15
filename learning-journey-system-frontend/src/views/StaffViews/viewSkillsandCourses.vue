<template>
  <div class="container">
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
      <div class="carousel-inner" role="listbox">
        <div :class="['carousel-item', {'active':i == 0}]" v-for="(skillGroup,i) in skillGroups">
          <div class="row w-100 h-100">
            <div class="col-md-4" v-for="skill in skillGroup">
              <div v-if = "skill.skill_status == 'Active' ">
                <div class="card">
                  <div class="card-body">
                    <img class='img-fluid' src="@/assets/skills_future.jpg">
                  </div>
                  <text class="ps-2"> Skill ID : {{ skill.skill_id }}</text>
                  <text class="ps-2"> Skill Name: {{skill.skill_name}} </text>

                  <button v-if="selectedSkillId === skill.skill_id" class="btn btn-primary disabled">View Courses</button>
                  <button v-else class="btn btn-primary"
                    @click="getCourses(skill.skill_id)">View Courses</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button class="carousel-control-prev bg-dark" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next bg-dark" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  
  <div class="container" v-if="viewSelectedCourses">
    <h1 class="text-start">Selected Courses</h1>
    <div class="row">
      <AddedCourseCard v-for="course in selectedCourses" :course="course" @removeSelectedCourse="removeSelectedCourse(course)"></AddedCourseCard>
    </div>
    <div class="row">
      <button class="btn btn-primary" @click="saveCourses">Save Courses</button>
    </div>
  </div>

  <div class="container" v-if="coursesPerSkill.length > 0">
    <h1 class="text-start">Available Courses</h1>
    <div class="row">
      <CourseCard v-for="course in coursesPerSkill" :course="course" @addCourse="addCourse(course)"/>
    </div>
  </div>
  <div class="container" v-else>
    <h2>No courses available for this skill!</h2>
  </div>

</template>

<script>
  // @ is an alias to /src
  import CourseCard from '@/components/Courses/CourseCard.vue'
  import SkillCard from '@/components/Skills/SkillCard.vue'
  import AddedCourseCard from '@/components/Courses/AddedCourseCard.vue'
  import axios from 'axios'
  
  export default {
    name: 'viewSkillsandCourses',
    components: {
    SkillCard,
    CourseCard,
    AddedCourseCard
  },
    data() {
      return {
        selectedSkillId: null,
        skillGroups: [],
        coursesPerSkill: [],
        coursesSkillShouldHave: [],
        selectedCourses: [],
        role_id: null,
      } 
    },
    methods: {
      splitSkills(skill_list){
        for (var i = 0; i < skill_list.length; i += 3) {
          const chunk = skill_list.slice(i, i + 3);
          this.skillGroups.push(chunk)
          
        }
      },
      filterSelectedCoursesFromCoursesPerSkill(){
        for (var i = 0; i < this.coursesPerSkill.length; i++){
          for (var j = 0; j < this.selectedCourses.length; j++){
            if (this.coursesPerSkill[i].course_id == this.selectedCourses[j].course_id){
              this.coursesPerSkill.splice(i, 1)
            }
          }
        }
      },
      courseBelongsToSkill(removed_course){
        for (var i = 0; i < this.coursesSkillShouldHave.length; i++){
          if (removed_course.course_id === this.coursesSkillShouldHave[i].course_id){
            return true
          }
        }
        return false
      },
    
      getCourses(id) {
        this.selectedSkillId = id
        axios.get("https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/course_skill/skill?skill=" + id)
          .then(response => {
            if(response.data.data.courses){
              this.coursesPerSkill = response.data.data.courses ? response.data.data.courses.filter(course => course.course_status === "Active") : null;

              this.coursesSkillShouldHave = response.data.data.courses ? response.data.data.courses.filter(course => course.course_status === "Active") : null;
            }
            else{
              this.coursesPerSkill = []
            }
            console.log('coursesPerSkill, ', this.coursesPerSkill)
            if (this.selectedCourses.length !== 0) {
              this.filterSelectedCoursesFromCoursesPerSkill()
            }
          })
          .catch(error => alert(error));
      },

      getSkills(input_role_id) {
        axios.get("https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/role_skill/role?role=" + input_role_id)
        .then(response => {
          const activeSkills = response.data.data.skills.filter(skill => skill.skill_status === "Active")
          response ? this.splitSkills(activeSkills) : null
        })
        .catch(error => alert(error));
      },

      removeSelectedCourse(removedCourse){
        this.selectedCourses = this.selectedCourses.filter(course => course.course_id != removedCourse.course_id)
        console.log('this.selectedCourses:', this.selectedCourses)

        if(this.courseBelongsToSkill(removedCourse)){
          if(this.coursesPerSkill.some(course => course.course_id == removedCourse.course_id)){
            return null
          }
          else{
            this.coursesPerSkill.push(removedCourse)
          }
        }
      },

      addCourse(addedCourse){
        this.coursesPerSkill = this.coursesPerSkill.filter(course => course.course_id != addedCourse.course_id)
        this.selectedCourses.push(addedCourse)
        console.log('selectedCourses, ', this.selectedCourses)
      },

      saveCourses(){
        // add course to learning journey api
        // {
        //   "lj": 1,
        //     "course": "COR001"
        // }
        const currentLJId = this.$store.state.current_lj_id
        console.log('currentLJId', currentLJId)
        for (var i = 0; i < this.selectedCourses.length; i++){
          const course = this.selectedCourses[i]
          const data = {
            "lj": currentLJId,
            "course": course.course_id
          }
          console.log(data)
          axios.post("https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/learning_journey_course", data)
          .then(response => {
            console.log('response, ', response)
          })
          .catch(error => alert(error));
        }
      }
    },
    mounted() {
      this.role_id = this.$store.state.stored_role_id
      this.getSkills(this.role_id);
    },
    computed: {
      viewSelectedCourses() {
        return this.selectedCourses.length > 0 ? true : false
      }
    }
}
</script>
  