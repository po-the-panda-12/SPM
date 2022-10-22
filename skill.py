import requests

class Skill():
    def __init__(self, skill_id, skill_name, skill_status):
        self.skill_id = skill_id
        self.skill_name = skill_name
        self.skill_status = skill_status
    
    #To get skill id
    def get_skill_id(self):
        return self.skill_id

    #To get skill name
    def get_skill_name(self):
        return self.skill_name

    #To get skill status
    def get_skill_status(self):
        return self.skill_status

    #To get skills 
    def getSkill(self):
        return { "skills_id":self.skill_id, "skills_name":self.skill_name, "skills_status":self.skill_status }


getSkillsURL = "https://3hcc44zf58.execute-api.ap-southeast-1.amazonaws.com/api/skill"
def getAllSkill():
    response = requests.get(getSkillsURL)
    result = response.json()
    if result["code"] == 200:
        skill_list = result["data"].get("skills")
    for element in skill_list:
        all_element = element
        print(all_element)
    # skill = Skill(element["skills_id"], element["skills_name"], element["skills_status"])
    # return skill.getSkill() 
    # Testing doing it wrongly
    # test2

print(getAllSkill())