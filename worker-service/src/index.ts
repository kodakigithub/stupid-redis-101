import { createClient } from "redis";

const client = createClient()

async function main(){
    await client.connect()

    while(true){
        const response = await client.brpop("problems", 0)
        console.log(response);
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // send to pub sub
        console.log("done processing submission")
    }
}