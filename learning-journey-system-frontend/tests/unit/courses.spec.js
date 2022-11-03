import axios from 'axios'

//To retreive all courses
const getAllCourses = async () => {
  const result = []
  let response = await axios.get('https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/course')
  return response.data.code;
}

// Viewing of Courses
describe("viewAllCoursesAdmin.vue", () => {
  it('Should return 200 showing courses were rendered', async () => {
      const result_code = await getAllCourses()
      expect(result_code).toEqual(200)  
  })
})

