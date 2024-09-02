export interface Model<Type> {
  getAll(): Type[];
  getById(id: number): Type;
  create(data: Type): Type;
  update(id: number, data: Type): Type;
  delete(id: number): number;
};

