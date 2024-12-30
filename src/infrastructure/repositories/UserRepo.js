import supabase from "../database/database-service"

const UserRepo = {
    async signUpNewUser({email, password, options}){
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {...options}
        })
        console.log(data)
        return data
    },

    async signInWithEmailPassword({email, password}){
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        return data
    },

    async signInWithOauth({provider, options}){
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: options
        })
/*         if(error){
          throw new Error('sign in error')
        }
        let foundSession = null
        while (!foundSession) {
          const { data: session } = await supabase.auth.getSession()
          if (session === null) {
            await new Promise((resolve) => setTimeout(resolve, 500))
          }
          foundSession = true
          console.log('session', session)
        }
        //return session.user.id */
        return data
    },

    async getSession(){
        const { data } = await supabase.auth.getSession()
        return data
    },

    async getMyself(){
        const { data } = await supabase.auth.getUser()
        return data
    },

    async getUser(){
        const { data: { user }, error } = await supabase.auth.getUser()

        return user
    },

    async signOut(){
        await supabase.auth.signOut()
    },
}

export default UserRepo
