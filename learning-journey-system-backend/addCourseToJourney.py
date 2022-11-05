import pymysql


def lambda_handler(event, context):
    endpoint = 'is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'is212g9t2#'
    database_name = 'is212g9t2_db'
    
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    cursor = connection.cursor()
    
    query = ""
        
    if event['lj'] and event['course']:
        query = "insert into learning_journey_course (lj_id, course_id) VALUES (%s, %s)" 
        val = (event['lj'], event['course'])

        try:
            cursor.execute(query, val)
            connection.commit()
            if cursor.rowcount:
                return {
                        "code": 200,
                        "message": "Course added to Learning Journey successfully."
                }

        except Exception as e:
            return {
                "code": 500,
                "message": "An error occured"
            }

    # return {
    #     "code": 404,
    #     "message": "Request failed."
    # }


