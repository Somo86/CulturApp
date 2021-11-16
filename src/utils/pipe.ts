import categories from '../assets/json/categories.json';

type categoryType = {
  label: string;
  icon: string;
  id: number;
};

export const toCategoryName = (id: number): string | null => {
  const category = categories.list.find(
    (category: categoryType) => category.id === id,
  );

  return category ? category.label : null;
};
