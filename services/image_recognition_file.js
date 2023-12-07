const axios = require('axios');
const dotenv = require('dotenv');

// This file was created by Kai Kleinbard.


dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
};

// check valid base64. Source https://stackoverflow.com/questions/6309379/how-to-check-for-a-valid-base64-encoded-string
function isValidBase64(str) {
    const regex = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
    return regex.test(str);
}

// this function recieves a base64 image and returns a description of the image
async function image_recognition_file(base64Image, max_tokens = 300) {
    if(!base64Image) return console.error("no base64 image provided")

     // Check if the string is a valid Base64 format
     if (!isValidBase64(base64Image)) {
        console.error("Invalid Base64 format");
        return;
    }


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