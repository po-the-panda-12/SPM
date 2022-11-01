import axios from 'axios'

const getAccessRoles = async () => {
    const response = await axios.get("https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/access_role")
    return response.data.data.access_roles
}

describe("Get All Access Roles", () => {
    it("should return all access roles", async () => {
        const expectedAccessRoles = [
            {
                "role_id": 1,
                "role_name": "Admin"
            },
            {
                "role_id": 2,
                "role_name": "User"
            },
            {
                "role_id": 3,
                "role_name": "Manager"
            },
            {
                "role_id": 4,
                "role_name": "Trainer"
            }
        ]
        const accessRoles = await getAccessRoles()
        expect(accessRoles).toEqual(expectedAccessRoles)
    })
})