function showError(message) {
    $('#coursesTable').hide();
    $('#addCourseBtn').hide();
    $('#main-container').append("<label>"+message+"</label>");
}

// get courses
$(async() =>{
    var serviceURL = "https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/course";

    try {
        const response = await fetch(serviceURL, {method: 'GET'});
        const result = await response.json();
        if(response.status === 200) {
            var courses = result.data.courses;

            var rows = "";
            for (const course of courses) {
            eachRow ="<td>" + course.course_id + "</td>" +
                        "<td>" + course.course_name + "</td>" +
                        "<td>" + course.course_desc + "</td>";
            rows += "<tr>" + eachRow + "</tr>";

        }

        $('#coursesTable').append(rows);
        } else if (response.status === 404) {
            showError(result.message);
        } else {
            throw response.status
        }
    } catch (error) {
        showError('There is a problem retrieving course data, please try again later.<br />' + error);
    }
});

// get skills
$(async() =>{
    var serviceURL = "https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/skill";

    try {
        const response = await fetch(serviceURL, {method: 'GET'});
        const result = await response.json();
        if(response.status === 200) {
            var skills = result.data.skills;

            var rows = "";
            for (const skill of skills) {
            eachRow ="<td>" + skill.skill_id + "</td>" +
                        "<td>" + skill.skill_name + "</td>" +
                        "<td>" + skill.skill_status + "</td>";
            rows += "<tr>" + eachRow + "</tr>";

        }

        $('#skillsTable').append(rows);
        } else if (response.status === 404) {
            showError(result.message);
        } else {
            throw response.status
        }
    } catch (error) {
        showError('There is a problem retrieving skills data, please try again later.<br />' + error);
    }
});


// add skill
$('#addSkillBtn').click(function() {
    var skill_name = $('#skill').val();
    var serviceURL = "https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/skill";

    $.ajax({
        url: serviceURL,
        type: 'POST',
        data: JSON.stringify({
            "name": skill_name
        }),
        contentType: "application/json",
        success: function(result) {
            alert("Skills added successfully");
            location.reload();
        },
        error: function(result) {
            alert("There is a problem adding the skill, please try again later.");
        }
    });
});

// get roles
$(async() =>{
    var serviceURL = "https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/role";

    try {
        const response = await fetch(serviceURL, {method: 'GET'});
        const result = await response.json();
        if(response.status === 200) {
            var roles = result.data.job_roles;
            var rows = "";
            var skill_str = "";
            for (const role of roles) {
                skills = role.skills
                skill_str = "";
                if (skills) {
                    for (const skill of role.skills) {
                        skill_str += skill.skill_name + ", "
                    }
                }
                eachRow ="<td>" + role.role_id + "</td>" +
                        "<td>" + role.role_name + "</td>" +
                        "<td>" + role.role_status + "</td>" +
                        "<td>" + skill_str.replace(", $", "") + "</td>";
                rows += "<tr>" + eachRow + "</tr>";

            }

        $('#rolesTable').append(rows);
        } else if (response.status === 404) {
            showError(result.message);
        } else {
            throw response.status
        }
    } catch (error) {
        showError('There is a problem retrieving roles data, please try again later.<br />' + error);
    }
});

// update job role
$('#updateRoleBtn').click(async() => {
    let role_id = $('#role_id').val();
    let role_name = $('#role_name').val();
    let role_status = $('#role_status').val();
    let serviceURL = "https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/role";

    $.ajax({
        url: serviceURL,
        type: 'PUT',
        data: JSON.stringify({
            "id": parseInt(role_id),
            "name": role_name,
            "status": role_status
        }),
        contentType: "application/json",
        success: function(result) {
            alert("Role updated successfully");
            location.reload();
        },
        error: function(result) {
            alert("There is a problem updating the role, please try again later.");
        }
    });
});

// add skill to role
$('#addSkilltoRoleBtn').click(function() {
    let role_id = $('#role_id2').val();
    let skill_id = $('#skill_id2').val();
    let serviceURL = "https://jdvmt1fgol.execute-api.us-west-1.amazonaws.com/api/role_skill";
   
    $.ajax({
        url: serviceURL,
        type: 'POST',
        data: JSON.stringify({
            "role": parseInt(role_id),
            "skill": parseInt(skill_id)
        }),
        contentType: "application/json",
        success: function(result) {
            alert("Skill added to role updated successfully");
            location.reload();
        },
        error: function(result) {
            alert("There is a problem updating the role, please try again later.");
        }
    });
});
