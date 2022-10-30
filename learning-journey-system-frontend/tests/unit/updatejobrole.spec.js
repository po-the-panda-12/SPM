import { flushPromises, mount } from '@vue/test-utils'
import updateJobRole from '@/components/JobRoles/updateJobRole.vue'
import JobRolesAdmin from '@/components/JobRoles/JobRolesAdmin.vue'

test('loads skills on modal open', async () => {
    const wrapper = mount(updateJobRole, {
        props: { 
          role: {
            "role_id": 34
          }
        },
        data() {
            return {
                role_status: true,
                updated_name: "Software Developer",
                updated_status: "Active",
                currentSkillList: [
                    {
                        "skill_id": 1,
                        "skill_name": "Data Analytics",
                        "skill_status": "Active"
                    },
                    {
                        "skill_id": 2,
                        "skill_name": "Project Managenment",
                        "skill_status": "Retired"
                    }
                  ],
                skillList: [
                    {
                        "skill_id": 3,
                        "skill_name": "Java",
                        "skill_status": "Active"
                    },
                    {
                        "skill_id": 4,
                        "skill_name": "Python",
                        "skill_status": "Active"
                    }
                  ]
            }
        }
      })

    await flushPromises()
    // console.log(wrapper.html())
    const skills = wrapper.findAll('[data-test="currentSkill"]')
    expect(skills.length).toBe(2)
})
