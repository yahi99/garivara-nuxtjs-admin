<script>
import {
    required,
    numeric
} from "vuelidate/lib/validators";

/**
 * Login component
 */
import { admin_login } from '~/api/urls'
export default {
    head() {
      return {
        title: process.env.APP_NAME + ' | Login' ,
      };
    },
    data() {
        return {
            phone_no: "",
            password: "",
            submitted: false,
            authError: null,
            tryingToLogIn: false,
            isAuthError: false,
        };
    },
    created() {},
    validations: {
      phone_no: {
            required,
            numeric
        },
        password: {
            required
        },
    },
    methods: {
        // Try to log the user in with the username
        // and password they provided.
        tryToLogIn() {
          let self = this;
          this.submitted = true;
          // stop here if form is invalid
          this.$v.$touch();

          if (this.$v.$invalid) {
            return;
          } else {
            this.tryingToLogIn = true;
            // Reset the authError if it existed.
            this.authError = null;

            let config = {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            }
            let payload = {
              phone_no: self.phone_no,
              password: self.password
            }

            self.$axios.$post(admin_login, payload, config).then((res) => {
              if (res.error === true){
                this.tryingToLogIn = false;
                this.authError = res.msg;
                this.isAuthError = true;
              }
              else {
                this.tryingToLogIn = false;
                this.isAuthError = false;
                this.$cookies.set('accessToken', res.token, {
                  path: '/',
                  maxAge: 60 * 60
                })
                this.$store.commit('userinfo/updateLoggedInStatus',true);
                this.$router.push('/');
              }
            }).catch((error)=>{
              console.log(error)
            });
          }
        },
    },
    layout: 'auth'
}
</script>

<template>
<div class="row justify-content-center">
    <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card">
            <div class="card-body p-4">
                <div class="text-center w-75 m-auto">
                    <div class="auth-logo">
                        <nuxt-link to="/" class="logo logo-dark text-center">
                            <span class="logo-lg">
                                <img src="~/assets/admin/images/logo.png" alt="" height="28">
                            </span>
                        </nuxt-link>

                        <nuxt-link to="/" class="logo logo-light text-center">
                            <span class="logo-lg">
                                <img src="~/assets/admin/images/logo.png" alt="" height="28">
                            </span>
                        </nuxt-link>
                    </div>
                    <p class="text-muted mb-4 mt-3">Enter your phone no and password to access admin panel.</p>
                </div>

                <form action="#" @submit.prevent="tryToLogIn">
                    <b-alert variant="danger" class="mt-3" v-model="isAuthError" :show="100" dismissible>{{authError}}</b-alert>
                    <div class="form-group mb-3">
                        <label for="phoneNo">Phone no</label>
                        <input class="form-control" v-model="phone_no" type="number" id="phoneNo" placeholder="Enter your phone no" :class="{ 'is-invalid': submitted && $v.phone_no.$error }">
                        <div v-if="submitted && $v.phone_no.$error" class="invalid-feedback">
                            <span v-if="!$v.phone_no.required">Phone no is required.</span>
                            <span v-if="!$v.phone_no.numeric">Please enter valid phone no.</span>
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <label for="password">Password</label>
                        <div class="input-group input-group-merge">
                            <input v-model="password" type="password" id="password" class="form-control" placeholder="Enter your password" :class="{ 'is-invalid': submitted && $v.password.$error }">

                            <div class="input-group-append" data-password="false">
                                <div class="input-group-text">
                                    <span class="password-eye"></span>
                                </div>
                            </div>
                            <div v-if="submitted && !$v.password.required" class="invalid-feedback">Password is required.</div>
                        </div>
                    </div>

                    <div class="form-group mb-0 text-center">
                        <button class="btn btn-primary btn-block" type="submit"> Log In </button>
                    </div>
                </form>

            </div> <!-- end card-body -->
        </div>
        <!-- end card -->

    </div> <!-- end col -->
</div>
<!-- end row -->
</template>
