import { DataGridPro } from "@mui/x-data-grid-pro";
import type { DataGridProProps } from "@mui/x-data-grid-pro";
import type { GridRowsProp, GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import { useEffect, useState, useCallback } from "react";
import type { Retailer } from '../common/Retailer';
import { LoadRetailersPaginated } from "../common/CSVLoader";
import { columnList } from "../common/columnList";

export function MuiList() {
  const [rows, setRows] = useState<GridRowsProp>([]);

  const perPage:number = 20;

  const [columns, setColumns] = useState<GridColDef[]>( columnList );
 
  const handleOnRowsScrollEnd = useCallback<NonNullable<DataGridProProps['onRowsScrollEnd']>>(
    async (params) => {
      const currentPage:number = rows.length/perPage;
      const fetchedRows = await LoadRetailersPaginated("/app/assets/ExcelPage.csv", currentPage, perPage); //await
      setRows((prevRows) => prevRows.concat(fetchedRows));
    },
    [rows.length],
  );

  useEffect(() => {
    LoadRetailersPaginated("/app/assets/ExcelPage.csv", 1, perPage).then((data) => {
        setRows(data);
    });
  }, []);

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <h1>List of retailers</h1>
          </div>
        </header>
        <div className="max-w-[3000px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <div style={{ height: 700, width: '100%' }}>
              <DataGridPro 
                rows={rows} 
                columns={columns} 
                getRowId={(row) => row?.RowId} 
                getRowHeight={() => 'auto'} 
                onRowsScrollEnd={handleOnRowsScrollEnd}
                scrollEndThreshold={200}
              />
            </div>
          </nav>
        </div>
      </div>
    </main>
  );
}