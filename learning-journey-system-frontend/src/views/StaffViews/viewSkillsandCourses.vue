<template>
  <div class="container mb-5">
    <div v-if="skillGroups.length > 0" id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
      <div class="carousel-inner" role="listbox">
        <div :class="['carousel-item', {'active':i == 0}]" v-for="(skillGroups,i) in skillGroups">
          <div class="row w-100 h-100">
            <div class="col-md-4" v-for="skill in skillGroups">
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
  
  <div class="container mb-5" v-if="viewSelectedCourses">
    <h4 class="text-start fs-4">Available Courses</h4>
    <div class="row">
      <AddedCourseCard v-for="course in selectedCourses" :course="course" @removeSelectedCourse="removeSelectedCourse(course)"></AddedCourseCard>
    </div>
    <div class="text-center">
      <button class="btn btn-primary" style="padding: 10px 10%" @click="saveCourses()">Save Courses</button>
    </div>
  </div>

  <div class="container mb-3" v-if="coursesPerSkill.length > 0">
    <h1 class="text-start fs-4">Available Courses</h1>
    <div class="row">
      <CourseCard v-for="course in coursesPerSkill" :course="course" @addCourse="addCourse(course)" :showAdd="showAdd"/>
    </div>
  </div>
  <div class="container mb-4" v-else>
    <h2 class="fs-4">No courses available for this skill!</h2>
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
        existingCoursesId: [],
        showAdd: true,
        lj_id: null
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
    
      async getCourses(skill_id) {
        this.selectedSkillId = skill_id
        await axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course_skill/skill?skill=" + skill_id)
          .then(response => {
            if(response.data.data.courses){
              const activeCourses = response.data.data.courses ? response.data.data.courses.filter(course => course.course_status === "Active") : null;

              // remove courses from activeCourses that exist in this.existingCoursesId
              this.coursesPerSkill = activeCourses.filter(course => !this.existingCoursesId.includes(course.course_id))
              
              this.coursesSkillShouldHave = activeCourses
            }
            else{
              this.coursesPerSkill = []
            }
            // console.log('coursesPerSkill, ', this.coursesPerSkill)
            if (this.selectedCourses.length !== 0) {
              this.filterSelectedCoursesFromCoursesPerSkill()
            }
          })
          .catch(error => alert(error));
      },

    async getSkills(input_role_id) {
        await axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role_skill/role?role=" + input_role_id)
        .then(response => {
          const activeSkills = response.data.data.skills.filter(skill => skill.skill_status === "Active")
          response ? this.splitSkills(activeSkills) : null
        })
        .catch(error => alert(error));
      },

      removeSelectedCourse(removedCourse){
        this.selectedCourses = this.selectedCourses.filter(course => course.course_id != removedCourse.course_id)

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
      },

      async saveCourses(){
        if(this.selectedCourses.length > 0){
          const name = this.$store.state.currentLJName
          const staffId = this.$store.state.stored_staff_id
          
          if(name != null && this.role_id != null){
          const data = {
              "name": name,
              "staff_id": staffId,
              "role": this.role_id 
          }
          await axios.post("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey", data)
          .then(response => {
              if(response.status === 200){
                  alert('New Learning Journey Created Successfully')
                  
              }
          })
          .catch(error => {
              console.log(error)
          })
          await this.getNewLJid()
        }

        for (var i = 0; i < this.selectedCourses.length; i++){
          const course = this.selectedCourses[i]
          const data = {
            "lj": this.lj_id,
            "course": course.course_id
          }
          console.log(data)
          axios.post("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey_course", data)
          .then(response => {
            if(response.status === 200){
              alert("Course added to learning journey successfully!")
            }
          })
          .catch(error => alert(error));
        }

        this.$store.commit('setRoleId', null)
        this.$store.commit('setIndivLJId', this.lj_id)
        this.$router.push({ path: '/indivlearningJourneys' })
        }
        else{
          alert("Please select at least one course")
        }
        
      },
      async getNewLJid(){
        await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey')
        .then(response => {
            
            this.lj_id = response.data.data.learning_journey.slice(-1)[0].lj_id
            console.log(this.lj_id)
        })
        .catch(error => alert(error));
      },

      async getExistingCoursesForLJ(lj_id){
        await axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey_course?lj="+lj_id)
        .then(response => {
          // assign course_id from response to this.existingCourses
          this.existingCoursesId = response.data.data.learning_journey_course.map(course => course.course_id)
        })
        .catch(error => alert(error));
      }
    },
    mounted() {
      this.role_id = this.$store.state.stored_role_id
      if(this.$store.state.current_lj != null){
        this.lj_id = this.$store.state.stored_indivLJ_id
        this.getExistingCoursesForLJ(this.lj_id)
      }
      this.getSkills(this.role_id);
    },
    computed: {
      viewSelectedCourses() {
        return this.selectedCourses.length > 0 ? true : false
      }
    },
    created(){
        if(!this.$store.state.stored_current_accessrole){
        this.$router.push('/')
        }
    }    
}
</script>
  