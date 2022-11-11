import { DataTableCellSchema, DataTableHeaderSchema } from '@/components';

export type UseTableArgs<T> = {
  cellMap?: DataTableCellSchema<T>[];
  headerMap?: DataTableHeaderSchema[];
};

export function useTable<T>({ headerMap, cellMap }: UseTableArgs<T>) {
  const headers = headerMap;
  const cells = cellMap as DataTableCellSchema<unknown>[];

  return {
    headers,
    cells,
  };
}
