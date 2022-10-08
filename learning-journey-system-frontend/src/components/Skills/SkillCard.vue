<template>
    <div class="card text-start" style="width: 18rem;">
        <img class="card-img-top" src="@/assets/communication-skills.jpg" alt="">
        <div class="card-body">
            <h5 class="card-title">{{ skill.skill_name }}</h5>
            <p class="card-text">{{ skill.skill_id }}</p>
            <a href="#" class="btn btn-primary">View Courses</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SkillCard',
    data() {
        return {
            skills: [],
        }
    },
    methods: {
    },
    props: {
        skill: {
            skill_id: Number,
            skill_name: String,
            skill_status: String,
        }
    }
}
</script>