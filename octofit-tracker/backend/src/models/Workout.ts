import mongoose, { Document, Schema } from 'mongoose'

export interface IWorkout extends Document {
  name: string
  description?: string
  exercises: { name: string; reps?: number; sets?: number; durationSeconds?: number }[]
  creator?: mongoose.Types.ObjectId
  createdAt: Date
}

const ExerciseSchema: Schema = new Schema({
  name: { type: String, required: true },
  reps: Number,
  sets: Number,
  durationSeconds: Number
})

const WorkoutSchema: Schema = new Schema<IWorkout>({
  name: { type: String, required: true },
  description: { type: String },
  exercises: { type: [ExerciseSchema], default: [] },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: () => new Date() }
})

export default mongoose.model<IWorkout>('Workout', WorkoutSchema)
