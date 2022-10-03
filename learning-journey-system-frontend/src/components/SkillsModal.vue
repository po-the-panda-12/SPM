<template>
    <div class="modal fade" :id="'staticBackdrop'+ role.role_id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Required Skills</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div v-for="skill in role.skills" class="d-inline">
                        <span v-if="skill.skill_status=='Active'" class="badge bg-secondary mx-1">{{skill.skill_name}}</span>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light border border-dark" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import 'bootstrap/dist/js/bootstrap.bundle.min.js'
    import 'bootstrap/dist/css/bootstrap.min.css'
    
    export default {
      name: 'SkillsModal',
      props: {
        role: Object
      }
    }
</script>