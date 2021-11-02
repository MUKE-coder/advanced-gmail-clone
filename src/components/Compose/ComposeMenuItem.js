import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { useAppContext } from "../../context/context";
import { TextField } from "@material-ui/core";

const ComposeMenuItem = () => {
  const [inputValue, setInputValue] = React.useState("");
  const { category, setCategory, options } = useAppContext();
  return (
    <div className="autocomplete">
      <Autocomplete
        value={category}
        onChange={(event, newValue) => setCategory(newValue)}
        inputValue={inputValue}
        onInputChange={(event, newInput) => setInputValue(newInput)}
        id="controllable-states-demo"
        options={options}
        renderInput={(params) => (
          <TextField {...params} label="Categories" variant="outlined" />
        )}
      />
    </div>
  );
};

export default ComposeMenuItem;
