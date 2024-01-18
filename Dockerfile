# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose a port (e.g., 3000) to communicate with the application
EXPOSE 3001

# Define the command to start the application
CMD ["node", "app.js"]
