<template>
    <nav class="navbar navbar-expand-lg border-bottom">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="../assets/ljps_logo.png" width="100" alt=""/>
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item px-4">
                        <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
                        <router-link to="/">Home</router-link>
                    </li>
                    <li class="nav-item px-4">
                        <!-- <a class="nav-link" href="#">Link</a> -->
                        <router-link to="/about">About</router-link>
                    </li>
                    <li class="nav-item px-4">
                        <!-- <a class="nav-link" href="#">Link</a> -->
                        <router-link to="/learningJourneys"> My Learning Journeys</router-link>
                    </li>
                    <li class="nav-item px-4">
                        <!-- <a class="nav-link" href="#">Link</a> -->
                        <router-link to="/jobroles">Job Roles</router-link>
                    </li>
                    <li class="nav-item px-4">
                        <!-- <a class="nav-link" href="#">Link</a> -->
                        <router-link to="/">Skills</router-link>
                    </li>
                    <li class="nav-item px-4">
                        <!-- <a class="nav-link" href="#">Link</a> -->
                        <router-link to="/">Courses</router-link>
                    </li>
                    <li class="nav-item px-4">
                        <!-- <a class="nav-link" href="#">Link</a> -->
                        <router-link to="/viewSkillsandCourses">View Skills and Courses</router-link>
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
            //
        };
    },
};
</script>