import pymysql


def json(data):
    header = ["course_id", 'course_name', 'course_desc', 'course_status', 'course_type', 'course_category']
    return dict(zip(header,data))

def json2(data):
    header = ["skill_id", 'skill_name', 'skill_status']
    return dict(zip(header,data))

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
        return [json2(row) for row in rows]



def lambda_handler(event, context):
    endpoint = 'is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'is212g9t2#'
    database_name = 'is212g9t2_db'
    
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    cursor = connection.cursor()
        
    if event['course']:
        query = "SELECT * FROM course WHERE course_id = '" + event['course'] + "'"
        cursor.execute(query)
        rows = cursor.fetchall()
        
        if len(rows):
            dict = json(rows[0])
            dict["skills"] = getSkills(event['course'])
            return {
                "code": 200,
                "data": dict
            }

    return {
        "code": 404,
        "message": "Request failed."
    }
