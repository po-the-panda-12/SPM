import axios from 'axios'
//CREATE

//Assign skill id 1 to role id 3
const assignSkillToRole = async(role_id, skill_id) => {
    const payload = {
        "role" : role_id,
        "skill" : skill_id
    }
    const response = await axios.post('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role_skill', payload)
    // console.log("here", response)
    return response.data.code
}


//DELETE
//To delete skill id 1 from role id 3
const removeSkillFromRole = async (role_id, skill_id) => {
    const payload = {
        "role" : role_id,
        "skill" : skill_id
    }
    const response = await axios.delete('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role_skill', { data: payload })
    // console.log("remove", response)
    return response.data.code
}

//READ
//To retreive all role skills
const getAllRoleSkills = async () => {
    let response = await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role_skill')
    return response.data.code
}
//To retreive all role skills for role id 3
const getRolesWitbSpecificSkillId = async (skill_id) => {
    let response = await axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role_skill/role?role="+skill_id)
    return response.data.code
}

// Viewing of role skills - updates to role id 3 and skill id 1 will be reflected 
describe("JobRoleView.vue", () => {
    it('should return 200 showing all role skills', async () => {
        const response = await getAllRoleSkills()
        expect(response).toBe(200)
    })
    it('should return 200 showing all roles with specific skill id 1', async () => {
        const response = await getRolesWitbSpecificSkillId(1)
        expect(response).toBe(200)
    })

    describe("add skill with skill_id 1 to role_id 3", () => {
        it('Should return 200 showing skill assigned to role successfully', async () => {
            const skill_id = 1
            const role_id = 3
            const response = await assignSkillToRole(role_id, skill_id)
            expect(response).toBe(200)
        })
    
        it('Should return 500 because skill_id 1 has already assigned to role_id 3', async () => {
            const skill_id = 1
            const role_id = 3
            const response = await assignSkillToRole(role_id, skill_id)
            expect(response).toBe(500)
        })
        // remove skill id 1 from role id 3
        afterAll(async () => {
            const skill_id = 1
            const role_id = 3
            await removeSkillFromRole(role_id, skill_id)
        })
    })

    describe("remove skill with skill_id 1 from role_id 3", () => {
        // assign skill id 1 to role id 3
        beforeAll(async () => {
            const skill_id = 1
            const role_id = 3
            await assignSkillToRole(role_id, skill_id)
        })
        it('Should return 200 showing skill_id 1 removed from role_id 3 successfully', async () => {
            const skill_id = 1
            const role_id = 3
            const response = await removeSkillFromRole(role_id, skill_id)
            expect(response).toBe(200)
        })
        it('Should return 500 because skill_id 1 has already removed from role_id 3', async () => {
            const skill_id = 1
            const role_id = 3
            const response = await removeSkillFromRole(skill_id, role_id)
            expect(response).toBe(404)
        })
    })
})
