<template>
   <div id="carousel" class="container text-center my-3">
    <h1 class = 'text-start'> Select a Skill </h1>
		<div id="carouselExampleControls" class="carousel carousel-dark slide" data-bs-ride="carousel">
			<div class="carousel-inner" role="listbox">
				<div v-for="skill, i in skills" v-bind="i" :class="['carousel-item', {'active':i == 0}]">
					<div class="row w-100 h-100">
						<div v-for="s in skill" class="col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <img src = "@/assets/communication-skills.jpg" >
                                </div>
                                <text> {{s.name}} </text>
                                <button class = "btn btn-primary">View Courses</button>
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
      name: 'skillCards',
      props: {
			skills : Array
		},
		data() {
			return {
				skills: [
					{ 'name': 'Page 1', 'href': '@/assets/communication-skills.jpg' },
					{ 'name': 'Page 2', 'href': '@/assets/html5.jpg' },
					{ 'name': 'Page 3', 'href': '@/assets/communication-skills.jpg' },
					{ 'name': 'Page 4', 'href': '@/assets/html5.jpg' },
					{ 'name': 'Page 5', 'href': '@/assets/communication-skills.jpg' },
					{ 'name': 'Page 6', 'href': '@/assets/html5.jpg' },
					{ 'name': 'Page 7', 'href': '@/assets/communication-skills.jpg' },
					{ 'name': 'Page 8', 'href': '@/assets/html5.jpg' }
				]
			}
		},
		mounted() {
			let cards = [
				{ 'name': 'Page 1', 'href': '/assets/communication-skills.jpg' },
				{ 'name': 'Page 2', 'href': '/assets/html5.jpg' },
				{ 'name': 'Page 3', 'href': '/assets/communication-skills.jpg' },
				{ 'name': 'Page 4', 'href': '/assets/html5.jpg' },
				{ 'name': 'Page 5', 'href': '/assets/communication-skills.jpg' },
				{ 'name': 'Page 6', 'href': '/assets/html5.jpg' },
				{ 'name': 'Page 7', 'href': '/assets/communication-skills.jpg' },
				{ 'name': 'Page 8', 'href': '/assets/html5.jpg' }
			];

			let display_structure =[];
			let card_per_carousel = 3;

			for(let i = 0; i <cards.length; i++) {
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
			this.skills = newArray;
			console.log(newArray);
		}
	}
//         axios.get('https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/role?status=Active')
// 			.then(response => {
// 				// cards = response.data.skills;
// 
// 				cards = [
// 					{
// 						'name': 'Page 1',
// 						'href': '@/assets/communication-skills.jpg'
// 					},
// 					{
// 						'name': 'Page 2',
// 						'href': '@/assets/html5.jpg'
// 					},
// 					{
// 						'name': 'Page 3',
// 						'href': '@/assets/communication-skills.jpg'
// 					},
// 					{
// 						'name': 'Page 4',
// 						'href': '@/assets/html5.jpg'
// 					},
// 					{
// 						'name': 'Page 5',
// 						'href': '@/assets/communication-skills.jpg'
// 					},
// 					{
// 						'name': 'Page 6',
// 						'href': '@/assets/html5.jpg'
// 					},
// 					{
// 						'name': 'Page 7',
// 						'href': '@/assets/communication-skills.jpg'
// 					},
// 					{
// 						'name': 'Page 8',
// 						'href': '@/assets/html5.jpg'
// 					},
// 				]
// 
// 				display_structure = []
// 				card_per_carousel = 3
// 
// 				for (let i = 0; i < cards.length; i++) {
// 					start_index = i
// 					single_carousel = []
// 
// 					for (let j = 0; j < card_per_carousel; j++) {
// 						if (start_index < cards.length - 1) {
// 							start_index += 1
// 						} else {
// 							start_index = 0
// 						}
// 
// 						single_carousel.push(cards[start_index])
// 					}
// 
// 					display_structure.push(single_carousel)
// 				}
// 
// 				var newArray = display_structure.slice(0, display_structure.length - 1).slice();
// 				newArray.unshift(display_structure[display_structure.length - 1]);
// 				this.skills = newArray;
// 				console.log(newArray)
// 			})
// 			.catch(error => alert(error));
</script>
<!-- 
<style scope> 
    @media (max-width: 767px) {
    .carousel-inner .carousel-item > div {
        display: none;
    }
    .carousel-inner .carousel-item > div:first-child {
        display: block;
    }
    }

    .carousel-inner .carousel-item.active,
    .carousel-inner .carousel-item-next,
    .carousel-inner .carousel-item-prev {
    display: flex;
    }

    /* medium and up screens */
    @media (min-width: 768px) {
    
    .carousel-inner .carousel-item-end.active,
    .carousel-inner .carousel-item-next {
        transform: translateX(25%);
    }
    
    .carousel-inner .carousel-item-start.active, 
    .carousel-inner .carousel-item-prev {
        transform: translateX(-25%);
    }
    }

    .carousel-inner .carousel-item-end,
    .carousel-inner .carousel-item-start { 
    transform: translateX(0);
    }
</style> -->

