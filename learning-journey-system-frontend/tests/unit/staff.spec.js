import axios from 'axios'

const getStaff = async () => {
    const response = await axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/staff")
    return response.data.code
}

describe('Staff', () => {
    it("should return the number of staff ", async () => {
        const response = await getStaff()
        expect(response).toBe(200)
    })
})