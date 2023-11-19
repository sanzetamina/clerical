import { Create } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps } from "@refinedev/core";
import { AddressAutocomplete } from "../../components";

export const LocationCreate: React.FC<IResourceComponentsProps> = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm();

  const handlePlaceSelected = (place: any) => {
    console.log(
      "🚀 ~ file: create.tsx:17 ~ handlePlaceSelected ~ place:",
      place
    );
  };

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("name", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.name}
          helperText={(errors as any)?.name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Name"
          name="name"
        />
        {/* <TextField
          {...register("address", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.address}
          helperText={(errors as any)?.address?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Address"
          name="address"
        /> */}
        <AddressAutocomplete onPlaceSelected={handlePlaceSelected} />
        <TextField
          {...register("coordinates", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.coordinates}
          helperText={(errors as any)?.coordinates?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Coordinates"
          name="coordinates"
        />
      </Box>
    </Create>
  );
};
