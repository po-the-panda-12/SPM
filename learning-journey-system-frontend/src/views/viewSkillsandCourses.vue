<template>
  <div>
    <SkillCards/>
    <CourseCards @view-course="viewCourse" />
  </div>
</template>
<script>
  // @ is an alias to /src
  import Navbar from '@/components/Navbar.vue'
  import CourseCards from '@/components/CourseCards.vue'
  import SkillCards from '@/components/SkillCards.vue'
  
  export default {
    name: 'viewSkillsandCourses',
    components: {
    Navbar,
    SkillCards,
    CourseCards
    },
}
</script>
  