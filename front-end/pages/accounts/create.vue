<template>
    <div class="mt-5 container">
        <h1>Account Create Page</h1>
        <div class="card">
            <div class="card-header">
                <h4>Add Account
                    <NuxtLink to="/accounts" class="btn btn-danger float-end">Back</NuxtLink>
                </h4>
            </div>
            <div class="card-body">
                <div v-if="isLoading">
                    <Loading :title="isLoadingTitle" />
                </div>

                <div v-else>
                    <form @submit.prevent="saveStudent">
                        <div class="mb-3">
                            <label>Account Suffix</label>
                            <input type="text" v-model="student.suffix" class="form-control"/>
                            <span class="text-danger" v-if="this.errorList.name">{{ this.errorList.name[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label>Name</label>
                            <input type="text" v-model="student.name" class="form-control"/>
                            <span class="text-danger" v-if="this.errorList.course">{{ this.errorList.course[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label>Account Service Address ID</label>

                            <div class="dropdown">
                            <button
                                class="btn btn-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {{ this.student.serviceaddress_id }}
                            </button>
                            <ul class="dropdown-menu">
                                <li v-for="add in add_list"><a class="dropdown-item" @click="this.updateServiceAdd(add)">{{ add }}</a></li>
                            </ul>
                        </div>
                        
                        </div>
                        <div class="mb-3">
                            <label>Street</label>
                            <input type="text" v-model="service_add.streetname" class="form-control"/>
                            <span class="text-danger" v-if="this.errorList.email">{{ this.errorList.email[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label>City</label>
                            <input type="text" v-model="service_add.city" class="form-control"/>
                            <span class="text-danger" v-if="this.errorList.email">{{ this.errorList.email[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label>State</label>
                            <input type="text" v-model="service_add.state" class="form-control"/>
                            <span class="text-danger" v-if="this.errorList.email">{{ this.errorList.email[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label>Zip</label>
                            <input type="text" v-model="service_add.zip" class="form-control"/>
                            <span class="text-danger" v-if="this.errorList.email">{{ this.errorList.email[0] }}</span>
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
            student: {
                serviceaddress_id: '' ,
                suffix: '' ,
                name: ''
            },
            service_add: {
                streetname: '',
                city: '',
                state: '',
                zip: ''
            },
            add_list: [],
            isLoading: false,
            isLoadingTitle: "Loading...",
            errorList: {}
        }
    },
    mounted() {
        this.getIdList();
    },
    methods: {
        saveStudent() {
            this.isLoading = true;
            this.isLoadingTitle = "Saving";
            // alert('saving student...')

            this.student.insertFields = "serviceaddress_id, suffix, name";
            this.student.insertValues = `'${this.student.serviceaddress_id}', '${this.student.suffix}', '${this.student.name}'`;

            this.service_add.insertFields = "streetname, city, state, zip";
            this.service_add.insertValues = `'${this.service_add.streetname}', '${this.service_add.city}', '${this.service_add.state}', '${this.service_add.state}'`;

            var myThis = this;

            axios.post(`https://jsjdf7f5di.execute-api.us-east-1.amazonaws.com/todos/acc_serviceaddress`,this.service_add).then(res => {

            console.log(res, 'res');

            this.service_add.streetname = '';
            this.service_add.city = '';
            this.service_add.state = '';
            this.service_add.zip = '';

            axios.post(`https://jsjdf7f5di.execute-api.us-east-1.amazonaws.com/todos/acc_account`,this.student).then(res => {

                console.log(res, 'res');

                this.student.serviceaddress_id = '';
                this.student.suffix = '';
                this.student.name = '';

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

        },

        getIdList(){

            axios.get(`https://jsjdf7f5di.execute-api.us-east-1.amazonaws.com/todos/list/acc_serviceaddress`).then(res => {
                
                let adds = res.data;

                for(let i = 0; i < adds.length; i++){
                    this.add_list.push(adds[i].id);
                }

                console.log(this.add_list);

            });

            },

            updateServiceAdd(serviceaddress_id){

            axios.get(`https://jsjdf7f5di.execute-api.us-east-1.amazonaws.com/todos/acc_serviceaddress/${serviceaddress_id}`).then(res => {
                                this.service_add = res.data[0];
                                this.student.serviceaddress_id = serviceaddress_id; 
            });

        },
    }
}

</script>


<style>

</style>