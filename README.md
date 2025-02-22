Setup Instructions
To get your server up and running, follow these steps:

Rename .env.example to .env

Copy the .env.example file and rename it to .env.
Update the .env file

Open the .env file and find the following lines:
ini
Copy
PORT=8080
DB_CONNECTION_STRING='<<your--mongodb--connection--string>>'
Replace <<your--mongodb--connection--string>> with your own MongoDB connection string.
Install dependencies

Run the following command to install all required dependencies:
bash
Copy
npm install
Run the development server

Start the server by running:
bash
Copy
npm run dev
Your server is running!

You should now be able to access your server on the specified port (default: 8080).
