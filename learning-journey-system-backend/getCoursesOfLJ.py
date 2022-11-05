import pymysql

def json(data):
    header = ["lj_id", 'lj_name', 'staff', 'role']
    return dict(zip(header,data))
    
def json2(data):
    header = ["course_id", 'course_name', 'course_desc', 'course_status', 'course_type', 'course_category']
    return dict(zip(header,data))

def getCourses(lj_id):
    endpoint = 'is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'is212g9t2#'
    database_name = 'is212g9t2_db'
    
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    cursor = connection.cursor()
    query = "SELECT course.* from learning_journey_course INNER JOIN course ON learning_journey_course.course_id = course.course_id WHERE lj_id = " + lj_id
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
        
    if event['lj']:
        query = "SELECT * FROM learning_journey WHERE lj_id = " + event['lj']
        cursor.execute(query)
        rows = cursor.fetchall()
        
        if len(rows):
            dict = json(rows[0])
            dict["courses"] = getCourses(event['lj'])
            return {
                "code": 200,
                "data": dict
            }

    return {
        "code": 404,
        "message": "Request failed."
    }
