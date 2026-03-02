import express from 'express';
import {createClient} from 'redis';

const app = express()
app.use(express.json());

const client = createClient();

async function startServer(){
    try{
        await client.connect();
        console.log('Redis client connected')

        app.listen(3000);
    }
    catch(e){
        console.error("connecxtion error: ", e)
    }
}

app.post("/submit", async (req,res) => {
    const {pid, problem, code, lang} = req.body;
    
    try{
        await client.lPush("problems", JSON.stringify({pid, problem, code, lang}))
        // ideally store in a db aswell
        res.status(200).json({msg: "submitted and stored in redis queue"})
    }
    catch(e){
        console.error("error: ", e)
        res.status(400).send("failed to store in redis")
    }
})

startServer();