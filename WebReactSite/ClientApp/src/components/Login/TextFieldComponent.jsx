import React from "react";
import TextField from "@material-ui/core/TextField";

const TextFieldComponent = ({ name, label, value, change }) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      label={label}
      name={name}
      autoFocus
      value={value}
      type={name}
      onChange={e => change(e.target.value)}
    />
  );
};

export default TextFieldComponent;
