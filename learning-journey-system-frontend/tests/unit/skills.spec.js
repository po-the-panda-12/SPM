import axios from 'axios'

//To change newSkill value again when testing for a 2nd time, if not response would be 404 because skill already exist
const createNewSkill = async() => {
    const newSkill = {
        skill_name: "Testing Skill 1"
    }
    let response = await axios.post('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill', newSkill)
    console.log(response)
    return response.data.code
}

//To create an existing skill that already exists to test for 400 response
const createExistingSkill = async() => {
    const newSkill = {
        skill_name: "HTML"
    }
    let response = await axios.post('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill', newSkill)
    console.log(response)
    return response.data.code
}

//To change skill name from Communication to Communications
const updateSkill = async() => {
    const updateSkillName = {
        skill_id: "11",
        skill_name: "Communications",
    }
    let response = await axios.put('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill', updateSkillName)
    console.log(response)
    return response.data.code
}

//To change skill name from HTML to HTML, to test for 400 response
const updateSameSkill = async() => {
    const updateSameSkillName = {
        skill_id: "11",
        skill_name: "HTML",
    }
    let response = await axios.put('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill', updateSameSkillName)
    console.log(response)
    return response.data.code
}

//To delete skill name from Microsoft Powerpoint from 'Active' to 'Retired'
const deleteSkill = async() => {
    const updateSkillToRetired = {
        skill_id: "10",
        skill_status: "Retired",
    }
    let response = await axios.put('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill', updateSkillToRetired)
    console.log(response)
    return response.data.code
}

//To retreive all skills
const getAllSkills = async () => {
  const result = []
  let response = await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill')
  for (let res of response.data.data.skills) {
      result.push(res)
  }
  return result
}

// Creation of Skills
describe("createSkills.vue", () => {
    it("Should return 200 showing skill was created successfully", async () => {
        const response = await createNewSkill()
        expect(response).toEqual(200)
    })

    it('Should return 400 because skill already exists', async () => {
        const response = await createExistingSkill()
        expect(response).toEqual(400)
    })
})

// Viewing of Skills
describe("viewAllSkills.vue", () => {
  it('Should render skill name and status', async () => {
      const skillsArray = await getAllSkills()
      const skill = [{"skill_id": 1, "skill_name": "Data Analytics", "skill_status": "Retired"}, 
      {"skill_id": 2, "skill_name": "HTML", "skill_status": "Active"}]
      console.log("skills", skillsArray)
      expect(skillsArray).toContain(skill)  
  })
})

// Update of Skills
describe("updateSkills.vue", () => {
    it("Should return 200 showing skill was updated successfully", async () => {
        const response = await updateSkill()
        expect(response).toEqual(200)
    })

    it('Should return 400 because skill already exists', async () => {
        const response = await updateSameSkill()
        expect(response).toEqual(400)
    })
})

// Delete Skills
describe("deleteSkills.vue", () => {
    it("Should return 200 showing skill was deleted successfully from Active to Retired", async () => {
        const response = await deleteSkill()
        expect(response).toEqual(200)
    })
})