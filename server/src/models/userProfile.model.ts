import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUserProfile extends Document {
  user: mongoose.Types.ObjectId;
  avatar?: string;
  bio?: string;
  location?: string;

  // Entrepreneur-specific
  skills?: string[];
  experience?: string;

  // Investor-specific
  investmentInterests?: string;

  // Shared
  portfolioCompanies?: string[];
  role: "investor" | "entrepreneur";
}

const UserProfileSchema: Schema<IUserProfile> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    avatar: { type: String },
    bio: { type: String, required: true },
    location: { type: String, required: true },

    // Entrepreneur
    skills: [String],
    experience: String,

    // Investor
    investmentInterests: String,

    portfolioCompanies: [String],

    role: {
      type: String,
      enum: ["investor", "entrepreneur"],
      required: true,
    },
  },
  { timestamps: true },
);

const UserProfile: Model<IUserProfile> = mongoose.model(
  "UserProfile",
  UserProfileSchema,
);

export default UserProfile;
