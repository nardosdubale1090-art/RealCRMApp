import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  title: string;
}

const Table = <T extends { id: string }>(
  { columns, data, title }: TableProps<T>
) => {
  return (
    <div className="bg-card rounded-xl shadow-soft overflow-hidden border border-border/50">
      <div className="p-5 border-b border-border">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-secondary/50">
            <tr>
              {columns.map((col, index) => (
                <th key={index} scope="col" className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-700/20 transition-colors">
                {columns.map((col, index) => (
                  <td key={index} className="px-6 py-5 whitespace-nowrap text-sm text-text-primary">
                    {typeof col.accessor === 'function' ? col.accessor(item) : String(item[col.accessor])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;