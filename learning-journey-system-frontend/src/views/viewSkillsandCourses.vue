<template>
  <div class="container">
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
      <div class="carousel-inner" role="listbox">
        <div :class="['carousel-item', {'active':i == 0}]" v-for="(skillGroup,i) in skillGroups">
          <div class="row w-100 h-100">
            <div class="col-md-4" v-for="skill in skillGroup">
              <div class="card">
                <div class="card-body">
                  <img class='img-fluid' src="@/assets/skills_future.jpg">
                </div>
                <text> Skill ID : {{ skill.skill_id }}</text>
                <text class="strong"> Skill Name: {{skill.skill_name}} </text>
                <button class="btn btn-primary" @click="viewCourses(skill.skill_id)">View Courses</button>
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
  
  
  <div class="container" v-if="courses">
    <div class="row">
      <CourseCard v-for="course in courses" :course="course" />
    </div>
  </div>
  <div class="container" v-else>
    <h2>No courses available for this skill!</h2>
  </div>

</template>

<script>
  // @ is an alias to /src
  import Navbar from '@/components/Navbar.vue'
  // import CourseCards from '@/components/CourseCards.vue'
  import CourseCard from '@/components/CourseCard.vue'
  import SkillCards from '@/components/SkillCards.vue'
  import SkillCard from '@/components/SkillCard.vue'
  
  export default {
    name: 'viewSkillsandCourses',
    components: {
    Navbar,
    SkillCard,
    SkillCards,
    CourseCard
    },
    data() {
      return {
        skillGroups: [],
        courses: [],
      }
    },
    methods: {
      splitSkills(skill_list){
        for (var i = 0; i < skill_list.length; i += 3) {
          const chunk = skill_list.slice(i, i + 3);
          this.skillGroups.push(chunk)
          console.log(this.skillGroups)
        }
      },

      viewCourses(id) {
        axios.get("https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/course_skill/skill?skill=" + id)
        .then(response => {
          response ? this.courses = response.data.data.courses : null
        })
        .catch(error => alert(error));
      },

      viewSkills() {
        axios.get("https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/skill")
        .then(response => {
          console.log(response.data.data.skills);
          response ? this.splitSkills(response.data.data.skills) : null
        })
        .catch(error => alert(error));
      }
    },
    mounted() {
      this.viewSkills();
    }
}
</script>
  