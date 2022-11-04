import axios from 'axios'

const getAccessRoles = async () => {
    const response = await axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/access_role")
    return response.data.code
}

describe("Get All Access Roles", () => {
    it("should return 200 after getting all access roles", async () => {
        const accessRoles = await getAccessRoles()
        expect(accessRoles).toEqual(200)
    })
})