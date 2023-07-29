import express from 'express'
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config();
const router = express.Router()


const config = new Configuration({
    apiKey: "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",
});

const openai = new OpenAIApi(config)

router.route('/').get((req, res) => {
    res.status(200).json({message: 'Hello from DALL-E routes',})
})

router.route('/').post(async (req, res) => {
    try {
        const {prompt} = req.body;

        console.log('Prompt:', prompt);

        const response = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        })

        console.log('Response:', response.data);

        const image = response.data.data[0].b64_json;
        
        res.status(200).json({photo: image});
    } catch (error) {
        console.error(error);
        console.log('Error Message:', error.response?.data?.error?.message);
        res.status(500).json({message: 'Something went wrong on server.'})
    }
})

export default router