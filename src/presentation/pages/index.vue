<template>
  <p>Profile</p>
  {{ profile }}
  <v-btn @click="signOut">Logout</v-btn>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { client }  from '@/application/client'

const profile = ref({})
const router = useRouter()

async function getProfileByUserId(id) {
  profile.value = await client.profiles.getProfileByUserId(id)
}

async function signOut(){
  await client.users.signOut()
  router.push('/login')
}

onMounted(() => {
  getProfileByUserId('e2c216c2-7632-4e1c-8680-c96f69ecc65a')
})
</script>