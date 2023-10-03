FROM node:14

# Working dir
WORKDIR /usr/src/app

#Copy Package Json Files
COPY package*.json ./

# Install Files
RUN npm install

# Copy Source Files
COPY . .

# Expose the API Port
EXPOSE 3000

CMD ["node", "src/main.js"]