import axios from 'axios'

describe("Course Skill", () => {
  it("Should return 200 showing all course skill", async () => {
    const response = await getCourseSkill()
    expect(response).toEqual(200)
  })

  it("Should return 200 showing all course skill by valid course id", async () => {
    const response = await getCourseSkillbyValidCourse()
    expect(response).toEqual(200)
  })

  it("Should return 404 showing all course skill by invalid course id", async () => {
    const response = await getCourseSkillbyInvalidCourse()
    expect(response).toEqual(404)
  })

  it("Should return 200 showing all course skill by valid skill id", async () => {
    const response = await getCourseSkillbyValidSkill()
    expect(response).toEqual(200)
  })

  it("Should return 404 showing all course skill by invalid skill id", async () => {
    const response = await getCourseSkillbyInvalidSkill()
    expect(response).toEqual(404)
  })

  it("Should return 200 showing course skill was added successfully", async () => {
    const response = await addValidCourseSkill()
    expect(response).toEqual(200)
  })

  it("Should return 500 showing course skill failed to add", async () => {
    const response = await addInvalidCourseSkill()
    expect(response).toEqual(500)
  })

  it("Should return 200 showing course skill was removed successfully", async () => {
    const response = await removeValidCourseSkill()
    expect(response).toEqual(200)
  })

  it("Should return 404 showing course skill failed to remove", async () => {
    const response = await removeInvalidCourseSkill()
    expect(response).toEqual(404)
  })

  it("Should return 200 showing all skills of a course", async () => {
    const response = await getSkillsOfCourse()
    expect(response).toEqual(200)
  })

  it("Should return 200 showing all courses of a skill", async () => {
    const response = await getCoursesOfSkill()
    expect(response).toEqual(200)
  })
})

const getCourseSkill = async () => {
    let response = await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course_skill')
    return response.data.code
}

const getCourseSkillbyValidCourse = async () => {
    let response = await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course_skill?course=COR001')
    return response.data.code
}

const getCourseSkillbyInvalidCourse = async () => {
    let response = await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course_skill?course=COR123')
    return response.data.code
}

const getCourseSkillbyValidSkill = async () => {
  let response = await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course_skill?skill=1')
  return response.data.code
}

const getCourseSkillbyInvalidSkill = async () => {
    let response = await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course_skill?skill=1000')
    return response.data.code
}

const addValidCourseSkill = async () => {
  const addCourseSkill = {
      "course": "COR001",
      "skill": 1
  }
  let response = await axios.post('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course_skill', addCourseSkill)
  return response.data.code
}

const addInvalidCourseSkill = async () => {
  const addCourseSkill = {
      "course": "COR123",
      "skill": 1
  }
  let response = await axios.post('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course_skill', addCourseSkill)
  return response.data.code
}

const removeValidCourseSkill = async () => {
  const removeCourseSkill = {
      "course": "COR001",
      "skill": 1
  }
  let response = await axios.delete('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course_skill', {data: removeCourseSkill})
  return response.data.code
}

const removeInvalidCourseSkill = async () => {
  const removeCourseSkill = {
      "course": "COR123",
      "skill": 1
  }
  let response = await axios.delete('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course_skill', {data: removeCourseSkill})
  return response.data.code
}

const getSkillsOfCourse = async () => {
  let response = await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course_skill/course?course=COR001')
  return response.data.code
}

const getCoursesOfSkill = async () => {
  let response = await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course_skill/skill?skill=1')
  return response.data.code
}