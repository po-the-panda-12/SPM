import pymysql

def lambda_handler(event, context):
    endpoint = 'is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'is212g9t2#'
    database_name = 'is212g9t2_db'
    
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    cursor = connection.cursor()
    qlist = []
    query = "update learning_journey SET lj_name = %s WHERE lj_id = %s"
    
    if event['id'] and event['name']:
        val = (event['name'], event['id'])

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
                        "message": "Learning Journey updated successfully."
                }

    return {
        "code": 404,
        "message": "Request failed."
    }