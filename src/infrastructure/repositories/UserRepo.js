import supabase from "../database/database-service"

const UserRepo = {
    async signUpNewUser({email, password, options}){
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {...options}
        })
    },

    async signInWithEmailPassword({email, password}){
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        return data
    }
}

export default UserRepo
