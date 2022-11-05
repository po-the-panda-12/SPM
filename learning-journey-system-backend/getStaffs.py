import pymysql

def json(data):
    header = ["staff_id", 'staff_fname', 'staff_lname', 'dept', 'email', 'role']
    return dict(zip(header,data))

def json2(data):
    header = ['role_id', 'role_name']
    return dict(zip(header,data))
    
def getAccessRole(role_id, endpoint='is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com', username='admin', password='is212g9t2#', database_name='is212g9t2_db'):

    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    cursor = connection.cursor()
    query = "SELECT * from access_role WHERE role_id = " + str(role_id)
    cursor.execute(query)
    rows = cursor.fetchall()
    if len(rows):
        return json2(rows[0])

def lambda_handler(event, context):
    endpoint = 'is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'is212g9t2#'
    database_name = 'is212g9t2_db'
    
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    cursor = connection.cursor()
    
    query = "SELECT * FROM staff" 
    
    qlist = []
    
    if event['id']:
        qlist.append("staff_id = " + event['id'])
    
    if event['fname']:
        qlist.append("staff_fname like '%" + event['fname'] + "%'")
    
    if event['lname']:
        qlist.append("staff_lname like '%" + event['lname'] + "%'")
    
    if event['dept']:
        qlist.append("dept like '%" + event['dept'] + "%'")
    
    if event['email']:
        qlist.append("email like '%" + event['email'] + "%'")
        
    if event['role']:
        qlist.append("role = " + event['role'])
    
    if len(qlist):
        query += ' where ' + " and ".join(qlist)
                
    
    cursor.execute(query)

    rows = cursor.fetchall()

    if len(rows):
        dict = [json(row) for row in rows]
        for i in range(len(dict)):
            dict[i]["role"] = getAccessRole(dict[i]["role"])
        
        return {
                    "code": 200,
                    "data": {
                        "staffs": dict
                    }
                
            }

    return {
        "code": 404,
        "message": "No results found."
    }
