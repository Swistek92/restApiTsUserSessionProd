import { Request, Response } from "express";
import {
  CreateProductInput,
  UpdateProductInput,
} from "../schema/product.schema";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
} from "../service/product.service";
import logger from "../utils/logger";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;
  try {
    const product = await createProduct({ ...body, user: userId });
    return res.send(product);
  } catch (error) {
    return res.send("error creating product");
  }
}

export async function updateProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  // logger.info("im here");
  const productId = req.params.productId;
  const update = req.body;

  const product = await findProduct({ _id: productId });
  if (!product) {
    return res.sendStatus(404).send("cant find a product");
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403).send("thats not your product");
  }
  const updatePorduct = await findAndUpdateProduct({ _id: productId }, update, {
    new: true,
  });

  return res.send(updatePorduct);
}

export async function deleteProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;

  const product = await findProduct({ _id: productId });

  if (!product) {
    return res.sendStatus(404).send("cant find a product");
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403).send("thats not your product");
  }

  const deleteProd = await deleteProduct({ _id: productId });

  return res.sendStatus(200);
}

export async function getProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  const productId = req.params.productId;
  const product = await findProduct({ _id: productId });

  if (!product) {
    return res.sendStatus(404);
  }

  return res.send(product);
}
