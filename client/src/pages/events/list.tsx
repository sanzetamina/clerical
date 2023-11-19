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

export const EventList: React.FC<IResourceComponentsProps> = () => {
  const { dataGridProps } = useDataGrid();

  const { data: clericData, isLoading: clericIsLoading } = useMany({
    resource: "clerics",
    ids: dataGridProps?.rows?.map((item: any) => item?.clericId) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const { data: parishionerData, isLoading: parishionerIsLoading } = useMany({
    resource: "parishioners",
    ids: dataGridProps?.rows?.map((item: any) => item?.parishionerId) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const { data: sacramentData, isLoading: sacramentIsLoading } = useMany({
    resource: "sacraments",
    ids: dataGridProps?.rows?.map((item: any) => item?.sacramentId) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const { data: locationData, isLoading: locationIsLoading } = useMany({
    resource: "locations",
    ids: dataGridProps?.rows?.map((item: any) => item?.locationId) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const { data: collectData, isLoading: collectIsLoading } = useMany({
    resource: "collects",
    ids: dataGridProps?.rows?.map((item: any) => item?.collectId) ?? [],
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
        headerName: "Fecha y Hora",
        minWidth: 250,
        renderCell: ({ row }) => {
          const dateOptions: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "short",
            year: "numeric",
          };
          const timeOptions: Intl.DateTimeFormatOptions = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          };

          const date = new Date(`${row.date}T${row.time}`);
          const formattedDate = new Intl.DateTimeFormat("es-ES", dateOptions)
            .format(date)
            .toUpperCase();
          const formattedTime = new Intl.DateTimeFormat(
            "es-ES",
            timeOptions
          ).format(date);

          return (
            <span>
              {formattedDate} · {formattedTime}h
            </span>
          );
        },
      },
      {
        field: "duration",
        flex: 1,
        headerName: "Duracion",
        minWidth: 200,
      },
      {
        field: "clericId",
        flex: 1,
        headerName: "Sacerdote Celebrante",
        minWidth: 300,
        renderCell: ({ value }) => {
          if (clericIsLoading) {
            return <>Loading...</>;
          }
          const cleric = clericData?.data?.find((item) => item.id === value);
          return cleric ? <>{`${cleric.name} ${cleric.surname}`}</> : <></>;
        },
      },
      {
        field: "sacramentId",
        flex: 1,
        headerName: "Sacramento",
        minWidth: 300,
        renderCell: function render({ value }) {
          return sacramentIsLoading ? (
            <>Loading...</>
          ) : (
            sacramentData?.data?.find((item) => item.id === value)?.name
          );
        },
      },
      {
        field: "parishionerId",
        flex: 1,
        headerName: "Intención / Persona",
        minWidth: 300,
        renderCell: function render({ value }) {
          if (parishionerIsLoading) {
            return <>Loading...</>;
          }
          const parishioner = parishionerData?.data?.find(
            (item) => item.id === value
          );
          return parishioner ? (
            <>{`${parishioner.name} ${parishioner.surname}`}</>
          ) : (
            <></>
          );
        },
      },
      {
        field: "locationId",
        flex: 1,
        headerName: "Parroquia / Ubicación",
        minWidth: 300,
        renderCell: ({ value }) => {
          if (locationIsLoading) {
            return <>Loading...</>;
          }
          const location = locationData?.data?.find(
            (item) => item.id === value
          );
          return location ? <>{location["name"]}</> : <></>;
        },
      },
      {
        field: "collectId",
        flex: 1,
        headerName: "Ofrenda y Oferente",
        minWidth: 300,
        renderCell: ({ value }) => {
          if (collectIsLoading) {
            return <>Loading...</>;
          }
          const collect = collectData?.data?.find((item) => item.id === value);
          // Assuming 'amount', 'currency', and 'offeredBy' are the properties of the collect object
          return collect ? (
            <>{`${collect.amount} ${collect.currency} - ${collect.offeredBy}`}</>
          ) : (
            <></>
          );
        },
      },
      {
        field: "actions",
        headerName: "Acciones",
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
    [
      clericData?.data,
      parishionerData?.data,
      sacramentData?.data,
      locationData?.data,
    ]
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
