import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

// const [open, setOpen] = useState(false);
// const openText = () => setOpen(!open);
// <AddPost openText={openText} open={open}/>

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  textArea: {
    width: "80%",
    marginTop: theme.spacing(2)
  }
}));

const AddComment = (props) => {
  const { openText, open } = props;
  const classes = useStyles();
  return (
    <div>
      <Tooltip title="Add Commment" aria-label="add" onClick={() => openText()}>
        <Fab color="primary" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tooltip>
      {open && <TextareaAutosize aria-label="minimum height" rows={3} placeholder="Enter Your Comment" className={classes.textArea} />}
    </div>
  )
}
export default AddComment;
