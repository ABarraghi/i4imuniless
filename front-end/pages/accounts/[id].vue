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
                                {{ this.service_add.id }}
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
            service_add: {},
            add_list: [],
            isLoading: false,
            isLoadingTitle: "Loading...",
            errorList: {}
        }
    },
    mounted() {
        this.studentId = this.$route.params.id;

        this.getStudent(this.studentId);

        this.getIdList();
    },
    methods: {

        getStudent(studentId) { 

            this.isLoading = true;

            axios.get(`https://jsjdf7f5di.execute-api.us-east-1.amazonaws.com/todos/acc_account/${studentId}`).then(res => {
                console.log(res.data[0]);
                this.student = res.data[0];
                axios.get(`https://jsjdf7f5di.execute-api.us-east-1.amazonaws.com/todos/acc_serviceaddress/${this.student.serviceaddress_id}`).then(res => {
                                this.service_add = res.data[0];
                                
                            });
                this.isLoading = false;

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
            });

        },

        updateStudent() {
            this.isLoading = true;
            this.isLoadingTitle = "Updating";
            // alert('saving student...')

            console.log(this.student);
            console.log(this.service_add);

            var myThis = this;

            let acc_dict = {
                "serviceaddress_id": `'${this.student.serviceaddress_id}'`,
                "suffix": `'${this.student.suffix}'`,
                "name": `'${this.student.name}'`
            };

            let sid_dict = {
                "streetname": `'${this.service_add.streetname}'`,
                "city": `'${this.service_add.city}'`,
                "state": `'${this.service_add.state}'`,
                "zip": `'${this.service_add.zip}'`
            };

            for(var key in acc_dict) {
                this.student.updateColumn = key;
                this.student.updateValue = acc_dict[key];

                axios.put(`https://jsjdf7f5di.execute-api.us-east-1.amazonaws.com/todos/acc_account/${this.studentId}`, this.student).then(res => {

                console.log(res);

                // console.log(res, 'res');
                // alert(res.data.message);

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

            for(var key in sid_dict) {
                this.service_add.updateColumn = key;
                this.service_add.updateValue = sid_dict[key];

                axios.put(`https://jsjdf7f5di.execute-api.us-east-1.amazonaws.com/todos/acc_serviceaddress/${this.student.serviceaddress_id}`, this.service_add).then(res => {

                console.log(res);

                // console.log(res, 'res');
                // alert(res.data.message);

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
}

</script>


<style>

</style>