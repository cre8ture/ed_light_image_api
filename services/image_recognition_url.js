// const OpenAI = require('openai');
// require('dotenv').config();

// const secretKey = process.env.OPENAI_API_KEY

// const openai = new OpenAI({ apiKey: secretKey });

// async function image_recognition_url() {
//   const response = await openai.chat.completions.create({
//     model: 'gpt-4-vision-preview',
//     messages: [
//       {
//         role: 'user',
//         content: [
//           { type: 'text', text: 'What’s in this image?' },
//           {
//             type: 'image_url',
//             image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg',
//           },
//         ],
//       },
//     ],
//   });
//   console.log(response.choices[0]);
// }

// image_recognition_url();

// module.exports = {
//   image_recognition_url,
// };



const OpenAI = require('openai');
require('dotenv').config();

const secretKey = process.env.OPENAI_API_KEY

const openai = new OpenAI({ apiKey: secretKey });

async function image_recognition_url(image_url, max_tokens=300) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-vision-preview',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'What’s in this image?' },
          {
            type: 'image_url',
            image_url: image_url,
          },
        ],
      },
    ],
    max_tokens: max_tokens,
  });
  console.log(response.choices[0]);
  return response.choices[0].message.content;
}

// image_recognition_url();

module.exports = {
  image_recognition_url,
};


