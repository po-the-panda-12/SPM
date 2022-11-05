import pymysql

def json(data):
    header = ["reg_id", 'course_id', 'staff_id', 'reg_status', 'completion_status']
    return dict(zip(header,data))

def lambda_handler(event, context):
    endpoint = 'is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'is212g9t2#'
    database_name = 'is212g9t2_db'
    
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    cursor = connection.cursor()
    
    query = "SELECT * FROM registration" 
    
    qlist = []
    
    if event['regId']:
        qlist.append("reg_id = " + event['regId'])
    
    if event['courseId']:
        qlist.append("course_id = '" + event['courseId'] + "'")

    if event['staffId']:
        qlist.append("staff_id =" + event['staffId'])
    
    if event['regStatus']:
        qlist.append("reg_status = '" + event['regStatus'] + "'")
    
    if event['completionStatus']:
        qlist.append("completion_status = '" + event['completionStatus'] + "'")
    
    if len(qlist):
        query += ' where ' + " and ".join(qlist)
                
    
    cursor.execute(query)

    rows = cursor.fetchall()

    if len(rows):
        return {
                    "code": 200,
                    "data": {
                        "registrations": [json(row) for row in rows]
                    }
                
            }

    return {
        "code": 404,
        "message": "No results found."
    }
