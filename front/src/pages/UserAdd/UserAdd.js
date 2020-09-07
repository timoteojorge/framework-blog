import { Button, Grid, IconButton, InputAdornment, Paper, TextField } from '@material-ui/core';
import { LockOpen, Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';
import config from '../../config';
import './UserAdd.css';

export default function UserAdd({ setBackdropOpen, showAlert }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
                    showAlert('success', 'Usuário foi adicionado com suceesso!');
                    setName('');
                    setEmail('');
                    setPassword('');
                }
            })
            .catch(_ => {
                setBackdropOpen(false);
                showAlert('error', 'Ocorreu uma falha ao tentar salvar o usuário!');
            });
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setInvalidEmail(!validateEmail(email));
    }

    return (
        <div>
            <Grid direction="column" container justify="center" alignItems="center">
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