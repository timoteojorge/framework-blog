import { useSelector } from "react-redux";
import React from 'react';
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    alert: {
        marginTop: 10
    }
}));

export default function AlertMessage() {
    const classes = useStyles();
    const open = useSelector(state => state.common.alert.open);
    const type = useSelector(state => state.common.alert.type);
    const message = useSelector(state => state.common.alert.message);
    if (!open) return null;
    if (type === 'success') {
        return (
            <Alert severity="success" className={classes.alert}>{message}</Alert>
        );
    }
    if (type === 'error') {
        return (
            <Alert severity="error" className={classes.alert}>{message}</Alert>
        );
    }
    return null;
}