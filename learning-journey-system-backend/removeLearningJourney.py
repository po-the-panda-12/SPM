import pymysql


def lambda_handler(event, context):
    endpoint = 'is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'is212g9t2#'
    database_name = 'is212g9t2_db'
    
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    cursor = connection.cursor()
    
    query1 = "SELECT * FROM learning_journey_course WHERE lj_id = %s"
    query2 = "DELETE FROM learning_journey_course WHERE lj_id = %s"
    query3 = "DELETE FROM learning_journey WHERE lj_id = %s"
        
    if event['id']:      
        val = (event['id'])

        try:
            cursor.execute(query1, val)
            connection.commit()
            if cursor.rowcount:
                cursor.execute(query2, val)
                connection.commit()
            
            cursor.execute(query3, val)
            connection.commit()
            if cursor.rowcount:
                return {
                    "code": 200,
                    "message": "Learning Journey deleted successfully."
                }

        except:
            return {
                "code": 500,
                "message": "An error occured."
            }

        if cursor.rowcount:
            return {
                        "code": 200,
                        "message": "Learning Journey removed successfully."
                }

    return {
        "code": 404,
        "message": "Request failed."
    }


