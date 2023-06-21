import mongoose from 'mongoose';

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongoConnection = {
    isConnected: 0
}


export const connect = async () => {

    if (mongoConnection.isConnected) {
        return;
    }


    if (mongoose.connections.length > 0) {
        mongoConnection.isConnected = mongoose.connections[0].readyState; // we only check the first connection, there could be more but we only have one in this project

        if (mongoConnection.isConnected === 1) {
            // console.log('Usando conexión anterior');
            return;
        }

        await mongoose.disconnect(); // if there is a connection but it is not ready, we disconnect it
    }

    await mongoose.connect(process.env.MONGO_URL || ''); // and we connect to the database
    mongoConnection.isConnected = 1;
    // console.log('Conectado a MongoDB:', process.env.MONGO_URL);
}


export const disconnect = async () => {
    // if we are in development mode, we do not disconnect
    if (process.env.NODE_ENV === 'development') return;
    // if we are not connected, we do not disconnect
    if (mongoConnection.isConnected === 0) return;

    await mongoose.disconnect();
    mongoConnection.isConnected = 0;

    // console.log('Desconectado de MongoDB');
}
