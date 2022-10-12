import { Autocomplete, TextField } from "@mui/material";

export function ComboBox(props) {
    return (
      <Autocomplete
        aria-required={true}
        defaultValue={props.trailFeatures[props.defaultValue?props.defaultValue:0]}
        disablePortal
        id="comboBoxLevels"
        name = "comboBoxLevels"
        options={props.trailFeatures}
        sx={{ width: "100%" }}
        renderInput={(params) => <TextField {...params} label="Nível" />}
        onSelect={props.onSelect?props.onSelect:()=>{}}
      />
    );
  }