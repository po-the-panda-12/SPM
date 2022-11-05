import pymysql


def lambda_handler(event, context):
    endpoint = 'is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'is212g9t2#'
    database_name = 'is212g9t2_db'
    
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    cursor = connection.cursor()
    
    qlist = []
    
    if 'name' in event:
        qlist.append("role_name = '" + event['name'] + "'")
        
    if 'status' in event:
        qlist.append("role_status = '" + event['status'] + "'")    
    
    if len(qlist):
        query = "update job_role SET " + ",".join(qlist) + " WHERE role_id=" +  str(event['id'])
        
        cursor.execute(query)
  
        connection.commit()

        if cursor.rowcount:
            return { 
                    "code": 200,
                    "message": "Job Role updated successfully."
                    
                }

    return {
        "code": 404,
        "message": "Request failed."
    }