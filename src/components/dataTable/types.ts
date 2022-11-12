import { Component, TdHTMLAttributes, ThHTMLAttributes } from 'vue';

export type DataTableCellArgs<T = unknown> = {
  row: T;
  index: number;
  data: DataTableDataSchema[];
};

export type DataTableCellSchema<T = unknown> = {
  name?: string;
  render?: (args: DataTableCellArgs<T>) => unknown;
  attributes?: (args: DataTableCellArgs<T>) => TdHTMLAttributes;
  component?: (args: DataTableCellArgs<T>) => Component | string;
  componentAttributes?: (args: DataTableCellArgs<T>) => unknown;
};

export type DataTableHeaderSchema = {
  label?: string;
  render?: () => unknown;
  attributes?: () => ThHTMLAttributes;
  component?: () => Component | string;
  componentAttributes?: () => unknown;
};

export type DataTableDataSchema = Record<string, unknown>;
