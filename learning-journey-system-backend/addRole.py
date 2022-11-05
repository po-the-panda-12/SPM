import pymysql

def lambda_handler(event, context):
    endpoint = 'is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'is212g9t2#'
    database_name = 'is212g9t2_db'
    
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    cursor = connection.cursor()
    
    query = "insert into job_role (role_name, role_status) VALUES (%s, %s)" 
        
    if event['name']:      
        val = (event['name'], "Active")
        
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
                        "message": "Role added successfully."
                }

    return {
        "code": 404,
        "message": "Request failed."
    }


