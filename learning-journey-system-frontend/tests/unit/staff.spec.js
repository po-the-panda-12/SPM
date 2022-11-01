import axios from 'axios'

const getStaff = async () => {
    let result = [];
    const response = await axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/staff")
    for(let res of response.data.data.staffs){
        result.push(res)
    }

    return result.length
}

describe('Staff', () => {
    it("should return the number of staff ", async () => {
        const expectedLength = 143
        const numberOfStaff = await getStaff()
        expect(numberOfStaff).toBe(expectedLength)
    })
})