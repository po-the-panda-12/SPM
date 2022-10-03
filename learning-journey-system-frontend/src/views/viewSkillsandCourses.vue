<template>
  <div>
    <SkillCards @view-course="viewCourse(skill_id)"/>
    <!-- <CourseCards @view-course="viewCourse" /> -->
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
    methods: {
      viewCourse(id) {
        console.log(id);
        var cards = [];
        axios.get("https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/course_skill/skill?skill=" + id)
          .then(response => {
            cards = response.data.data.courses;
            this.skills = cards;
            console.log(cards);
            let display_structure = [];
            let card_per_carousel = cards?.length;
            for (let i = 0; i < cards?.length; i++) {
              let start_index = i;
              let single_carousel = [];
              for (let j = 0; j < card_per_carousel; j++) {
                if (start_index < cards?.length - 1) {
                  start_index += 1;
                }
                else {
                  start_index = 0;
                }
                single_carousel.push(cards[start_index]);
              }
              display_structure.push(single_carousel);
            }
            var newArray = display_structure.slice(0, display_structure.length - 1).slice();
            newArray.unshift(display_structure[display_structure.length - 1]);
            this.skills = newArray;
            console.log(newArray);
          })
          .catch(error => alert(error));
      }
    }
}
</script>
  