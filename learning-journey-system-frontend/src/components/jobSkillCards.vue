<template>
    <div id="carousel" class="container text-center my-3">
        <jobCards @view-skill="viewSkill" />
     <h1 class = 'text-start'> View Skills </h1>
         <div id="carouselExampleControl" class="carousel carousel-dark slide" data-bs-ride="carousel">
             <div class="carousel-inner" role="listbox">
                 <div v-for="role, i in roles" v-bind="i" :key='role.id' :class="['carousel-item', {'active':i == 0}]">
                     <div class="row w-100 h-100">
                         <div v-for="r in role" :key='r.id' class="col-lg-3">
                                 <div class="card">
                                     <div class="card-body">
                                         <img class='img-fluid' src = "@/assets/software_developer.jpg" >
                                     </div>
                                     <!-- <text> Skill ID : {{ r.skill_id }}</text> -->
                                     <text class="strong"> Skill Name: {{r.skill_name}} </text>
                                     <!-- <button class = "btn btn-primary">Add Skill</button> -->
                                     <button @click="viewCourse(r.skill_id)" class = "btn btn-primary">Add Skill</button>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
 </template>

 <script> 
    import jobCards from '@/components/jobCards.vue'
    export default {
     name: 'jobSkillCards',
     components: {
      jobCards,
    },
     data() {
         return {
             roles: []
         }
     },
     methods: {
        
        viewCourse(skill_id) {
            this.$emit('view-course', skill_id);
            },

        viewSkill(id) {
            console.log(id);
            var cards = [];
            axios.get("https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/role_skill/role?role="+id)
            .then(response => {
                cards = response.data.data.skills;
                this.roles = cards;
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
                 this.roles = newArray;
                 console.log(newArray);           
                 })
                 .catch(error => alert(error));
            }
        }
    

}
 </script>
 
 