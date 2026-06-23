import mongoose, { Document, Schema } from 'mongoose'

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId
  type: string
  durationMinutes?: number
  distanceKm?: number
  calories?: number
  date: Date
}

const ActivitySchema: Schema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number },
  distanceKm: { type: Number },
  calories: { type: Number },
  date: { type: Date, default: () => new Date() }
})

export default mongoose.model<IActivity>('Activity', ActivitySchema)
