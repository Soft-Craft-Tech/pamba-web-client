import { useAutocompleteSuggestions } from "@/hooks/useAutoCompleteSuggestions";
import ReactSelectComponent from "@/ui/Select";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useCallback, useMemo, useState } from "react";

interface Props {
  onPlaceSelect: (place: google.maps.places.Place | null) => void;
}

export const AutocompleteCustom = ({ onPlaceSelect }: Props) => {
  const places = useMapsLibrary("places");
  const [inputValue, setInputValue] = useState("");

  const { suggestions, resetSession, isLoading } =
    useAutocompleteSuggestions(inputValue);

  const handleInputChange = useCallback(
    (newValue: string) => {
      setInputValue(newValue);
    },
    []
  );

  const handleSuggestionClick = useCallback(
    async (selectedOption: { value: string; label: string }) => {
      if (!places) return;

      const suggestion = suggestions.find(
        (s) => s.placePrediction?.text.text === selectedOption.value
      );

      if (!suggestion?.placePrediction) return;

      const place = suggestion.placePrediction.toPlace();

      await place.fetchFields({
        fields: ["formattedAddress", "location", "addressComponents"],
      });

      resetSession();
      onPlaceSelect(place);

      setInputValue("");
    },
    [places, suggestions, onPlaceSelect, resetSession]
  );

  const selectOptions = useMemo(() => {
    return suggestions.map((suggestion) => ({
      value: suggestion.placePrediction?.text.text || "",
      label: suggestion.placePrediction?.text.text || "",
    }));
  }, [suggestions]);

  return (
    <div className="autocomplete-container">
      <ReactSelectComponent
        isSearchable
        inputValue={inputValue}
        placeholder="Business Location"
        closeMenuOnSelect={true}
        onInputChange={handleInputChange}
        onChange={(newValue, actionMeta) => {
          if (actionMeta.action === "select-option" && newValue) {
            handleSuggestionClick(newValue as { value: string; label: string });
          }
        }}
        options={selectOptions}
        menuIsOpen={suggestions.length > 0}
        loadingMessage={() => "Loading suggestions..."}
        isLoading={isLoading}
        noOptionsMessage={() => "No places found"}
        filterOption={null} // Use built-in filtering from Google Places
      />
    </div>
  );
};
