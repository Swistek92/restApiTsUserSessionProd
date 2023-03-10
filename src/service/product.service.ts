import { Omit } from "lodash";
import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import ProductModel, { ProductDocument } from "../models/product.model";
// import { databaseResponseTimeHistogram } from "../utils/metrics";

export async function createProduct(
  input: DocumentDefinition<
    Omit<ProductDocument, "createdAt" | "updatedAt" | "productId">
  >
) {
  return ProductModel.create(input);
}

export async function findProduct(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  return ProductModel.findOne(query, {}, options);
  // const timer = databaseResponseTimeHistogram.startTimer();
  // try {
  //   const result = await ProductModel.findOne(query, {}, options);
  //   timer({ ...metricsLabels, success: "true" });
  //   return result;
  // } catch (e) {
  //   timer({ ...metricsLabels, success: "false" });
  //   throw e;
  // }
}

export async function findAndUpdateProduct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return ProductModel.findOneAndUpdate(query, update, options);
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return ProductModel.deleteOne(query);
}
