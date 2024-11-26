import { FilterQuery, QueryOptions } from "mongoose";
import AuctionModel, { AuctionDocument, AuctionInput } from "../models/auction.model";
import logger from "../utils/logger";

import sanitize from "mongo-sanitize";
import BookModel from "../models/book.model";

export async function createAuction(newAuction: AuctionInput): Promise<AuctionDocument | undefined> {
  try {
    const newAuctionSanitized = sanitize(newAuction);

    const auction = await AuctionModel.create(newAuctionSanitized);

    return auction.toJSON();
  } catch (e: any) {
    logger.error(e);
  }
}

export async function deleteAuction(query: FilterQuery<AuctionDocument>) {
  try {
    const sanitizedQuery = sanitize(query);
    return await AuctionModel.deleteOne(sanitizedQuery);
  } catch (e: any) {
    logger.error(e);
  }
}

export async function searchAuctionById(query: FilterQuery<AuctionDocument>, options: QueryOptions = {lean: true}) {
  try {
    const sanitizedQuery = sanitize(query);
    return await AuctionModel.findOne(sanitizedQuery, {}, options)
        .populate({
          path: "book",
          select: {"_id":0, "__v": 0}
        })
        .populate({
          path: "seller",
          select: {"email":1, "_id":1}
        });
  } catch (e:any) {
    logger.error(e);
  }
}

export async function searchAuctions(query: FilterQuery<AuctionDocument>, options: QueryOptions = {lean: true}) {
  try {
    const sanitizedQuery = sanitize(query);
    return await AuctionModel.find(sanitizedQuery, {}, options)
        .populate({
          path: "book",
          select: {"_id":0, "__v": 0}
        })
        .populate({
          path: "seller",
          select: {"email":1, "_id":1}
        });
  } catch (e:any) {
    logger.error(e);
  }
}