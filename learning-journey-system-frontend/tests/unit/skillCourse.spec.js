import axios from 'axios'

describe("Course Skill", () => {
  it("Should return 200 showing all course skill", async () => {
    const response = await getCourseSkill()
    expect(response).toEqual(200)
  })

  it("Should return 200 showing all course skill by valid course id", async () => {
    const response = await getCourseSkillbyCourse("COR001")
    expect(response).toEqual(200)
  })

  it("Should return 404 showing request failed by invalid course id", async () => {
    const response = await getCourseSkillbyCourse("COR123")
    expect(response).toEqual(404)
  })

  it("Should return 200 showing all course skill by valid skill id", async () => {
    const response = await getCourseSkillbySkill(1)
    expect(response).toEqual(200)
  })

  it("Should return 404 showing request failed by invalid skill id", async () => {
    const response = await getCourseSkillbySkill(10000)
    expect(response).toEqual(404)
  })

  it("Should return 200 showing course skill was added successfully", async () => {
    const response = await addCourseSkill("COR001", 1)
    expect(response).toEqual(200)
  })

  it("Should return 500 showing course skill failed to add", async () => {
    const response = await addCourseSkill("COR123", 1)
    expect(response).toEqual(500)
  })

  it("Should return 200 showing course skill was removed successfully", async () => {
    const response = await removeCourseSkill("COR001", 1)
    expect(response).toEqual(200)
  })

  it("Should return 404 showing course skill failed to remove", async () => {
    const response = await removeCourseSkill("COR123", 1)
    expect(response).toEqual(404)
  })

  it("Should return 200 showing all skills of a course", async () => {
    const response = await getSkillsOfCourse("COR001")
    expect(response).toEqual(200)
  })

  it("Should return 404 showing request failed by invalid course id", async () => {
    const response = await getSkillsOfCourse("COR123")
    expect(response).toEqual(404)
  })

  it("Should return 200 showing all courses of a skill", async () => {
    const response = await getCoursesOfSkill(1)
    expect(response).toEqual(200)
  })

  it("Should return 404 showing request failed for invalid skill id", async () => {
    const response = await getCoursesOfSkill(10000)
    expect(response).toEqual(404)
  })
})

const getCourseSkill = async () => {
    let response = await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course_skill')
    return response.data.code
}

const getCourseSkillbyCourse = async (course) => {
  let response = await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course_skill?course=' + course)
  return response.data.code
}

const getCourseSkillbySkill = async (skill) => {
  let response = await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course_skill?skill=' + skill)
  return response.data.code
}

const addCourseSkill = async (course, skill) => {
  const addCourseSkill = {
      "course": course,
      "skill": skill
  }
  let response = await axios.post('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course_skill', addCourseSkill)
  return response.data.code
}

const removeCourseSkill = async (course, skill) => {
  const removeCourseSkill = {
      "course": course,
      "skill": skill
  }
  let response = await axios.delete('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course_skill', {data: removeCourseSkill})
  return response.data.code
}

const getSkillsOfCourse = async (course) => {
  let response = await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course_skill/course?course=' + course)
  return response.data.code
}

const getCoursesOfSkill = async (skill) => {
  let response = await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course_skill/skill?skill=' + skill)
  return response.data.code
}