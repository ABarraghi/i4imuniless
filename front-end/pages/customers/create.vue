<template>
    <div class="mt-5 container">
        <h1>Student Create Page</h1>
        <div class="card">
            <div class="card-header">
                <h4>Add Student
                    <NuxtLink to="/customers" class="btn btn-danger float-end">Back</NuxtLink>
                </h4>
            </div>
            <div class="card-body">
                <div v-if="isLoading">
                    <Loading :title="isLoadingTitle" />
                </div>

                <div v-else>
                    <form @submit.prevent="saveStudent">
                        <div class="mb-3">
                            <label>Full Name</label>
                            <input type="text" v-model="customer.companyname" class="form-control"/>
                            <span class="text-danger" v-if="this.errorList.name">{{ this.errorList.name[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label>Street</label>
                            <input type="text" v-model="customer.address1" class="form-control"/>
                            <span class="text-danger" v-if="this.errorList.course">{{ this.errorList.course[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label>City</label>
                            <input type="text" v-model="customer.city" class="form-control"/>
                            <span class="text-danger" v-if="this.errorList.phone">{{ this.errorList.phone[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label>State</label>
                            <input type="text" v-model="customer.state" class="form-control"/>
                            <span class="text-danger" v-if="this.errorList.phone">{{ this.errorList.phone[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label>Zip</label>
                            <input type="text" v-model="customer.zip" class="form-control"/>
                            <span class="text-danger" v-if="this.errorList.phone">{{ this.errorList.phone[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Save</button>
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
    name: "studentCreate",
    data() {
        return {
            customer: {
                companyname: '' ,
                address1: '' ,
                city: '' ,
                state: '',
                zip: '' 
            },
            isLoading: false,
            isLoadingTitle: "Loading...",
            errorList: {}
        }
    },
    methods: {
        saveStudent() {
            this.isLoading = true;
            this.isLoadingTitle = "Saving";
            // alert('saving student...')

            this.customer.insertFields = "companyname, address1, city, state, zip";
            this.customer.insertValues = `'${this.customer.companyname}', '${this.customer.address1}', '${this.customer.city}', '${this.customer.state}', '${this.customer.zip}'`;

            var myThis = this;
            axios.post(`https://jsjdf7f5di.execute-api.us-east-1.amazonaws.com/todos/acc_customer`,this.customer).then(res => {

                this.customer.companyname = '';
                this.customer.address1 = '';
                this.customer.city = '';
                this.customer.state = '';
                this.customer.zip = '';

                this.isLoading = false;
                this.isLoadingTitle = "Loading";
                
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