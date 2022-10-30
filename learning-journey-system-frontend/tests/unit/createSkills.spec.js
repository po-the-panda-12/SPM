import axios from 'axios'

//To change newSkill value again when testing for a 2nd time, if not response would be 404 because skill already exist
const createNewSkill = async() => {
    const newSkill = {
        "name": "Testing Skill 1"
    }
    let response = await axios.post('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill', newSkill)
    console.log(response)
    return response.status
}

const createExistingSkill = async() => {
    const newSkill = {
        "name": "HTML"
    }
    let response = await axios.post('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill', newSkill)
    console.log(response)
    return response.status
}

describe("createSkills.vue", () => {

    it("Should return 200 showing skill was created successfully", async () => {
        const response = await createNewSkill()
        expect(response).toEqual(200)
    })

    it('Should return 404 because skill already exists', async () => {
        const response = await createExistingSkill()
        expect(response).toEqual(404)
    })
})