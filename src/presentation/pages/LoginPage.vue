<template>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="login" v-model="valid">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  name="email"
                  prepend-icon="mdi-email"
                  type="email"
                  required
                />
  
                <v-text-field
                  v-model="password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  @click:append="showPassword = !showPassword"
                  required
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="primary" @click="login" :disabled="!valid">
                Login
              </v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-btn block color="error" @click="loginWithGoogle">
                <v-icon left>mdi-google</v-icon>
                Login with Google
              </v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-btn block text :to="'/create-account'">
                Create Account
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>

<script setup>
import { ref } from 'vue'
import { client } from '@/application/client'

const valid = ref(false)
const email = ref('')
const password = ref('')
const showPassword = ref(false)

const emailRules = [
    v => !!v || 'E-mail is required',
    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ]

async function login(){
    if (valid.value) {
        return await client.users.signInWithEmailPassword({
        email: email,
        password: password
        })
    }
}

async function loginWithGoogle(){
    const { user } = await client.users.signInWithOauth({
      provider: 'google',
      options: {
        scopes: ['https://www.googleapis.com/auth/calendar.events']
      }
    })
    return user
}
</script>