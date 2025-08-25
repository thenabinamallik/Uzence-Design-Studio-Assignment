import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import type { DataTableProps } from "../../types/DataTable";

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string>();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>();

  const [selected, setSelected] = useState<Set<number>>(new Set());

  const sortedData = useMemo(() => {
    if (!sortKey || !sortOrder) return data;
    const col = columns.find((c) => c.key === sortKey);
    if (!col) return data;
    const key = col.dataIndex;
    return [...data].sort((a, b) => {
      const va = a[key];
      const vb = b[key];
      if (va < vb) return sortOrder === 'asc' ? -1 : 1;
      if (va > vb) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortOrder, columns]);

  const toggleSort = (key: string) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortOrder('asc');
    } else {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }
  };

  const toggleSelect = (index: number) => {
    const newSet = new Set(selected);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setSelected(newSet);
    onRowSelect?.(Array.from(newSet).map((i) => sortedData[i]));
  };

  return (
    <div className="w-full overflow-x-auto border rounded-md">
      <table
        className="min-w-full divide-y divide-gray-200"
        aria-label="Data table"
      >
        <thead className="bg-gray-50">
          <tr>
            {selectable && <th className="p-2"></th>}
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-600 cursor-pointer select-none"
                onClick={() => col.sortable && toggleSort(col.key)}
              >
                {col.title}
                {col.sortable && sortKey === col.key && (
                  <span className="ml-1 text-xs">
                    {sortOrder === 'asc' ? '▲' : '▼'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="text-center py-6 text-gray-500"
              >
                Loading...
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="text-center py-6 text-gray-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            sortedData.map((row, idx) => (
              <tr
                key={idx}
                className={clsx(
                  'hover:bg-gray-50 transition',
                  selected.has(idx) && 'bg-blue-50'
                )}
              >
                {selectable && (
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selected.has(idx)}
                      onChange={() => toggleSelect(idx)}
                      aria-label={`Select row ${idx + 1}`}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-2 text-sm">
                    {String(row[col.dataIndex])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
