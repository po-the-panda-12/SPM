<template>
    <div id="carousel" class="container text-center my-3">
        <skillCards @view-course="viewCourse" />
     <h1 class = 'text-start'> View Courses </h1>
         <div id="carouselExampleControl" class="carousel carousel-dark slide" data-bs-ride="carousel">
             <div class="carousel-inner" role="listbox">
                 <div v-for="skill, i in skills" v-bind="i" :key='skill.id' :class="['carousel-item', {'active':i == 0}]">
                     <div class="row w-100 h-100">
                         <div v-for="s in skill" :key='s.id' class="col-lg-3">
                             <div :v-if="s.skill_status==Active">
                                 <div class="card">
                                     <div class="card-body">
                                         <img class='img-fluid' src = "@/assets/courses.png" >
                                     </div>
                                     <text> Course ID : {{ s.course_id }}</text>
                                     <text class="strong"> Course Name: {{s.course_name}} </text>
                                     <text class="strong"> Course Description: {{s.course_desc}} </text>
                                     <text class="strong"> Course Status: {{s.course_status}} </text>
                                     <text class="strong"> Course Type: {{s.course_type}} </text>
                                     <text class="strong"> Course Category: {{s.course_category}} </text>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
      </div>
 </template>

 <script> 
    import skillCards from '@/components/skillCards.vue'
    export default {
     name: 'courseCards',
     components: {
      skillCards,
    },
     data() {
         return {
             skills: []
         }
     },

     methods: {
        viewCourse(id) {
            console.log(id);
            var cards = [];
            axios.get("https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/course_skill/skill?skill="+id)
            .then(response => {
                cards = response.data.data.courses;
                this.skills = cards;
                console.log(cards);
                let display_structure =[];
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
 
 