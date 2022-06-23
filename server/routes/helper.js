import { client } from "..index.js"

export function userSignup(data){
    return client.db("password_reset_api").collection("users").insertOne({
        data
    })
}