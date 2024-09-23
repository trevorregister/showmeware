import ProfileController from "./controllers/ProfileController"
import UserController from "./controllers/UserController"

const client = {
    profiles: {
        getProfileByUserId: async (user_id) => ProfileController.getProfileByUserId(user_id)
    },
    users: {
        signUpNewUser: async ({email, password, options = {}}) => UserController.signUpNewUser({
            email: email,
            password: password,
            options: {...options}
        })
    }
}

export { client }