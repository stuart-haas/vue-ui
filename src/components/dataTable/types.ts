export type DataTableCellRenderArgs<Row = unknown> = {
  row: Row;
};

export type DataTableCellSchema<T = unknown> = {
  name?: string;
  render?: ({ row }: DataTableCellRenderArgs<T>) => unknown;
};

export type DataTableHeaderSchema = {
  label?: string;
  render?: () => unknown;
};

export type DataTableDataSchema = Record<string, unknown>;
