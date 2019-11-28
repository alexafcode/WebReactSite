import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(0.5),
    width: "90%",
    marginTop: theme.spacing(1)
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  textField: {
    marginRight: theme.spacing(1),
    width: "85%"
  },
  fabContainer: {
    marginLeft: "auto"
  },
  fab: {
    margin: theme.spacing(2)
  }
}));

const AddTag = props => {
  const classes = useStyles();
  const { chipData, setChipData } = props;
  const [input, setInput] = useState("");

  const handleDelete = chipToDelete => () => {
    const newChips = chipData.filter(chip => chip !== chipToDelete);
    setChipData(newChips);
  };

  const addTags = () => {
    if (input) {
      const newData = [...chipData];
      newData.push(input);
      setChipData(newData);
      setInput("");
    }
  };

  return (
    <Paper className={classes.root}>
      {chipData.map((data, i) => {
        return (
          <Chip
            key={i}
            label={data}
            onDelete={handleDelete(data)}
            className={classes.chip}
          />
        );
      })}
      <TextField
        name="tag"
        value={input}
        id="standard-required"
        label="Enter Tag"
        className={classes.textField}
        margin="normal"
        onChange={e => setInput(e.target.value)}
      />
      <div className={classes.fabContainer}>
        <Tooltip title="Add Tags" aria-label="add" onClick={() => addTags()}>
          <Fab color="primary">
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
    </Paper>
  );
};

export default AddTag;
