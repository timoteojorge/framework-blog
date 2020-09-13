import { Button, Grid, IconButton, InputAdornment, Paper, TextField } from '@material-ui/core';
import { LockOpen, Visibility, VisibilityOff } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/lib/hooks/useSelector';
import { saveNewUser, setEmail, setInvalidEmail, setName, setPassword, setShowPassword } from '../../redux/actions/userAdd';
import './UserAdd.css';

export default function UserAdd() {
    const name = useSelector(state => state.userAdd.name);
    const email = useSelector(state => state.userAdd.email);
    const invalidEmail = useSelector(state => state.userAdd.invalidEmail);
    const password = useSelector(state => state.userAdd.password);
    const showPassword = useSelector(state => state.userAdd.showPassword);
    const dispatch = useDispatch()


    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleEmailChange = (event) => {
        const email = event.target.value;
        dispatch(setEmail(email));
        dispatch(setInvalidEmail(!validateEmail(email)))
    }

    return (
        <div>
            <Grid direction="column" container justify="center" alignItems="center">
                <Paper elevation={3} className={`UserAdd_detail-paper`}>
                    <Grid container>
                        <TextField
                            value={name}
                            onChange={(event) => dispatch(setName(event.target.value))}
                            label="Nome"
                            variant="outlined"
                            autoComplete="off"
                            className="UserAdd_form-input" />
                        <TextField
                            value={email}
                            error={invalidEmail}
                            onChange={handleEmailChange}
                            helperText={invalidEmail ? "Email inválido." : ""}
                            FormHelperTextProps={{
                                className: "helper-text"
                            }}
                            autoComplete="off"
                            label="Email"
                            variant="outlined"
                            className="UserAdd_form-input" />
                        <TextField
                            id="senha"
                            label="Senha"
                            className="UserAdd_form-input"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            autoComplete="off"
                            onChange={(event) => dispatch(setPassword(event.target.value))}
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOpen color="secondary" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => dispatch(setShowPassword(!showPassword))}
                                            onMouseDown={(event) => event.preventDefault()}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} />
                    </Grid>
                    <Button
                        disabled={email === '' || name === '' || password === '' || invalidEmail}
                        onClick={() => dispatch(saveNewUser(email, name, password))}
                        className="UserAdd_Save-button"
                        size="large"
                        variant="contained"
                        color="primary"
                        style={{ textTransform: "none" }}>Salvar</Button>
                </Paper>
            </Grid>
        </div>
    )
}