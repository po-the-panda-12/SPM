<template>
    <nav class="navbar navbar-expand-lg border-bottom">
        <div class="container-fluid">
            <a class="navbar-brand">
                <img src="../../assets/ljps_logo.png" width="100" alt=""/>
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item px-4">
                        <router-link to="/home">Home</router-link>
                    </li>
                    <li class="nav-item px-4">
                        <router-link to="/learningJourneys"> My Learning Journeys</router-link>
                    </li>
                    <li v-if="currentStaffRole == 'Admin'" class="nav-item px-4">
                        <router-link to="/jobrolesadmin">Job Roles</router-link>
                    </li>
                    <li v-else class="nav-item px-4">
                        <router-link to="/jobroles">Job Roles</router-link>
                    </li>
                    <li v-if="currentStaffRole == 'Admin'" class="nav-item px-4">
                        <router-link to="/skills">Skills</router-link>
                    </li>
                    <li v-if="currentStaffRole == 'Admin'" class="nav-item px-4">
                        <router-link to="/courses">Courses</router-link>
                    </li>
                    <li class="nav-item px-4">
                        <router-link to="/viewSkillsandCourses">View Skills and Courses</router-link>
                    </li>
                    <li class="nav-item px-4">
                        <a href="#" @click="signout()">Sign Out</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
    data() {
        return {
            currentStaffRole: this.$store.state.stored_current_accessrole
        };
    },
    methods: {
        signout() {
            this.$store.commit("setStaffId", "");
            this.$store.commit("setCurrentAccessRole", "");
            this.$router.push({ name: "login" });
        },
    },
};
</script>