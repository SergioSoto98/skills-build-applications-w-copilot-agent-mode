import mongoose, { Document, Schema } from 'mongoose'

export interface ILeaderboardEntry extends Document {
  subjectType: 'user' | 'team'
  subject: mongoose.Types.ObjectId
  points: number
  rank?: number
  period?: string
}

const LeaderboardSchema: Schema = new Schema<ILeaderboardEntry>({
  subjectType: { type: String, enum: ['user', 'team'], required: true },
  subject: { type: Schema.Types.ObjectId, required: true, refPath: 'subjectType' },
  points: { type: Number, default: 0 },
  rank: { type: Number },
  period: { type: String }
})

export default mongoose.model<ILeaderboardEntry>('Leaderboard', LeaderboardSchema)
