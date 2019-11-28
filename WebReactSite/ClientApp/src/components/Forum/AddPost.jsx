import React, { useState } from "react";
import { connect } from "react-redux";
import { addPostAction } from "../../store/forum/actions";
import Loading from "../Loading/Loading";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import AddTag from "./AddTag";

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
    marginLeft: "10%",
    width: "80%",
    maxWidth: "38rem"
  },
  textArea: {
    width: "90%",
    marginTop: theme.spacing(2),
    fontSize: "1.5em"
  },
  button: {
    marginLeft: "auto",
    marginTop: theme.spacing(1)
  },
  loading: {
    margin: "auto",
    width: "10%",
    marginTop: "10%"
  },
  error: {
    color: "red",
    margin: "auto",
    marginTop: "3%"
  }
}));

const AddPost = props => {
  const classes = useStyles();
  const { error, loading } = props;
  const forumId = props.location.state.id;
  const [input, setInput] = useState({
    header: "",
    description: ""
  });
  const [chipData, setChipData] = useState([]);

  const handleInput = e => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <>
      {loading ? (
        <div className={classes.loading}>
          <Loading />
        </div>
      ) : (
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
            <AddTag chipData={chipData} setChipData={setChipData} />
            <div className={classes.button}>
              <Button
                variant="contained"
                onClick={() =>
                  props.addPostAction(input.header, input.description, forumId)
                }
              >
                Add Post
              </Button>
            </div>
            {error && <p className={classes.error}>{error}</p>}
          </div>
        </form>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.ForumReducers.loading,
    error: state.ForumReducers.error
  };
};

const mapDispatchToProps = {
  addPostAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
