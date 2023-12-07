// const fs = require('fs');
const axios = require('axios');
const dotenv = require('dotenv');
// const path = require('path');

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

// // Check the current working directory
// console.log("Current working directory:", process.cwd());

// // Function to encode the image
// function encodeImage(imagePath) {
//   const imageBuffer = fs.readFileSync(imagePath);
//   return imageBuffer.toString('base64');
// }

// Construct the path to your image
// Adjust the path based on your directory structure
// const imagePath = path.join(process.cwd(), "/tests/images/test3.jpeg");

// Getting the base64 string
// const base64Image = encodeImage(imagePath);

const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
};

async function image_recognition_file(base64Image, max_tokens = 300) {

    const payload = {
        "model": "gpt-4-vision-preview",
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "What’s in this image?"
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": `data:image/jpeg;base64,${base64Image}`
                        }
                    }
                ]
            }
        ],
        "max_tokens": max_tokens
    };

    const resp = axios.post("https://api.openai.com/v1/chat/completions", payload, { headers: headers })
        .then(response => {
            const choices = response.data.choices;
            if (choices && choices.length > 0) {
                // Accessing the first choice's message content
                const messageContent = choices[0].message.content;

                console.log("messageContent", messageContent)
                return messageContent;
            }
        })
        .catch(error => {
            console.error("error in image file api ", error);
            return error;
        });
        return resp
}

module.exports = {
    image_recognition_file,
};