<template>
    <div class="card">
        <div class="card-body">
            <img class='img-fluid' src="https://resumegenius.com/wp-content/uploads/resume-soft-skills-hero.png">
        </div>
        <text class="ps-2"> Skill Name: {{skill.skill_name}} </text>
        <button v-if="clicked === true" class="btn btn-primary" @click="handleClick(skill.skill_id)">View Courses</button>
        <button v-else class="btn btn-primary disabled" >View Courses</button>

    </div>
</template>

<script>
export default {
    name: 'SkillCard',
    data() {
        return {
            clicked: true
        }
    },
    emits: ['getCourses'],
    methods: {
        handleClick(skill_id) {
            this.clicked = false
            this.$emit('getCourses', skill_id)
        }
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