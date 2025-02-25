## Setup Instructions

To get your server up and running, follow these steps:

1. **Update the `.env` file**
   - Open the `.env` file and find the following lines:
     ```
     PORT=8080
     DB_CONNECTION_STRING='<<your--mongodb--connection--string>>'
     ```
   - Replace `<<your--mongodb--connection--string>>` with your own MongoDB connection string.

2. **Install dependencies**
   - Run the following command to install all required dependencies:
     ```bash
     npm install
     ```

3. **Run the development server**
   - Start the server by running:
     ```bash
     npm run dev
     ```

4. **Your server is running!**
   - You should now be able to access your server on the specified port (default: `8080`).

---
