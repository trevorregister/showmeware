<template>
  <p>Profile</p>
  {{ profile }}
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { client }  from '@/application/client'

const profile = ref({})

async function getProfileByUserId(id) {
  profile.value = await client.profiles.getProfileByUserId(id)
}

async function newUser(){
  await client.users.signUpNewUser({
    email: 'abc@email.com',
    password: 'asdfasdf',
  })
}

async function signIn(){
  const {user, session} = await client.users.signInWithEmailPassword({
    email: 'trevorregister@gmail.com',
    password: "3sintheta"
  })
}

onMounted(() => {
  getProfileByUserId('e2c216c2-7632-4e1c-8680-c96f69ecc65a')
  signIn()
})
</script>