import { Button, Grid, IconButton, InputAdornment, Paper, TextField } from '@material-ui/core';
import { LockOpen, Visibility, VisibilityOff } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import config from '../../config';
import './UserAdd.css';

export default function UserAdd({ setBackdropOpen }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [userAdded, setUserAdded] = useState(false);
    const [errorSaving, setErrorSaving] = useState(false);

    const handleSaveButton = () => {
        setBackdropOpen(true);
        config.axiosInstance.post('/users', {
            email,
            name,
            password
        })
            .then(response => {
                setBackdropOpen(false);
                if (response.status === 201) {
                    setUserAdded(true);
                    setName('');
                    setEmail('');
                    setPassword('');
                    setTimeout(() => setUserAdded(false), 4000);
                }
            })
            .catch(_ => {
                setBackdropOpen(false);
                setErrorSaving(true);
                setTimeout(() => setErrorSaving(false), 4000);
            })
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setInvalidEmail(!validateEmail(email));
    }

    const renderAlert = () => {
        if (userAdded) {
            return (
                <Alert severity="success">Usuário foi adicionado com suceesso!</Alert>
            );
        }
        if (errorSaving) {
            return (
                <Alert severity="error">Ocorreu uma falha ao tentar salvar o usuário!</Alert>
            );
        }
    }

    return (
        <div>
            <Grid direction="column" container justify="center" alignItems="center">
                <div className="UserAdd_alert">
                    {renderAlert()}
                </div>
                <Paper elevation={3} className={`UserAdd_detail-paper`}>
                    <Grid container>
                        <TextField
                            value={name}
                            onChange={(event) => setName(event.target.value)}
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
                            onChange={(event) => setPassword(event.target.value)}
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
                                            onClick={() => setShowPassword(!showPassword)}
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
                        onClick={handleSaveButton}
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