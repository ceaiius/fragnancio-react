import { fetchCategories } from "@/services/filters";
export const categories = await fetchCategories();

export const priceOptions = ['Under $25', '$25 - $50', '$50 - $100', 'Over $100'];
export const sizeOptions = ['XS', 'S', 'M', 'L', 'XL'];
export const conditionOptions = ['New', 'Like New', 'Used'];
export const notesOptions = ['Aquatic', 'Outdoor', 'Indoor', 'Sports', 'Fashion'];


