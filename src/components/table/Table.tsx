import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import clsx from 'clsx';
import { useState } from 'react';

interface TableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  sortBy: string;
}

const Table = <TData,>({ columns, data, sortBy }: TableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: sortBy, desc: true }]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,

    state: {
      sorting,
    },
    enableSortingRemoval: false,
  });

  return (
    <div className="px-4 py-1 rounded-md">
      <table className="">
        <thead className="border-b border-main-card-border ">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className={clsx(
                    'text-start text-main-primary-text whitespace-nowrap pr-4',
                    header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                  )}
                  key={header.id}
                  style={{ width: header.getSize() }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="text-center text-main-secondary-text">
                No information yet
              </td>
            </tr>
          )}
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={clsx(
                'border-b border-main-card-border last:border-b-0',
                index % 2 === 0 && '  text-main-secondary-text',
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <td className="" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
