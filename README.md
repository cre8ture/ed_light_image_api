
# README for Edlight Image API
This was created by Kai Kleinbard.


## Overview
The Edlight Image API is a Node.js application designed to utilize OpenAI's capabilities for image recognition. It offers a straightforward interface for submitting images via URLs or as direct file uploads and retrieves AI-generated descriptions of these images using OpenAI v4 GPT4. This project is a demo geared towards educational applications, providing a tangible way for users to interact with and understand AI technology (for example identifying math homework from a image file / worksheet).


## Live Demo

The live demo of the application is available at [https://fgcfj7jj2k.us-east-1.awsapprunner.com/](https://fgcfj7jj2k.us-east-1.awsapprunner.com/). You can test the application by calling the following endpoints:

### Endpoint: /image-url

This endpoint accepts a POST request with an image URL. It returns a description of the image at the provided URL.

Here's an example of how you can test this endpoint with curl:

```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <your-token>" -d '{"image_url":"<your-image-url>"}' https://fgcfj7jj2k.us-east-1.awsapprunner.com/image_url
```

Replace `<your-image-url>` with the URL of the image you want to analyze.

### Endpoint: /image-file

This endpoint accepts a POST request with an image file. It returns a description of the provided image.

Here's an example of how you can test this endpoint with curl:

```bash
base64_image=$(base64 /path/to/your/image.jpg)
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <your-token>" -d '{"base64":"'${base64_image}'"}' https://fgcfj7jj2k.us-east-1.awsapprunner.com/image_file
```

Replace `<path-to-your-image>` with the path to the image file you want to analyze.

Please note that these are just examples. You can also use tools like Postman to test these endpoints.

Remember to replace `<your-image-url>` and `<path-to-your-image>` with the actual image URL and file path.

## Getting Started local setup

### Prerequisites
- Node.js (v16 or later)
- npm (usually comes with Node.js)
- Docker (optional, for Docker deployment)
- openAI key, obtainable here: https://platform.openai.com/overview

### Installation

1. **Please download this project from this Google Drive link**:
https://drive.google.com/drive/folders/1TVqf1pBXPz-AW_QyEsGmCNCzpvXNJge8?usp=sharing

 Or Optionally: Via GitHub  
   ```bash
   git clone https://github.com/cre8ture/ed_light_image_api.git
   cd edlight_image_api
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory with the following content. See the example `.env.example`:
   ```env
OPENAI_API_KEY=<your key here>
PORT=3000
MAX_TOKENS=300
AUTHORIZATION=<your API AUTHORIZATION here that adds authentication to your own APIs>```

4. **Start the Server**
    ```bash
   npm start```

5. **Visit the localhost**
Go to `localhost:3000` on your browser. This might change depending on what your `PORT` variable is in your `.env`

#### Via Docker
1. **Build the Docker Image**
   ```bash
   docker build -t edlight_image_api .
   ```

2. **Run the Docker Container**
   ```bash
   docker run -p 3000:3000 -d edlight_image_api
   ```
   To include environment variables, use the `-e` flag for each variable:
   ```bash
   docker run -p 3000:3000 -e PORT=3000 
   ```
   Make sure to create a `.env` file. See `.env.example`

   Alternatively, use an environment file (`--env-file`):
   ```bash
   docker run -p 3000:3000 --env-file .env -d edlight_image_api
   ```
### Deployment to AWS

#### Prerequisites
1. Signup at https://aws.amazon.com/
2. Set up AMI programmatic access and ensure it's updated using AWS CLI: https://aws.amazon.com/cli/ 

#### Docker Image Upload to Amazon ECR
1. Build your Docker image: `docker build -t your-image-name .`
2. Create a repository in Amazon ECR.
3. Authenticate Docker to your Amazon ECR registry: `aws ecr get-login-password --region your-region | docker login --username AWS --password-stdin your-ecr-repository-url`
4. Tag your image: `docker tag your-image-name:latest your-ecr-repository-url/your-image-name:latest`
5. Push your image to the ECR repository: `docker push your-ecr-repository-url/your-image-name:latest`

#### Deployment with AWS App Runner
1. Navigate to the AWS App Runner service in the AWS Management Console.
2. Click on "Create an App Runner service".
3. In the Source and deployment settings, select "Container registry" and then "Amazon ECR".
4. Select the ECR repository and image tag you pushed earlier.
5. Configure the rest of the settings as per your requirements and click on "Create & deploy".


## Testing
Ensure functionality with:
```bash
npm test
```

## Logging
Logging is done via the function `loggerMiddleWare` in `middleware/middleware.js` 

## Authentication
Authentication is done via the function `authorize` in `middleware/middleware.js`. Optionally, there is a cors middleware for additional security that has been commented out for demo purposes.

## Performance and Scaling

The Edlight Image API is designed with scalability in mind to handle increasing loads and user demands. 

### Load Balancers

I used AWS Load Balancers to distribute incoming application traffic (in the provided demo) across multiple targets. This increases the fault tolerance of the applications. The load balancer serves as a single point of contact for clients, which increases the availability of the demo.

### Increased vCPU on AWS

To further enhance the performance and scalability of the application, I have the option to increase the vCPU (Virtual Central Processing Unit) count for the services as needed. This allows the application to handle larger amounts of traffic and process requests more quickly. By increasing the vCPU count, I can easily scale up the application's processing power to meet peak demands, then scale it back down during off-peak periods to save on costs.

## Accessibility
More can be done to increase the accessibility of this demo. There is a simple accessibility button that increases the font size and changes to dark mode.

## Limitations

While the Edlight Image API is designed to be robust and scalable, there are a few limitations:

1. **Image Size:** The API currently accepts images up to a certain size. Larger images may need to be resized before they can be processed.
2. **Rate Limiting:** There may be limitations on the number of requests that can be made to the API within a certain timeframe. This is based on OpenAI's current framework.
3. **Dependency on External Services:** The API's performance and availability are partly dependent on the external services it uses, such as the image recognition service.

## Steps for Further Improvement

There are several ways the Edlight Image API could be further improved:

1. **Implement Caching:** To improve response times, a caching layer could be added to store the results of image recognition tasks. This would be particularly effective for repeated requests for the same image.
2. **Optimize Image Processing:** The image processing pipeline could be optimized to handle larger images and to process images more quickly.
3. **Enhance Error Handling:** More comprehensive error handling could be implemented to provide clearer error messages and to handle edge cases more gracefully.
4. **Add More Features:** Additional features could be added to the API, such as support for different image formats, batch processing of multiple images, and more advanced image recognition tasks.

## Contributing
Contributions are always welcome. Please feel free to fork, make changes, and submit pull requests to bakukai@gmail.com

## source
This is a key resource for image classification and description via openai: https://platform.openai.com/docs/guides/vision?lang=node


## License
Licensed under the MIT License.
