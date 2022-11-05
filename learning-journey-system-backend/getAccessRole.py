import pymysql


def json(data):
    header = ["role_id", 'role_name']
    return dict(zip(header,data))

def lambda_handler(event, context):
    endpoint = 'is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'is212g9t2#'
    database_name = 'is212g9t2_db'
    
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    cursor = connection.cursor()
    query = "SELECT * FROM access_role"
    qlist = []
    
    if event['id']:
        qlist.append("role_id = " + event['id'])
    
    if event['name']:
        qlist.append("role_name like '%" + event['name'] + "%'")
        
    if len(qlist):
        query += ' where ' + " and ".join(qlist)

    cursor.execute(query)
    rows = cursor.fetchall()
    if len(rows) > 0:
        return {
                "code": 200,
                "data":{
                    "access_roles": [json(row) for row in rows]
                }
            }

    return {
        "code": 404,
        "message": "No results found."
    }

