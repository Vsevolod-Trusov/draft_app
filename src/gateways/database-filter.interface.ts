interface DatabaseOptions<T> {
  filter?: Partial<T>;
  relations?: Array<string>;
  sort?: {
    fieldName: string;
    direction: 'asc' | 'desc';
  };
  skip?: number;
  limit?: number;
  cascade?: boolean;
}

export { DatabaseOptions };
