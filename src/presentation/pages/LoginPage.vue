<template>
    <v-container max-width="500px">
    <v-card class="elevation-12">
        <v-toolbar>
            <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-form>
            <v-text-field
                prepend-icon="person"
                name="email"
                label="Email"
                type="text"
                v-model="email"
                @keyup.enter="login(email, password)"
            />
            <v-text-field
                id="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                v-model="password"
                @keyup.enter="login(email,password)"
            />
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer/>
            <v-btn color="primary" @click="login(email, password)">Login</v-btn>
        </v-card-actions>
    </v-card>
</v-container>
</template>
<script setup>
import { client } from '@/application/client'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

async function login(email, password){
    try {
        const { user } = await client.users.signInWithEmailPassword({
            email: email,
            password
        })
        router.push('/')
    } catch (err) {
        console.log(err)
    }
    
}
</script>