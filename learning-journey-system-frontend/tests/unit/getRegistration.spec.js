import axios from 'axios'

const getRegistrationLength = async () => {
    const response = await axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/registration")
    return response.data.data.registrations.length
}

const getRegistrationById = async (id) => {
    const response = await axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/registration?regId="+id)
    const registrationObject = response.data.data.registrations[0]
    return registrationObject
}

describe('Registration', () => {
    it("should return the number of registration", async () => {
        const expectedLength = 379
        const numberOfRegistration = await getRegistrationLength()
        expect(numberOfRegistration).toBe(expectedLength)
    })

    it("should return the registration with registration id 1", async () => {
        const expectedRegistration = {
            "reg_id": 1,
            "course_id": "COR002",
            "staff_id": 130001,
            "reg_status": "Registered",
            "completion_status": "Completed"
        }
        const response = await getRegistrationById(1)
        expect(response).toEqual(expectedRegistration)
    })
})