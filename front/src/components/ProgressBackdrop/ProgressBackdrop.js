import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import React from 'react';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }
}));

export default function ProgressBackdrop() {

    const classes = useStyles();
    const backdropOpen = useSelector(state => state.common.backdropOpen);
    console.log('backdropOpen :>> ', backdropOpen);
    return (
        <Backdrop className={classes.backdrop} open={backdropOpen}>
            <CircularProgress size={120} thickness={4} color="primary" />
        </Backdrop>);
}