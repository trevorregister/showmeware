<template>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Create Account</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="createAccount" v-model="valid">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  name="email"
                  prepend-icon="mdi-email"
                  type="email"
                  required
                ></v-text-field>
  
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  @click:append="showPassword = !showPassword"
                  required
                ></v-text-field>
  
                <v-text-field
                  v-model="confirmPassword"
                  :rules="confirmPasswordRules"
                  :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  label="Confirm Password"
                  name="confirmPassword"
                  prepend-icon="mdi-lock-check"
                  @click:append="showConfirmPassword = !showConfirmPassword"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="createAccount" :disabled="!valid">
                Create Account
              </v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-btn text :to="'/login'">
                Already have an account? Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
import { client } from '@/application/client';

const valid = ref(false)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const emailRules = [
v => !!v || 'E-mail is required',
v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]

const passwordRules = [
v => !!v || 'Password is required',
v => v.length >= 8 || 'Password must be at least 8 characters',
]

const confirmPasswordRules = computed(() => [
v => !!v || 'Please confirm your password',
v => v === password.value || 'Passwords do not match',
])

const createAccount = () => {
if (valid.value) {
    console.log('Account creation attempted', {
    email: email.value,
    password: password.value,
    })
}
}

</script>