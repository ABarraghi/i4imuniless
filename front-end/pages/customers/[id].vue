<template>
    <div class="mt-5 container">
        <h1>Edit Customer Page</h1>
        <div class="card">
            <div class="card-header">
                <h4>Edit Customer
                    <NuxtLink to="/customers" class="btn btn-danger float-end">Back</NuxtLink>
                </h4>
            </div>
            <div class="card-body">
                <div v-if="isLoading">
                    <Loading :title="isLoadingTitle" />
                </div>

                <div v-else>
                    <form @submit.prevent="updateStudent">
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
                            <span class="text-danger" v-if="this.errorList.email">{{ this.errorList.email[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label>State</label>
                            <input type="text" v-model="customer.state" class="form-control"/>
                            <span class="text-danger" v-if="this.errorList.email">{{ this.errorList.email[0] }}</span>
                        </div>
                        <div class="mb-3">
                            <label>Zip</label>
                            <input type="text" v-model="customer.zip" class="form-control"/>
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
            customer: {},
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

            axios.get(`https://jsjdf7f5di.execute-api.us-east-1.amazonaws.com/todos/acc_customer/${studentId}`).then(res => {
                console.log(res.data[0]);
                this.customer = res.data[0];
                this.isLoading = false;

            });

        },

        updateStudent() {
            this.isLoading = true;
            this.isLoadingTitle = "Updating";

            let cus_dict = {
                "companyname": `'${this.customer.companyname}'`,
                "address1": `'${this.customer.address1}'`,
                "city": `'${this.customer.city}'`,
                "state": `'${this.customer.state}'`,
                "zip": `'${this.customer.zip}'`,
            };

            var myThis = this;

            for(var key in cus_dict) {
                this.customer.updateColumn = key;
                this.customer.updateValue = cus_dict[key];

                axios.put(`https://jsjdf7f5di.execute-api.us-east-1.amazonaws.com/todos/acc_customer/${this.studentId}`,this.customer).then(res => {

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