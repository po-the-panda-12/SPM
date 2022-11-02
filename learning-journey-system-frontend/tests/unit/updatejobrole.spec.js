import axios from 'axios'

describe("Update Job Role", () => {
  it("Should return 200 showing job role was updated successfully", async () => {
      const response = await updateRole()
      expect(response).toEqual(200)
  })

  it("Should return 200 showing role skill was added successfully", async () => {
      const response = await addRoleSkill()
      expect(response).toEqual(200)
  })

  it("Should return 200 showing role skill was removed successfully", async () => {
      const response = await removeRoleSkill()
      expect(response).toEqual(200)
  })

  afterAll(async () => {
    await resetUpdate();
  })
})

const resetUpdate = async () => {
    const updatedRoleSkill = {
        "id": 1,
        "name": "Data Engineer",
        "status": "Active"
    }
    let response = await axios.put('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role', updatedRoleSkill)
    return response.data.code
}

const updateRole = async () => {
  const updatedRoleSkill = {
      "id": 1,
      "name": "Data Engineer",
      "status": "Retired"
  }
  let response = await axios.put('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role', updatedRoleSkill)
  return response.data.code
}

const addRoleSkill = async () => {
  const addRoleSkill = {
      "role": 1,
      "skill": 2
  }
  let response = await axios.post('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role_skill', addRoleSkill)
  return response.data.code
}

const removeRoleSkill = async () => {
  const removeRoleSkill = {
      "role": 1,
      "skill": 2
  }
  let response = await axios.delete('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/role_skill', {data: removeRoleSkill})
  return response.data.code
}
