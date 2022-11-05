import pymysql

def json(data):
    header = ['lj_id', 'lj_name', 'staff', 'job_role']
    return dict(zip(header,data))

def json2(data):
    header = ['staff_id', 'staff_fname', 'staff_lname', 'dept', 'email', 'access_role']
    return dict(zip(header,data))

def json3(data):
    header = ['role_id', 'role_name', 'role_status']
    return dict(zip(header,data))
    
def json4(data):
    header = ["course_id", 'course_name', 'course_desc', 'course_status', 'course_type', 'course_category']
    return dict(zip(header,data))
    
def json5(data):
    header = ["skill_id", 'skill_name', 'skill_status']
    return dict(zip(header,data))
    
def json6(data):
    header = ['reg_id', 'course_id', 'staff_id', 'reg_status', 'completion_status']
    return dict(zip(header,data))
    
def getAccessRole(role_id):
    endpoint = 'is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'is212g9t2#'
    database_name = 'is212g9t2_db'
    
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    cursor = connection.cursor()
    query = "SELECT * from access_role WHERE role_id = " + str(role_id)
    cursor.execute(query)
    rows = cursor.fetchall()
    if len(rows):
        return json3(rows[0])

def getStaff(staff_id):
    endpoint = 'is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'is212g9t2#'
    database_name = 'is212g9t2_db'
    
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    cursor = connection.cursor()
    query = "SELECT * from staff WHERE staff_id = " + str(staff_id)
    cursor.execute(query)
    rows = cursor.fetchall()
    if len(rows):
        dict = json2(rows[0])
        dict["access_role"] = getAccessRole(dict["access_role"])
        return dict
    
def getRole(role_id):
    endpoint = 'is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'is212g9t2#'
    database_name = 'is212g9t2_db'
    
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    cursor = connection.cursor()
    query = "SELECT * from job_role WHERE role_id = " + str(role_id)
    cursor.execute(query)
    rows = cursor.fetchall()
    if len(rows):
        return json3(rows[0])
        
def getCourse(lj_id, staff):
    endpoint = 'is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'is212g9t2#'
    database_name = 'is212g9t2_db'
    
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    cursor = connection.cursor()
    query = "SELECT course.* from learning_journey_course inner join course on learning_journey_course.course_id = course.course_id where lj_id = " + str(lj_id)
    cursor.execute(query)
    rows = cursor.fetchall()
    if len(rows):
        
        dict = [json4(row) for row in rows]
        for i in range(len(dict)):
            dict[i]["registration"] = getRegistration(dict[i]["course_id"], staff)
            dict[i]["skills"] = getSkills(dict[i]["course_id"])
        
        return dict
        
def getRegistration(course, staff):
    endpoint = 'is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'is212g9t2#'
    database_name = 'is212g9t2_db'
    
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    if course and staff:
        cursor = connection.cursor()
        query = "SELECT * from registration WHERE course_id = '" + course + "' and staff_id = " + str(staff)
        cursor.execute(query)
        rows = cursor.fetchall()
        if len(rows):
            return json6(rows[0])
    return "null"

def getSkills(course_id):
    endpoint = 'is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'is212g9t2#'
    database_name = 'is212g9t2_db'
    
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    cursor = connection.cursor()
    query = "SELECT skill.* from course_skill inner join skill on course_skill.skill_id = skill.skill_id where course_id = '" + course_id + "'"
    cursor.execute(query)
    rows = cursor.fetchall()
    if len(rows):
        return [json5(row) for row in rows]

def lambda_handler(event, context):
    endpoint = 'is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'is212g9t2#'
    database_name = 'is212g9t2_db'
    
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    cursor = connection.cursor()
    
    query = "SELECT * FROM learning_journey" 
    
    qlist = []
    
    if event['id']:
        qlist.append("lj_id = " + event['id'])
    
    if event['name']:
        qlist.append("lj_name like '%" + event['name'] + "%'")

    if event['staff']:
            qlist.append("staff_id = '" + event['staff'] + "'")
            
    if event['role']:
        qlist.append("role = '" + event['role'] + "'")
    
    if len(qlist):
        query += ' where ' + " and ".join(qlist)
                
    
    cursor.execute(query)

    rows = cursor.fetchall()

    if len(rows):
        dict = [json(row) for row in rows]

        for i in range(len(dict)):
            dict[i]["staff"] = getStaff(dict[i]["staff"])
            dict[i]["job_role"] = getRole(dict[i]["job_role"])
            dict[i]["courses"] = getCourse(dict[i]["lj_id"], dict[i]["staff"]["staff_id"])
        
        return {
                    "code": 200,
                    "data": {
                        "learning_journey": dict
                    }
            }

    return {
        "code": 404,
        "message": "No results found."
    }
