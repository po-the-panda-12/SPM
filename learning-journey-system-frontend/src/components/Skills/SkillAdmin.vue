<template>
    <div class="card h-100 w-100" style="width: 18rem;">
        <img src="@/assets/skills_future.jpg" class="card-img-top" alt="...">
        <div class="card-body text-center">
            <hr>
            <h5 class="card-title d-inline me-2 fw-bold">{{ skill.skill_name}} </h5>
            
            <div class="mt-3 text-center">
                <div class="mt-3 text-center">
                    <span @click="this.$emit('update-skill', skill)" id="edit">
                        <i class="fa fa-light fa-pencil"></i> Edit 
                    </span> |
                    <span id="delete" data-test="modal" data-bs-toggle="modal" :data-bs-target="'#delete'+skill.skill_id">
                        <i class="fa fa-light fa-trash mx-1"></i>Delete
                    </span>
                </div>
            </div>
            <deleteSkill @reload="$emit('reload')" :skill="skill"></deleteSkill>
        </div>
    </div>
</template>

<script>
    import deleteSkill from '@/components/Skills/deleteSkill.vue'
    import updateSkill from '@/components/Skills/updateSkill.vue'
    import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'
    

    export default {
        name: 'SkillAdmin',
        props: {
            skill: Object,
        },
        components: {
            deleteSkill,
            updateSkill,
        },
        emits: ['reload', 'update-skill'],
        data() {
            return {
            }
        }
    }
</script>

<style scoped>
    #edit, #delete {
        cursor: pointer;
    }
</style>