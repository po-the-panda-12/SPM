import pymysql


def json(data):
    header = ["course_id", 'course_name', 'course_desc', 'course_status', 'course_type', 'course_category']
    return dict(zip(header,data))

def json2(data):
    header = ["skill_id", 'skill_name', 'skill_status']
    return dict(zip(header,data))
    
def getSkill(course_id):
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
    
    query = "SELECT * FROM course" 
    
    qlist = []
    
    if event['id']:
        qlist.append("course_id = '" + event['id'] + "'")
    
    if event['name']:
        qlist.append("course_name like '%" + event['name'] + "%'")
    
    if event['desc']:
        qlist.append("course_desc like '%" + event['desc'] + "%'")
    
    if event['status']:
        qlist.append("course_status = '" + event['status'] + "'")
    
    if event['type']:
        qlist.append("course_type = '" + event['type'] + "'")
        
    if event['category']:
        qlist.append("course_category = '" + event['category'] + "'")
    
    if len(qlist):
        query += ' where ' + " and ".join(qlist)
                
    
    cursor.execute(query)

    rows = cursor.fetchall()

    if len(rows):
        dict = [json(row) for row in rows]
        for i in range(len(dict)):
            dict[i]["skills"] = getSkill(dict[i]["course_id"])
        
        return {
                    "code": 200,
                    "data": {
                        "courses": dict
                    }
                
            }

    return {
        "code": 404,
        "message": "No results found."
    }
