<template>
    <div class="container mt-5">   
        <div class="card">
            <div class="card-header">
                <h4>Student Lists
                    <NuxtLink to="/students/create" class="btn btn-primary float-end">Add Student</NuxtLink>
                </h4>
            </div>
            <div class="card-body">
                <div v-if="isLoading">
                    <Loading title="Loading..."/>
                </div>
                <div v-else>
                    <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Course</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(student, index) in students" :key="index">
                            <td>{{ student.id }}</td>
                            <td>{{ student.name }}</td>
                            <td>{{ student.course }}</td>
                            <td>{{ student.email }}</td>
                            <td>{{ student.phone }}</td>
                            <td>{{ student.created_at }}</td>
                            <td>
                                <NuxtLink :to="`/students/${student.id}`" class="btn btn-success btn-sm mx-2">Edit</NuxtLink>
                                <button type="button" @click="deleteStudent($event, student.id)" class="btn btn-danger btn-sm mx-2">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
    <div>
        <h4 id="aws-tester">Hello</h4>
    </div>  
</template>

<script>

import axios from 'axios';


    export default{
        name: "student",
        data() {
            return{
                students: {},
                isLoading: true
            }
        },
        mounted() {

            this.getStudents();
            this.testAWS();

        },
        methods: {

            getStudents() {

                this.isLoading = true;

                axios.get(`http://localhost:8000/api/students`).then(res => {
                    // console.log(res.data.students);
                    this.isLoading = false;
                    this.students = res.data.students;

                });
            },

            deleteStudent(event, studentId){

                if(confirm('Are you sure you want to delete this student?')){

                    event.target.innerText = "Deleting...";

                    axios.delete(`http://localhost:8000/api/students/${studentId}/delete`).then(res => {

                        event.target.innerText = "Delete";
                        this.getStudents();
                        
                    });
                }

            }, 

            testAWS(){

                axios.get(`https://m2elsjywa7.execute-api.us-east-1.amazonaws.com/`).then(res => {

                    console.log(res);
                    $("#aws-tester").html(res.data.name);
                    alert(`Hello ${res.data.name}`);

                });

            }

        }
    }

</script>

<style>

</style>

