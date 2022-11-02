import axios from 'axios'


const getAllLearningJourneys = async () => {
    const response = await axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey")
    return response.data.code
}

const getIndividualLearningJourney = async () => {
    const response = await axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey?id=2")
    console.log("here", response.data.code)
    return response.data.code
}

const createNewLearningJourney = async (mockData) => {
    const response = await axios.post('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey', mockData)
    return response.data.code
}

const deleteLearningJourney = async (lj_id) => {
    const response = await axios.delete("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey", {data: {id: lj_id}})
    return response.data.code
}

describe("Learning Journeys", () => {
    it("should return response of 200 when getting all learning journeys", async () => {
        const response = await getAllLearningJourneys()
        expect(response).toBe(200)
    })

    it("should return response of 200 when getting individual learning journey", async () => {
        const response = await getIndividualLearningJourney()
        console.log("here2", response)
        expect(response).toBe(200)
    })

    // describe("Creating and updating Learning Journeys", () => {
    //     it("should return response of 200 when creating individual learning journey", async () => {
    //         const mockData = {
    //             "name": "Mock Learning Journey",
    //             "staff_id": 3,
    //             "role": 3
    //         }
    //         const response = await createNewLearningJourney(mockData)
    //         expect(response).toBe(200)
    //     })
    //     afterAll(asycn () => {
    //         deleteLearningJourney

    //     })
    // })
})