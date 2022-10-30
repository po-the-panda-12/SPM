import axios from 'axios'

const getAllSkills = async () => {
    const result = []
    let response = await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill')
    for (let res of response.data.data.skills) {
        result.push(res)
    }
    return result
}


describe("viewAllSkills.vue", () => {
    it('Should render skill name and status', async () => {
        const skillsArray = await getAllSkills()
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
        console.log("skills", skillsArray)
        expect(skillsArray).toContain(skill)  
    })

})

// import { mount } from '@vue/test-utils'
// import SkillAdmin from '@/components/SkillAdmin.vue'

// describe('SkillAdmin.vue', () => {
//   it('renders skill name and status', () => {
//     const skill = [{ 
//             name: 'HTML',
//             status: 'Active',
//         },
//         {
//             name: 'CSS',
//             status: 'Active',
//         },
//         {
//             name: 'JavaScript',
//             status: 'Active',
//         },
//     ]
//     const wrapper = mount(SkillAdmin, {
//       props: skill 
//     })
//     expect(wrapper).toContain(skill)
//   })
// })