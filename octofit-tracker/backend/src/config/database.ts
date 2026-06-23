/**
 * Database configuration and Mongoose helpers for OctoFit Tracker
 *
 * Provides a default database name `octofit_db`, a function to build the
 * MongoDB URI, Mongoose connection options, and a `connectMongoose` helper.
 */
import mongoose from 'mongoose'

// Database name used by default when no MONGO_URI is provided
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'octofit_db'

// Return the MongoDB connection URI. Respects MONGO_URI env var if set.
export function getMongoUri(): string {
  return process.env.MONGO_URI || `mongodb://localhost:27017/${MONGO_DB_NAME}`
}

// Mongoose connection options (kept minimal; extend as needed)
export const mongooseOptions: mongoose.ConnectOptions = {
  // Mongoose v7 sensible defaults; add options here if required
}

// Connect Mongoose using the above URI and options.
export async function connectMongoose(): Promise<void> {
  const uri = getMongoUri()
  try {
    await mongoose.connect(uri, mongooseOptions)
    console.log('Mongoose connected to', uri)
  } catch (err) {
    console.error('Mongoose connection error:', err)
    throw err
  }
}

export default { MONGO_DB_NAME, getMongoUri, mongooseOptions, connectMongoose }
