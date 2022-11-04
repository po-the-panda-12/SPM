import axios from 'axios'

const getRegistration = async () => {
    const response = await axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/registration")
    return response.data.code
}

const getRegistrationById = async (id) => {
    const response = await axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/registration?regId="+id)
    return response.data.code
}

describe('Registration', () => {
    it("should return 200 after getting all registration", async () => {
        const registrations = await getRegistration()
        expect(registrations).toBe(200)
    })

    it("should return 200 after getting the registration with registration id 1", async () => {
        const response = await getRegistrationById(1)
        expect(response).toEqual(200)
    })
    it("should return 404 after trying to get a registration with invalid id", async () => {
        const response = await getRegistrationById(999)
        expect(response).toEqual(404)
    })
})