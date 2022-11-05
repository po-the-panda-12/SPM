import pymysql

def json(data):
    header = ['skill_id', 'skill_name', 'skill_status']
    return dict(zip(header,data))

def lambda_handler(event, context):
    endpoint = 'is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'is212g9t2#'
    database_name = 'is212g9t2_db'
    
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    cursor = connection.cursor()
    
    query = "SELECT * FROM skill" 
    print('event: ', event)
    qlist = []
    
    if event['id']:
        qlist.append("skill_id = " + event['id'])
    
    if event['name']:
        qlist.append("skill_name like '%" + event['name'] + "%'")

    if event['status']:
        qlist.append("skill_status = '" + event['status'] + "'")
    
    if len(qlist):
        query += ' where ' + " and ".join(qlist)
                
    
    print(cursor.execute(query))

    rows = cursor.fetchall()

    if len(rows):
        return {
                    "code": 200,
                    "data": {
                        "skills": [json(row) for row in rows]
                    }
            }

    return {
        "code": 404,
        "message": "No results found."
    }