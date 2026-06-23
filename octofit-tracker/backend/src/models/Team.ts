import mongoose, { Document, Schema } from 'mongoose'

export interface ITeam extends Document {
  name: string
  members: mongoose.Types.ObjectId[]
  totalPoints: number
  createdAt: Date
}

const TeamSchema: Schema = new Schema<ITeam>({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  totalPoints: { type: Number, default: 0 },
  createdAt: { type: Date, default: () => new Date() }
})

export default mongoose.model<ITeam>('Team', TeamSchema)
