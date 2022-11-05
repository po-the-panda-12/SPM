import pymysql
import logging
import sys

logger = logging.getLogger()
logger.setLevel(logging.INFO)



def json(data):
    header = ["lj_id", 'course_id', 'registration']
    return dict(zip(header,data))

def lambda_handler(event, context):
    endpoint = 'is212g9t2-db-sg.cbjdtipzpays.ap-southeast-1.rds.amazonaws.com'
    username = 'admin'
    password = 'is212g9t2#'
    database_name = 'is212g9t2_db'

    try:
        connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    except pymysql.MySQLError as e:
        logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
        logger.error(e)
        sys.exit()

    logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")

    cursor = connection.cursor()
    query = "SELECT * FROM learning_journey_course"
    
    qlist = []

    if event['lj']:
        qlist.append("lj_id = " + str(event['lj']))
    
    if event['course']:
        qlist.append("course_id = '" + event['course'] + "'")

    if len(qlist):
        query += ' where ' + " and ".join(qlist)

    cursor.execute(query)
    rows = cursor.fetchall()
    
    if len(rows):

        return {
                "code": 200,
                "data":{
                    "learning_journey_course": [json(row) for row in rows]
                }
            }

    return {
        "code": 404,
        "message": "Request failed."
    }
