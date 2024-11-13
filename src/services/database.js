const mongoose = require('mongoose');
const colors = require('ansi-colors');

// Connect to MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log(colors.green('[DATABASE] Database connection established successfully.'));
    } catch (error) {
        console.error(colors.red('[DATABASE] Database connection error:'), error);
        process.exit(1); // Exit the process with failure code
    }

    // Handle disconnection
    mongoose.connection.on('disconnected', () => {
        console.warn(colors.yellow('[DATABASE] Database connection lost. Attempting to reconnect...'));
        connectToDatabase(); // Attempt to reconnect on disconnection
    });

    // Handle errors after initial connection
    mongoose.connection.on('error', (error) => {
        console.error(colors.red('[DATABASE] Database error:'), error);
    });
};

module.exports = { connectToDatabase };
