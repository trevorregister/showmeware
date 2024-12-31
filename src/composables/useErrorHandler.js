class BaseError extends Error {
    constructor (message) {
    super()

    Object.setPrototypeOf(this, new.target.prototype)
    this.message = message
    Error.captureStackTrace(this)

    }
}

class HttpError extends BaseError{
    constructor(message, code){
        super(message)
        this.code = code
    }
}

import { ref } from 'vue'
import { useRouter } from 'vue-router'


export function useErrorHandler(){
    const error = ref(null)
    const hasError = ref(false)
    const router = useRouter()

    const handleError = (err) => {
        console.log(err ?? 'none')
        if (!err) return

        error.value = err
        if(err.status === 401 || err.status === 403 || err.message === 'Auth'){
            router.push('/login')
        }

        else if (err instanceof HttpError){
            switch (err.code){
                case 401 || 403:
                    router.push('/login')
                    break
                default:
                    //do something
                    console.log(err.code, err.message)
                    return
            }
        } else{
            return
        }
    }

    return {
        handleError
    }
}




