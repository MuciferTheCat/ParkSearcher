const { MongoClient } = require('mongodb');

module.exports = async function (context, req) {
    const parkingSessionId = req.query.id || (req.body && req.body.id);

    if (!parkingSessionId) {
        context.res = {
            status: 400,
            body: "Please provide a parking session ID."
        };
        return;
    }

    const mongoUri = process.env.MONGO_URI; // Set this in Azure Function App settings
    const client = new MongoClient(mongoUri);

    try {
        await client.connect();
        const database = client.db('parkingDB'); // Replace with your database name
        const collection = database.collection('parkings'); // Replace with your collection name

        // Retrieve the parking session details
        const parkingSession = await collection.findOne({ _id: parkingSessionId });
        if (!parkingSession) {
            context.res = {
                status: 404,
                body: "Parking session not found."
            };
            return;
        }

        // Delete the parking session
        await collection.deleteOne({ _id: parkingSessionId });

        // Return the deleted session data
        context.res = {
            status: 200,
            body: {
                message: "Parking session deleted successfully.",
                deletedSession: parkingSession
            }
        };

    } catch (error) {
        context.log.error("Error processing request:", error);
        context.res = {
            status: 500,
            body: "An error occurred while processing the request."
        };
    } finally {
        await client.close();
    }
};
