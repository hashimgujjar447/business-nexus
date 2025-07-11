import mongoose, { Document, Schema } from "mongoose";

export interface IUserProfile extends Document {
  user: mongoose.Types.ObjectId;
  avatar?: string;
  bio?: string;
  location?: string;
  skills?: string[];
  experience?: string;
  startupName?: string;
  startupDescription?: string;
  fundingNeed?: string;
  pitchDeckUrl?: string;
  investmentInterests?: string[];
  portfolioCompanies?: string[];
}

const UserProfileSchema: Schema<IUserProfile> = new Schema(
  {
    avatar: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    location: {
      type: String,
    },
    skills: {
      type: [String],
    },
    experience: {
      type: String,
    },
    startupName: {
      type: String,
    },
    startupDescription: {
      type: String,
    },
    fundingNeed: {
      type: String,
    },
    pitchDeckUrl: {
      type: String,
    },
    investmentInterests: {
      type: [String],
    },
    portfolioCompanies: {
      type: [String],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IUserProfile>("UserProfile", UserProfileSchema);
