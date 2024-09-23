import supabase from "../database/database-service"

const UserRepo = {
    async signUpNewUser({email, password, options}){
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {...options}
        })

        console.log(error)
    }
}

export default UserRepo
