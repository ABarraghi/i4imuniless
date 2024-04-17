<template>
    <div class="container mt-5">   
        <div class="card">
            <div class="card-header">
                <h4>Account Lists
                    <NuxtLink to="/accounts/create" class="btn btn-primary float-end">Add Account</NuxtLink>
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
                            <th> Account Number </th>
                            <th> Full Name </th>
                            <th> Address </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(account, index) in accounts" :key="index">
                            <td>{{ `${account.serviceaddress_id}-${account.suffix}` }}</td>
                            <td>{{ account.name }}</td>
                            <td> {{ account.service_add }}</td>
                            <td>
                                <NuxtLink :to="`/accounts/${account.id}`" class="btn btn-success btn-sm mx-2">Edit</NuxtLink>
                                <button type="button" @click="deleteStudent($event, account.id)" class="btn btn-danger btn-sm mx-2">Delete</button>
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
        name: "accounts",
        data() {
            return{
                accounts: {},
                service_adds: {},
                isLoading: true
            }
        },
        mounted() {

            this.getAccounts();
            this.testAWS();

        },
        methods: {

            getAccounts() {

                this.isLoading = true;

                axios.get(`https://jsjdf7f5di.execute-api.us-east-1.amazonaws.com/todos/list/acc_account`).then(res => {
                    // console.log(res.data.students);
                    this.isLoading = false;
                    this.accounts = res.data;
                    this.getAddresses();
                });
            },

            getAddresses() {

                axios.get(`https://jsjdf7f5di.execute-api.us-east-1.amazonaws.com/todos/list/acc_serviceaddress`).then(res => {
                    // console.log(res.data.students);
                    this.isLoading = false;
                    this.service_adds = res.data;
                    console.log(res.data);
                    for(let i = 0; i < this.accounts.length; i++){
                        axios.get(`https://jsjdf7f5di.execute-api.us-east-1.amazonaws.com/todos/acc_serviceaddress/${this.accounts[i].serviceaddress_id}`).then(res => {
                                console.log(res.data[0]);
                                this.accounts[i].service_add = `${res.data[0].streetname}, ${res.data[0].city} ${res.data[0].state} ${res.data[0].zip}`;
                            });
                     }
                });

            },

            getAddress(serviceaddress_id) {

                let service_address = "";

                axios.get(`https://jsjdf7f5di.execute-api.us-east-1.amazonaws.com/todos/acc_serviceaddress/${serviceaddress_id}`).then(res => {
                    console.log(res.data[0]);
                    service_address = `${res.data[0].streetname}, ${res.data[0].city} ${res.data[0].state} ${res.data[0].zip}`;
                    console.log(service_address);
                    return service_address;
                });
            },

            deleteStudent(event, studentId){

                if(confirm('Are you sure you want to delete this student?')){

                    event.target.innerText = "Deleting...";

                    axios.delete(`http://localhost:8000/api/students/${studentId}/delete`).then(res => {

                        event.target.innerText = "Delete";
                        this.getAccounts();
                        
                    });
                }

            }, 

            testAWS(){

                axios.get(`https://m2elsjywa7.execute-api.us-east-1.amazonaws.com/`).then(res => {

                    console.log(res);
                    $("#aws-tester").html(res.data.name);

                });

            }

        }
    }

</script>

<style>

</style>

