'use client';

import { flexRender } from '@tanstack/react-table';

const HistoryMobile = ({ table }) => {
  const renderProduct = row => {
    const Cell = ({ name }) => {
      const cell = row.getVisibleCells().find(x => x.column.id === name);
      return flexRender(cell.column.columnDef.cell, cell.getContext());
    };

    return (
      <div className="flex items-center gap-4 border-b border-border-primary py-4 last:border-none">
        <Cell name="image" />
        <div className="flex flex-1 flex-col gap-2">
          <Cell name="name" />
          <Cell name="price" />
          <Cell name="date" />
        </div>
      </div>
    );
  };

  return <div className="flex flex-col pb-20">{table?.getRowModel?.()?.rows?.map?.(renderProduct)}</div>;
};

export default HistoryMobile;
