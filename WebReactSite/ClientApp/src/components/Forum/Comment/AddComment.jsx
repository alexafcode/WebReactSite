import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(2)
  },
  textArea: {
    width: "90%",
    marginTop: theme.spacing(2)
  }
}));

const AddComment = props => {
  const { openText, open } = props;
  const classes = useStyles();
  return (
    <Grid container spacing={1} wrap="nowrap">
      <Grid item xs={2} sm={1}>
        <Tooltip
          title="Add Commment"
          aria-label="add"
          onClick={() => openText()}
        >
          <Fab color="primary" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </Grid>
      {open && (
        <Grid item xs={11} sm={8}>
          <TextareaAutosize
            aria-label="minimum height"
            rows={5}
            placeholder="Enter Your Comment"
            className={classes.textArea}
            value={props.input}
            onChange={e => props.setInput(e.target.value)}
          />
          <div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              // onClick={() => }
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </div>
        </Grid>
      )}
    </Grid>
  );
};
export default AddComment;
