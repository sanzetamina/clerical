import React, { useState, useRef } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { PLACES_API_KEY } from "../../constants";

const libraries: any = ["places"]; // Updated line

interface AddressAutocompleteProps {
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
}

export const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  onPlaceSelected,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: PLACES_API_KEY,
    libraries,
  });

  const [address, setAddress] = useState("");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Autocomplete
      onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
      onPlaceChanged={() => {
        if (autocompleteRef.current) {
          const place = autocompleteRef.current.getPlace();
          onPlaceSelected(place);
        }
      }}
    >
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter address"
      />
    </Autocomplete>
  );
};
