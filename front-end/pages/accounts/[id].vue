<template>
    <div class="mt-5 container">
        <h1>Edit Account Page</h1>
        <div class="card">
            <div class="card-header">
                <h4>Edit Account
                    <NuxtLink to="/accounts" class="btn btn-danger float-end">Back</NuxtLink>
                </h4>
            </div>
            <div class="card-body">
                <div v-if="isLoading">
                    <Loading :title="isLoadingTitle" />
                </div>

                <div v-else>
                    <form @submit.prevent="updateStudent">
                        <div class="mb-3">
                            <label>Name</label>
                            <input type="text" v-model="student.name" class="form-control"/>
                            <span class="text-danger" v-if="this.errorList.name">{{ this.errorList.name[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label>Course</label>
                            <input type="text" v-model="student.course" class="form-control"/>
                            <span class="text-danger" v-if="this.errorList.course">{{ this.errorList.course[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label>Email</label>
                            <input type="text" v-model="student.email" class="form-control"/>
                            <span class="text-danger" v-if="this.errorList.email">{{ this.errorList.email[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label>Phone</label>
                            <input type="text" v-model="student.phone" class="form-control"/>
                            <span class="text-danger" v-if="this.errorList.phone">{{ this.errorList.phone[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "studentEdit",
    data() {
        return {
            studentId: '',
            student: {},
            isLoading: false,
            isLoadingTitle: "Loading...",
            errorList: {}
        }
    },
    mounted() {
        this.studentId = this.$route.params.id;
        // alert(this.studentId);

        this.getStudent(this.studentId);
    },
    methods: {

        getStudent(studentId) { 

            this.isLoading = true;

            axios.get(`http://localhost:8000/api/students/${studentId}/edit`).then(res => {
                console.log(res);
                this.student = res.data.student;
                this.isLoading = false;
            });

        },

        updateStudent() {
            this.isLoading = true;
            this.isLoadingTitle = "Updating";
            // alert('saving student...')

            var myThis = this;
            axios.put(`http://localhost:8000/api/students/${this.studentId}/edit`,this.student).then(res => {

                console.log(res, 'res');
                alert(res.data.message);

                this.isLoading = false;
                this.isLoadingTitle = "Loading";

                this.errorList = {};
                
            })
            .catch(function (error) {
                console.log(error, 'errors');

                if(error.response){
                    if(error.response.status == 422){
                        myThis.errorList = error.response.data.errors;
                    }
                }

                myThis.isLoading = false;
            });
        }
    }
}

</script>


<style>

</style>