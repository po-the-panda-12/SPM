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
                  <text> Skill ID : {{ skill.skill_id }}</text>
                  <text class="strong"> Skill Name: {{skill.skill_name}} </text>
                  <button class="btn btn-primary" @click="getCourses(skill.skill_id)">View Courses</button>
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
      <AddedCourseCard v-for="course in updatedAvailableCoursesAfterRemoving" :course="course" @removeSelectedCourse="removeSelectedCourse(course)"></AddedCourseCard>
    </div>
    <div class="row">
      <button class="btn btn-primary" @click="saveCourses">Save Courses</button>
    </div>
  </div>

  <div class="container" v-if="courses">
    <h1 class="text-start">Available Courses</h1>
    <div class="row">
      <CourseCard v-for="course in updatedAvailableCoursesAfterAdding" :course="course" @addCourse="addSelectedCourse(course)"/>
    </div>
  </div>
  <div class="container" v-else>
    <h2>No courses available for this skill!</h2>
  </div>

</template>

<script>
  // @ is an alias to /src
  import Navbar from '@/components/Navbar.vue'
  import CourseCard from '@/components/CourseCard.vue'
  import SkillCard from '@/components/SkillCard.vue'
  import AddedCourseCard from '../components/AddedCourseCard.vue'
  
  export default {
    name: 'viewSkillsandCourses',
    components: {
    Navbar,
    SkillCard,
    CourseCard,
    AddedCourseCard
},
    data() {
      return {
        skillGroups: [],
        allCoursesPerSkill: [],
        courses: [],
        selectedCourses: [],
      }
    },
    methods: {
      splitSkills(skill_list){
        for (var i = 0; i < skill_list.length; i += 3) {
          const chunk = skill_list.slice(i, i + 3);
          this.skillGroups.push(chunk)
          
        }
      },

      getCourses(id) {
        axios.get("https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/course_skill/skill?skill=" + id)
        .then(response => {
          this.courses = []
          this.allCoursesPerSkill = response.data.data.courses ? response.data.data.courses.filter(course => course.course_status === "Active") : null;
          const skillCourses = response.data.data.courses;

          if(this.selectedCourses.length !== 0){
            skillCourses.forEach(newCourse => {
              this.selectedCourses.forEach(selectedCourse => {
                if (newCourse.course_id !== selectedCourse.course_id) {
                  this.courses.push(newCourse)
                }
              })
            })
          }
          else {
            this.courses = skillCourses;
          }
        })
        .catch(error => alert(error));
      },

      getSkills() {
        axios.get("https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/skill")
        .then(response => {
          const activeSkills = response.data.data.skills.filter(skill => skill.skill_status === "Active")
          response ? this.splitSkills(activeSkills) : null
        })
        .catch(error => alert(error));
      },
      removeSelectedCourse(removedCourse){
        this.selectedCourses = this.selectedCourses.filter(course => course.course_id != removedCourse.course_id)

        if(this.allCoursesPerSkill.some(course => course.course_id === removedCourse.course_id)){
          this.courses.push(removedCourse)
        }

      },
      addSelectedCourse(addedCourse){
        this.courses = this.courses.filter(course => course.course_id != addedCourse.course_id)
        this.selectedCourses.push(addedCourse)
        
      },
      saveCourses(){
        console.log('selectedCourses', this.selectedCourses);
      }
    },
    mounted() {
      this.getSkills();
    },
    computed: {
      viewSelectedCourses() {
        return this.selectedCourses.length > 0 ? true : false
      },
      updatedAvailableCoursesAfterAdding(){
        this.courses = this.courses.filter(course => course.course_id != this.selectedCourses.course_id)
        return this.courses
      },
      updatedAvailableCoursesAfterRemoving(){
        this.selectedCourses = this.selectedCourses.filter(course => course.course_id != this.courses.course_id)
        return this.selectedCourses
      },
      
    }
}
</script>
  