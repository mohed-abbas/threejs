import express from 'express';
import * as dotenv from "dotenv"
import {Configuration, OpenAIApi} from 'openai'


dotenv.config()
const router = express.Router()

const config = new Configuration({
    apiKey: process.env.OPENAIKEY
})

const openai = new OpenAIApi(config)


router.route('/').get(async (req, res) => {
    res.status(200).json({message: "hello from dalle"})
    // const txtTest = 'Create a simple logo for a car brand'
    // try {
    //     const dalleApi = await openai.createImage({
    //         prompt:txtTest,
    //         n:1,
    //         size: '512x512',
    //         response_format: 'b64_json'
    //     })
    //     // const img = response.data;
    //     // res.status(200).json({res})
    //     res.status(200).json({txtTest})
    // } catch (error) {
    //     if (error.response) {
    //         console.log("Avatar error status: ", error.response.status);
    //         console.log("Avatar error data: ", error.response.data);
    //       } else {
    //         console.log("Avatar error message: ", error.message);
    //       }
    //     // console.log(error)
    //     res.status(500).json({message: "something went wrong"})
    // }
})


router.route('/').post(async (req, res) => {
    try {
        const {prompt} = req.body;
        const response = await openai.createImage({
            prompt,
            n: 1,
            size:'1024x1024',
            response_format:'b64_json'
        })
        const image = response.data.data[0].b64_json;
        res.status(200).json({photo: image})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "something went wrong"})
    }
})


export default router