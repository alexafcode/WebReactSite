import React, { useState } from "react";
import { resizeImage } from "../../utils/uploadHelpers";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";

const UploadAvatar = props => {
  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
      minWidth: "100%"
    },
    media: {
      backgroundImage: `url(${props.userAvatar})`,
      height: "30vh",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      overflow: "hidden"
    },
    loader: {
      padding: theme.spacing(2)
    }
  }));
  const classes = useStyles();
  const [state, setState] = useState({
    disabled: true,
    blobImage: null,
    imageName: null
  });

  const dropFile = async image => {
    if (image[0] !== undefined) {
      const fr = new FileReader();
      fr.readAsDataURL(image[0]);
      const config = {
        file: image[0],
        maxSize: 300
      };
      setState({
        ...state,
        blobImage: await resizeImage(config),
        imageName: image[0].name
      });
    } else {
      console.error("error Upload");
    }
  };

  const uploadImage = () => {
    props.uploadUserImage(state.blobImage);
    setState({ ...state, disabled: !state.disabled });
  };

  return (
    <Grid container wrap="nowrap" spacing={2}>
      <Grid item xs={4} sm={1}>
        <div className={classes.media} />
        {state.disabled ? (
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => setState({ ...state, disabled: !state.disabled })}
          >
            Изменить
          </Button>
        ) : (
          <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => uploadImage()}
            >
              Отправить
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => setState({ ...state, disabled: !state.disabled })}
            >
              Отмена
            </Button>
          </div>
        )}
        {props.usersError && (
          <p style={{ color: "red", margin: "auto" }}>{props.errorMessage}</p>
        )}
      </Grid>
      {!state.disabled && (
        <Grid item xs={6} sm={4}>
          <div className={classes.loader}>
            <DropzoneArea
              onChange={dropFile}
              className="dropzone"
              showPreviews={true}
              showPreviewsInDropzone={false}
              maxFileSize={5000000}
              filesLimit={1}
            />
          </div>
        </Grid>
      )}
    </Grid>
  );
};

export default UploadAvatar;
