import { mount } from '@vue/test-utils'
import SkillAdmin from '@/components/SkillAdmin.vue'

describe('SkillAdmin.vue', () => {
  it('renders skill name and status', () => {
    const skill = [{ 
            name: 'HTML',
            status: 'Active',
        },
        {
            name: 'CSS',
            status: 'Active',
        },
        {
            name: 'JavaScript',
            status: 'Active',
        },
    ]
    const wrapper = mount(SkillAdmin, {
      props: skill 
    })
    expect(wrapper.text()).toContain(skill)
  })
})
