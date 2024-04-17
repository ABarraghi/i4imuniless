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
                            <label>Account Number</label>
                            <input type="text" v-model="this.serviceaddress_id" class="form-control"/>
                            <span class="text-danger" v-if="this.errorList.name">{{ this.errorList.name[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label>Name</label>
                            <input type="text" v-model="student.name" class="form-control"/>
                            <span class="text-danger" v-if="this.errorList.course">{{ this.errorList.course[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label>Address</label>
                            <input type="text" v-model="student.service_add" class="form-control"/>
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

            axios.get(`https://jsjdf7f5di.execute-api.us-east-1.amazonaws.com/todos/acc_account/${studentId}`).then(res => {
                console.log(res);
                this.student = res.data[0];
                axios.get(`https://jsjdf7f5di.execute-api.us-east-1.amazonaws.com/todos/acc_serviceaddress/${this.student.serviceaddress_id}`).then(res => {
                                console.log(res.data[0]);
                                this.student.service_add = `${res.data[0].streetname}, ${res.data[0].city} ${res.data[0].state} ${res.data[0].zip}`;
                            });
                this.isLoading = false;

            });

        },

        updateStudent() {
            this.isLoading = true;
            this.isLoadingTitle = "Updating";
            // alert('saving student...')

            var myThis = this;
            axios.put(`https://jsjdf7f5di.execute-api.us-east-1.amazonaws.com/todos/acc_account/${studentId}`,this.student).then(res => {

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