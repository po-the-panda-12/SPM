<template>
    <div id="carousel" class="container text-center my-3">
     <h1 class = 'text-start'> Select a Job </h1>
         <div id="carouselExampleControls" class="carousel carousel-dark slide" data-bs-ride="carousel">
             <div class="carousel-inner" role="listbox">
                 <div v-for="role, i in roles" v-bind="i" :key='role.id' :class="['carousel-item', {'active':i == 0}]">
                     <div class="row w-100 h-100">
                         <div v-for="r in role" :key='r.id' class="col-lg-4">
                                 <div class="card">
                                     <div class="card-body">
                                         <img class='img-fluid' src = "@/assets/software_developer.jpg" >
                                     </div>
                                     <text class="strong">{{r.role_name}} </text>
                                     
                                     <button @click="viewSkill(r.role_id)" class = "btn btn-primary">View Skills</button>
                                 </div>
                         </div>
                     </div>
                 </div>
             </div>
             <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                 <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                 <span class="visually-hidden">Previous</span>
             </button>
             <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                 <span class="carousel-control-next-icon" aria-hidden="true"></span>
                 <span class="visually-hidden">Next</span>
             </button>
         </div>
      </div>
 </template>
 
 <script>
     export default {
     name: 'jobCards',
     data() {
         return {
             roles: []
         }
     },
     mounted() {
             var cards = [];
             axios.get("https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/role")
             .then(response => {
                 cards = response.data.data.job_roles;
                 console.log(cards);
                 let display_structure =[];
                 let card_per_carousel = 3;
             for (let i = 0; i < cards.length; i++) {
                 let start_index = i;
                 let single_carousel = [];
                 for (let j = 0; j < card_per_carousel; j++) {
                     if (start_index < cards.length - 1) {
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
         },
     methods: {
         viewSkill(roll_id) {
             this.$emit('view-skill', roll_id);
             }
         }
     }
 </script>
 
 