import axios from 'axios'


//CREATE

//Assign skill id 1 to role id 3
const newSkillAssign = async() => {
    const newSkillAssign = {
        "role" : 3,
        "skill" : 1
    }
    let response = await axios.post('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role_skill', newSkillAssign)
    // console.log(response)
    return response.data.code
}

//Assign skill id 1 to role id 3 to test for 500 response
const ExistingSkillAssign = async() => {
    const ExistingSkillAssign = {
        "role" : 3,
        "skill" : 1
    }
    let response = await axios.post('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role_skill', ExistingSkillAssign)
    // console.log(response)
    return response.data.code
}


//DELETE
//To delete skill id 1 from role id 3
const deleteExistingSkill = async() => {
    const existingRoleSkill = {
        "role" : 3,
        "skill" : 1
    }
    let response = await axios.delete('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role_skill', existingRoleSkill)
    // console.log(response)
    return response.data.code
}
//To delete skill id 1 from role id 3 to test for 500 response
const deleteNewSkill = async() => {
    const newRoleSkill = {
        "role": 3,
        "skill": 1
    }
    let response = await axios.delete('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role_skill', newRoleSkill)
    // console.log(response)
    return response.data.code
}

//READ
//To retreive all role skills
const getAllRoleSkills = async () => {
  const result = []
  let response = await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role_skill')
  //loop through first 3 response
  for (let i = 0; i < 3; i++) {
    result.push(response.data.data.role_skill[i])
    }
    return result
}

// Assgin Skill to Role
describe("JobRoleView.vue", () => {
    it("Should return 200 showing skill assigned to role successfully", async () => {
        const response = await newSkillAssign()
        expect(response).toEqual(200)
    })

    it('Should return 500 because skill already assigned to role', async () => {
        const response = await ExistingSkillAssign()
        expect(response).toEqual(500)
    })
})

// // Viewing of role skills - updates to role id 3 and skill id 1 will be reflected 
describe("JobRoleView.vue", () => {
  it('Should render skill name and status', async () => {
      const role_skillArray = await getAllRoleSkills()
      const role_skill = [{"role_id": 1, "skill_id": 1}, {"role_id": 3, "skill_id": 1}, {"role_id": 3, "skill_id": 2}]
      console.log("skills", role_skill)
      
      expect(role_skillArray).toEqual(role_skill)  
  })
})


// Delete skill from role
describe("JobRoleView.vue", () => {
    it("Should return 200 showing skill was successfully deleted from role", async () => {
        const response = await deleteExistingSkill()
        expect(response).toEqual(200)
    })

    it("Should return 404 showing skill was not in role", async () => {
        const response = await deleteNewSkill()
        expect(response).toEqual(404)
    })

})