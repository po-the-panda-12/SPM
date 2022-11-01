import axios from 'axios'

const getLearningJourneyCourses = async () => {
    const response = await axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey_course")
    return response.data.code
}

const getLearningJourneyCourseById = async(id) => {
    const response = await axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey_course?lj="+id)
    return response.data.code
}

const addCourseToLearningJourney = async(courseId, learningJourneyId) => {
    const payload = {
        "course": courseId,
        "lj": learningJourneyId
    }
    const response = await axios.post("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey_course", payload)
    return response.data.code
}

const removeCourseFromLearningJourney = async(courseId, learningJourneyId) => {
    const payload = {
        "lj": learningJourneyId,
        "course": courseId,
    }
    const response = await axios.delete("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/journey_course", {data: payload})
    return response.data.code
}


describe('Learning Journey Courses', () => {
    it("Should return 200 when getting all learning journey courses", async () => {
        const expectedCode = 200
        const code = await getLearningJourneyCourses()
        expect(code).toBe(expectedCode)
    })

    it("Should return 200 when getting learning journey course with lj = 1", async () => {
        const expectedCode = 200
        const mockId = 1
        const code = await getLearningJourneyCourseById(mockId)
        expect(code).toBe(expectedCode)
    })

    describe("add course to learning journey", () => {
        it("should return 200 when adding course COR006 to lj_id 1", async () => {
            const expectedCode = 200
            const mockCourseId = "COR006"
            const mockLearningJourneyId = 1
            const code = await addCourseToLearningJourney(mockCourseId, mockLearningJourneyId)
            expect(code).toBe(expectedCode)
        })

        afterAll(async () => {
            await removeCourseFromLearningJourney("COR006", 1)
        })
    })
    
    describe("delete course from learning journey", () => {
        beforeAll(async () => {
            await addCourseToLearningJourney("COR006", 1)
        })

        it("should return 200 after deleting course COR006 from lj_id 1", async () => {
            const expectedCode = 200
            const mockCourseId = "COR006"
            const mockLearningJourneyId = 1
            const code = await removeCourseFromLearningJourney(mockCourseId, mockLearningJourneyId)
            expect(code).toBe(expectedCode)
        })
    })

})
