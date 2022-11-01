import axios from 'axios'

//To retreive all courses
const getAllCourses = async () => {
  const result = []
  let response = await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course')
  //loop through first 3 response
  for (let i = 0; i < 3; i++) {
    result.push(response.data.data.courses[i])
    }
    return result
}

// Viewing of Courses
describe("viewAllCourses.vue", () => {
  it('Should render course name and status', async () => {
      const coursesArray = await getAllCourses()

      const course = [
        {"course_id": "COR001", "course_name": "Systems Thinking and Design", "course_desc": "This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,", "course_status": "Retired", "course_type": "Internal", "course_category": "Core", "skills": [{"skill_id": 2, "skill_name": "HTML", "skill_status": "Active"}, {"skill_id": 7, "skill_name": "Tableau", "skill_status": "Active"}, {"skill_id": 15, "skill_name": "Presentation", "skill_status": "Active"}]}, 
        {"course_id": "COR002", "course_name": "Lean Six Sigma Green Belt Certification", "course_desc": "Apply Lean Six Sigma methodology and statistical tools such as Minitab to be used in process analytics", "course_status": "Active", "course_type": "Internal", "course_category": "Core", "skills": [{"skill_id": 1, "skill_name": "Data Analytics", "skill_status": "Retired"}, {"skill_id": 2, "skill_name": "HTML", "skill_status": "Active"}, {"skill_id": 5, "skill_name": "Java", "skill_status": "Retired"}, {"skill_id": 6, "skill_name": "SQL", "skill_status": "Active"}, {"skill_id": 19, "skill_name": "Artificial Intelligence", "skill_status": "Active"}, {"skill_id": 36, "skill_name": "Deep Learning", "skill_status": "Active"}]}, 
        {"course_id": "COR004", "course_name": "Service Excellence", "course_desc": "The programme provides the learner with the key foundations of what builds customer confidence in the service industr", "course_status": "Pending", "course_type": "Internal", "course_category": "Core", "skills": [{"skill_id": 4, "skill_name": "PHP", "skill_status": "Retired"}, {"skill_id": 5, "skill_name": "Java", "skill_status": "Retired"}]}
        ]
      
      console.log("courses", coursesArray)
      expect(coursesArray).toEqual(course)  
  })
})