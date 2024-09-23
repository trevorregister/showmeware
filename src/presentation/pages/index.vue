<template>
  <p>Profile</p>
  {{ profile }}
</template>

<script setup>
import { ref, onMounted } from 'vue'

const profile = ref({})
const client = inject('$client')

async function getProfileByUserId(id) {
  profile.value = await client.profiles.getProfileByUserId(id)
}

async function newUser(){
  await client.users.signUpNewUser({
    email: 'abc@email.com',
    password: 'asdfasdf',
    options: {}
  })
  
  
}

onMounted(() => {
  getProfileByUserId('e2c216c2-7632-4e1c-8680-c96f69ecc65a')
})
</script>