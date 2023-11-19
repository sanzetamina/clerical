import React from "react";
import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
  DateField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps, useMany } from "@refinedev/core";

export const CollectList: React.FC<IResourceComponentsProps> = () => {
  const { dataGridProps } = useDataGrid();

  const { data: clericData, isLoading: clericIsLoading } = useMany({
    resource: "clerics",
    ids: dataGridProps?.rows?.map((item: any) => item?.clericId) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "Id",
        type: "number",
        minWidth: 50,
      },
      {
        field: "date",
        flex: 1,
        headerName: "Date",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "type",
        flex: 1,
        headerName: "Type",
        minWidth: 200,
      },
      {
        field: "amount",
        flex: 1,
        headerName: "Amount",
        type: "number",
        minWidth: 200,
      },
      {
        field: "currency",
        flex: 1,
        headerName: "Currency",
        minWidth: 200,
      },
      {
        field: "offeredBy",
        flex: 1,
        headerName: "Offered By",
        minWidth: 200,
      },
      {
        field: "clericId",
        flex: 1,
        headerName: "Cleric",
        minWidth: 300,
        renderCell: function render({ value }) {
          return clericIsLoading ? (
            <>Loading...</>
          ) : (
            clericData?.data?.find((item) => item.id === value)?.name
          );
        },
      },
      {
        field: "description",
        flex: 1,
        headerName: "Description",
        minWidth: 200,
      },
      {
        field: "notes",
        flex: 1,
        headerName: "Notes",
        minWidth: 200,
      },
      {
        field: "account",
        flex: 1,
        headerName: "Account",
        minWidth: 200,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [clericData?.data]
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
