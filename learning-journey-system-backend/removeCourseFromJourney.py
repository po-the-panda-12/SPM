import pymysql

def lambda_handler(event, context):
    endpoint = 'is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'is212g9t2#'
    database_name = 'is212g9t2_db'
    
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    cursor = connection.cursor()
    
    query = "DELETE FROM learning_journey_course WHERE lj_id = %s AND course_id = %s" 
        
    if event['lj'] and event['course']:      
        val = (event['lj'], event['course'])

        try:
            cursor.execute(query, val)
            connection.commit()

        except:
            return {
                "code": 500,
                "message": "An error occured."
            }

        if cursor.rowcount:
            return {
                        "code": 200,
                        "message": "Course removed from Learning Journey successfully."
                }

    return {
        "code": 404,
        "message": "Request failed."
    }