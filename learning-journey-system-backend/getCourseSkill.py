import pymysql


def json(data):
    header = ["course_id", 'skill_id']
    return dict(zip(header,data))

def lambda_handler(event, context):
    endpoint = 'is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'is212g9t2#'
    database_name = 'is212g9t2_db'
    
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    cursor = connection.cursor()
    query = "SELECT * FROM course_skill"
    
    qlist = []

    if event['course']:
        qlist.append("course_id = '" + event['course'] +"'")
    
    if event['skill']:
        qlist.append("skill_id = " + event['skill'] )
    
    if len(qlist):
        query += ' where ' + " and ".join(qlist)

    cursor.execute(query)
    rows = cursor.fetchall()
    
    if len(rows) > 0:
        
        return {
                "code": 200,
                "data":{
                    "course_skill": [json(row) for row in rows]
                }
            }

    return {
        "code": 404,
        "message": "Request failed."
    }
