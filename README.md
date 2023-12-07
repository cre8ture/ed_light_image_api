
# README for Edlight Image API

## Overview
The Edlight Image API is a Node.js application designed to utilize OpenAI's capabilities for image recognition. It offers a straightforward interface for submitting images via URLs or as direct file uploads and retrieves AI-generated descriptions of these images. This project is geared towards educational applications, providing a tangible way for users to interact with and understand AI technology.

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm (usually comes with Node.js)
- Docker (optional, for Docker deployment)

### Installation

#### Via GitHub
1. **Clone the Repository**
   ```bash
   git clone https://github.com/cre8ture/ed_light_image_api.git
   cd edlight_image_api
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory with the following content:
   ```env
   PORT=3000
   MAX_TOKENS=300
   AUTHORIZATION=Your_OpenAI_API_Key
   ```

4. **Start the Server**
   ```bash
   npm start
   ```

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
   docker run -p 3000:3000 -e PORT=3000 -e MAX_TOKENS=300 -e AUTHORIZATION=Your_OpenAI_API_Key -d edlight_image_api
   ```

   Alternatively, use an environment file (`--env-file`):
   ```bash
   docker run -p 3000:3000 --env-file .env -d edlight_image_api
   ```

### Deployment to AWS
When deploying to AWS (e.g., using ECS or EKS), avoid including the `.env` file in your Docker image for security reasons. Instead, use AWS services like Secrets Manager or Parameter Store to manage environment variables securely. These services integrate with AWS's container services to inject the necessary environment variables into your containers at runtime.

### Usage

The application exposes several endpoints:

- **Home (`GET /`):** 
  Serves the index.html as a basic interface for manual server testing.

- **Health Check (`GET /health`):** 
  Returns API status as a JSON object.

- **Image URL Recognition (`POST /image_url`):**
  Processes image URLs and returns descriptions.

- **Image File Recognition (`POST /image_file`):**
  Accepts base64 encoded images for description.

## Testing
Ensure functionality with:
```bash
npm test
```

## Contributing
Contributions are always welcome. Please feel free to fork, make changes, and submit pull requests.

## source
This is a key resource for image classification and description via openai: https://platform.openai.com/docs/guides/vision?lang=node


## License
Licensed under the ISC License.
