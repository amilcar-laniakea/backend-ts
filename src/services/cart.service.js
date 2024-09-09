import Cart from "../models/cart.model.js";
import { isValidObjectId } from "../utils/isValidObjectId.js";
import { cartErrorCodes } from "../constants/cart.constants.js";

export const getAllCarts = async (page, limit) => {
  const carts = await Cart.paginate(
    {},
    { page, limit, lean: true, populate: { path: "products.product" } }
  );

  if (carts.length === 0) throw new Error(cartErrorCodes.NOT_FOUND);

  return carts;
};

export const getCartById = async (id, populate) => {
  if (!isValidObjectId(id)) throw new Error(cartErrorCodes.INVALID_FORMAT);

  let cart;

  if (populate) {
    cart = await Cart.findById(id).populate({ path: "products.product" });
  } else {
    cart = await Cart.findById(id);
  }

  if (!cart) throw new Error(cartErrorCodes.NOT_FOUND);

  return cart;
};

export const createCart = async () => {
  const cart = new Cart();
  const cartSaved = await cart.save();

  if (!cartSaved) throw new Error(cartErrorCodes.UNEXPECTED_ERROR);

  return cartSaved;
};

export const deleteCart = async (id) => {
  if (!isValidObjectId(id)) throw new Error(cartErrorCodes.INVALID_FORMAT);

  const cart = await Cart.findByIdAndDelete(id);

  if (!cart) throw new Error(cartErrorCodes.NOT_FOUND);

  return cart;
};
