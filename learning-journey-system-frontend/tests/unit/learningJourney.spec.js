import axios from 'axios'


const getAllLearningJourneys = async () => {
    const response = await axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey")
    return response.data.code
}

const getIndividualLearningJourney = async () => {
    const response = await axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey?id=2")
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

const getLatestLJID = async () => {
    const response = await axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey")
    
    const allLearningJourneys = response.data.data.learning_journey;
    
    // iterate through all learning journeys and find the latest one
    let latestLJID = 0
    for (let i = 0; i < allLearningJourneys.length; i++) {
        if (allLearningJourneys[i].lj_id > latestLJID) {
            latestLJID = allLearningJourneys[i].lj_id
        }
    }
    console.log(latestLJID)
    return latestLJID
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

    describe("Creating Learning Journeys", () => {
        it("should return response of 200 when creating individual learning journey", async () => {
            const mockData = {
                "name": "Mock Learning Journey",
                "staff_id": 130002,
                "role": 3
            }
            const response = await createNewLearningJourney(mockData)
            expect(response).toBe(200)
        })
        afterAll(async () => {
            const latestLJID = await getLatestLJID()
            await deleteLearningJourney(latestLJID)
        })
    })

    describe("Deleting Learning Journeys", () => {
        beforeAll(async () => {
            const mockData = {
                "name": "Mock Learning Journey",
                "staff_id": 130002,
                "role": 3
            }
            await createNewLearningJourney(mockData)
        })

        it("Should return 200 after deleting the latest created learning journey", async () => {
            const latestLJID = await getLatestLJID()
            const response = await deleteLearningJourney(latestLJID)
            expect(response).toBe(200)
        })
    })
})