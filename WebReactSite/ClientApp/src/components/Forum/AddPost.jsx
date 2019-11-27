import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "80%"
  },
  inputContainer: {
    marginLeft: "10%"
  },
  textArea: {
    width: "90%",
    marginTop: theme.spacing(2),
    fontSize: "1.5em"
  },
  button: {
    marginLeft: "auto"
  }
}));

const AddPost = props => {
  const classes = useStyles();
  const forumId = props.location.state.id;
  const [input, setInput] = useState({
    header: "",
    description: ""
  });

  const handleInput = e => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <div className={classes.inputContainer}>
        <TextField
          name="header"
          required
          id="standard-required"
          label="Header Required"
          className={classes.textField}
          margin="normal"
          onChange={handleInput}
        />
        <TextareaAutosize
          name="description"
          aria-label="minimum height"
          rows={5}
          placeholder="Enter Your Post Description"
          className={classes.textArea}
          onChange={handleInput}
        />
        <div className={classes.button}>
          <Button variant="contained" onClick={() => console.log(input)}>
            Add Post
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddPost;
