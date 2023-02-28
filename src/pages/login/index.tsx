import { Container } from '@mantine/core';
import { useState } from 'react';
import { showNotification } from '@mantine/notifications';
import ApiAuthService from '../../../services/apiAuthService';
import LoginComponent from '../../components/LoginComponent/loginComponent';
import { IFormValues } from '../../interfaces/IFormLogin';

const AuthenticationForm = () => {
    const auth = new ApiAuthService();
    const [submitting, setSubmitting] = useState(false);

    const handleFormValues = ({
                                  values,
                                  type,
                              }: IFormValues) => {
        setSubmitting(true);
        if (type === 0) {
            auth
                .login({
                    username: values.email,
                    password: values.password,
                })
                .then((response) => {
                    console.log(response);
                })
                .catch(({
                            data,
                        }) => {
                    1;

                    showNotification({
                        title: 'Error',
                        message: data.data.message,
                        autoClose: true,
                        color: 'red',
                    });
                })
                .finally(() => {
                    setSubmitting(false);
                });
        } else {
            console.log('register');
            // auth.register(values);
        }
    };
    return (

        <Container maw={520} py={50}>
            <LoginComponent handleFormValues={handleFormValues} handleSubmitting={submitting} />
        </Container>
    );
};

export default AuthenticationForm;
