import React from "react";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

const FooterLink = props => {
  const { children, href } = props; //ToDo
  return (
    <Grid container justify="flex-end">
      <Grid item>
        <Link href={href} variant="body2">
          {children}
        </Link>
      </Grid>
    </Grid>
  );
};

export default FooterLink;
