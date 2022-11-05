import pymysql


def lambda_handler(event, context):
    endpoint = 'is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'is212g9t2#'
    database_name = 'is212g9t2_db'
    
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    cursor = connection.cursor()
    
    query = "insert into course_skill (course_id, skill_id) VALUES (%s, %s)" 
        
    if event['course'] and event['skill']:      
        val = (event['course'], event['skill'])
        
        try:
            cursor.execute(query, val)
            connection.commit()
        
        except:
            return {
                "code": 500,
                "message": "An error occurred."
            }

        if cursor.rowcount:
            return {
                        "code": 200,
                        "message": "Skill assigned to Course successfully."
                }

    return {
        "code": 404,
        "message": "Request failed."
    }


