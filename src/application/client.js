import ProfileController from "./controllers/ProfileController"

const client = {
    profiles: {
        getProfileByUserId: async (user_id) => ProfileController.getProfileByUserId(user_id)
    }
}

export default client