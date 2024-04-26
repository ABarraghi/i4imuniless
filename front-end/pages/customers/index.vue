<template>
    <div class="container mt-5">   
        <div class="card">
            <div class="card-header">
                <h4>Customer List
                    <NuxtLink to="/customers/create" class="btn btn-primary float-end">Add Customer</NuxtLink>
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
                            <th> Customer ID </th>
                            <th> Full Name </th>
                            <th> Address </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(customer, index) in customers" :key="index">
                            <td>{{ customer.id }}</td>
                            <td>{{ customer.companyname }}</td>
                            <td> {{ `${customer.address1}, ${customer.city} ${customer.state} ${customer.zip}`  }}</td>
                            <td>
                                <NuxtLink :to="`/customers/${customer.id}`" class="btn btn-success btn-sm mx-2">Edit</NuxtLink>
                                <button type="button" @click="deleteStudent($event, customer.id)" class="btn btn-danger btn-sm mx-2">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';


    export default{
        name: "customers",
        data() {
            return{
                customers: {},
                service_adds: {},
                isLoading: true
            }
        },
        mounted() {

            this.getCustomers();

        },
        methods: {

            getCustomers() {

                this.isLoading = true;

                axios.get(`https://jsjdf7f5di.execute-api.us-east-1.amazonaws.com/todos/list/acc_customer`).then(res => {
                    // console.log(res.data.students);
                    this.isLoading = false;
                    this.customers = res.data;
                    console.log(res.data);
                    // this.getAddresses();
                });
            },

            getAddresses() {

                axios.get(`https://jsjdf7f5di.execute-api.us-east-1.amazonaws.com/todos/list/acc_serviceaddress`).then(res => {
                    // console.log(res.data.students);
                    this.isLoading = false;
                    this.service_adds = res.data;
                    console.log(res.data);
                    for(let i = 0; i < this.customers.length; i++){
                        axios.get(`https://jsjdf7f5di.execute-api.us-east-1.amazonaws.com/todos/acc_serviceaddress/${this.customers[i].serviceaddress_id}`).then(res => {
                                console.log(res.data[0]);
                                this.customers[i].service_add = `${res.data[0].streetname}, ${res.data[0].city} ${res.data[0].state} ${res.data[0].zip}`;
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

                if(confirm('Are you sure you want to delete this customer?')){

                    event.target.innerText = "Deleting...";

                    axios.delete(`https://jsjdf7f5di.execute-api.us-east-1.amazonaws.com/todos/acc_customer/${studentId}`).then(res => {

                        event.target.innerText = "Delete";
                        this.getCustomers();
                        
                    });
                }

            }

        }
    }

</script>

<style>

</style>

