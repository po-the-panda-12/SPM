import axios from 'axios'

const createJobRole = async() => {
    const newJobRole = {
        "name": "Senior Engineering"
    }
    let response = await axios.post('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role', newJobRole)
    console.log(response)
    return response.status
}

describe("Job_Role", () => {
    it("Should return 201 showing job role was created successfully", async () => {
        // const newComment = {
        //     "id": 4,
        //     "title": "Post 4"
        // }
        const response = await createJobRole()
        expect(response).toEqual(201)
    })
})