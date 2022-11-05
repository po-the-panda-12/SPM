import pymysql

def json(data):
    header = ["role_id", 'role_name', 'role_status']
    return dict(zip(header,data))
    
def json2(data):
    header = ["skill_id", 'skill_name', 'skill_status']
    return dict(zip(header,data))
    
def getSkill(role_id):
    endpoint = 'is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'is212g9t2#'
    database_name = 'is212g9t2_db'
    
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    cursor = connection.cursor()
    query = "SELECT skill.* from role_skill inner join skill on role_skill.skill_id = skill.skill_id where role_id = " + str(role_id)
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
    
    query = "SELECT * FROM job_role" 
    
    qlist = []
    
    if event['id']:
        qlist.append("role_id = " + event['id'])
    
    if event['name']:
        qlist.append("role_name like '%" + event['name'] + "%'")
    
    if event['status']:
        qlist.append("role_status = '" + event['status'] + "'")
    
    if len(qlist):
        query += ' where ' + " and ".join(qlist)
                
    
    cursor.execute(query)

    rows = cursor.fetchall()

    if len(rows):
        dict = [json(row) for row in rows]
        for i in range(len(dict)):
            dict[i]["skills"] = getSkill(dict[i]["role_id"])
            
        
        return {
                    "code": 200,
                    "data": {
                        "job_roles": dict
                    }
                
            }

    return {
        "code": 404,
        "message": "No results found."
    }
