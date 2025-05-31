import API from '@/lib/api';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Note {
  id: number;
  name: string;
}

export const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await API.get('/categories');
  
  return data;
};

export const fetchNotes = async (): Promise<Note[]> => {
  const { data } = await API.get('/notes');
  
  return data;
};


export const priceOptions = ['Under $25', '$25 - $50', '$50 - $100', 'Over $100'];
export const sizeOptions = ['5ml', '30ml', '50ml', '100ml', '200ml'];
export const conditionOptions = ['New with box', 'New without box', 'Used'];

