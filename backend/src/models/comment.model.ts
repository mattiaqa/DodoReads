import mongoose from "mongoose";
import { AuctionDocument } from "./auction.model";

export interface CommentInput {
    auction: AuctionDocument['_id'];
    username: string;
    profileImage: string;
    comment: string;
}

export interface CommentDocument extends CommentInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema = new mongoose.Schema(
    {
        auction: { type: mongoose.Schema.Types.ObjectId, ref: "Auction", required: true },
        username: { type: String, required: true },
        profileImage: { type: String, required: false },
        comment: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const CommentModel = mongoose.model<CommentDocument>("Comment", commentSchema);

export default CommentModel;
