import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  username: string
  email: string
  passwordHash?: string
  teams: mongoose.Types.ObjectId[]
  totalPoints: number
  createdAt: Date
}

const UserSchema: Schema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  totalPoints: { type: Number, default: 0 },
  createdAt: { type: Date, default: () => new Date() }
})

export default mongoose.model<IUser>('User', UserSchema)
