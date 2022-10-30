import { mount, flushPromises } from '@vue/test-utils'
import updateCourse from '@/components/Courses/updateCourse.vue'

describe('JobRoles.vue', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(updateCourse, {
            props: { 
              course: {
                "course_id": "COR001",
                "course_name": "Data Analytics"
              }
            },
            data() {
                return {
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
                    ],
                }
            }
          })
    })

    it("display course name", async () => {
        const course_name = wrapper.find('[data-test="course_name"]')
        expect(course_name.text()).toContain("Data Analytics")
    })

    it("display all skills assigned to a course", async () => {
        await flushPromises()
        const skills = wrapper.findAll('[data-test="currentSkill"]')
        expect(skills.length).toBe(2)
    })

    it("populate all available active skills in dropdown list", async () => {
        await flushPromises()
        const skills = wrapper.findAll('[data-test="activeSkill"]')
        expect(skills.length).toBe(2)
    })

    it("add skill to course", async () => {
        const skills = wrapper.findAll('[data-test="currentSkill"]')
        expect(skills.length).toBe(2)

        wrapper.find('select').findAll('option').at(1).setSelected()        

        wrapper.get('[data-test="addBtn"]').trigger('click')
        await flushPromises()
        expect(wrapper.findAll('[data-test="currentSkill"]').length).toBe(3)
    })
    
})