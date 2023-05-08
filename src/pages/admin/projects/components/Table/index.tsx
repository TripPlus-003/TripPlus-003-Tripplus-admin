import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel
} from '@tanstack/react-table';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  TableContainerProps,
  Text,
  Icon
} from '@chakra-ui/react';
import { SlDrawer } from 'react-icons/sl';

export type DataTableProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  height: TableContainerProps['maxHeight'];
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
  };
};

export default function DataTable<T extends object>({
  data,
  columns,
  height,
  pagination
}: DataTableProps<T>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    pageCount: pagination?.pageCount,
    state: {
      pagination: {
        pageIndex: pagination?.page || 1,
        pageSize: pagination?.pageSize || 10
      }
    },
    manualPagination: true
  });

  return (
    <TableContainer overflowY="auto" maxHeight={height || 'auto'}>
      <Table>
        <Thead position="sticky" top={0} bgColor="white" zIndex={1}>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const meta: any = header.column.columnDef.meta;
                return (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    isNumeric={meta?.isNumeric}
                    style={{ width: `${header.column.getSize()}px` }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const meta: any = cell.column.columnDef.meta;
                  return (
                    <Td
                      key={cell.id}
                      isNumeric={meta?.isNumeric}
                      color="gray.500"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  );
                })}
              </Tr>
            ))
          ) : (
            <Tr>
              <Td
                colSpan={columns.length}
                textAlign="center"
                color="gray.300"
                py="12"
              >
                <Icon as={SlDrawer} boxSize={16} />
                <Text mt="1">No Data</Text>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
