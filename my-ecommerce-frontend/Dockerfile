# Dockerfile for Angular Frontend

# Use the official Node.js image from the Docker Hub
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json into the container
COPY package*.json ./

# Install the Node.js dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the Angular application
RUN npm run build --prod

# Use the NGINX image to serve the Angular application
FROM nginx:alpine
COPY --from=0 /app/dist/[your-angular-project-name] /usr/share/nginx/html

# Expose port 80 for the NGINX server
EXPOSE 80

# Run the NGINX server
CMD ["nginx", "-g", "daemon off;"]
