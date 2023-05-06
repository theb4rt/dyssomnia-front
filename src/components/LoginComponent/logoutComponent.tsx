import React from 'react';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { IconLogout } from '@tabler/icons';
import ApiAuthService from '../../../services/apiAuthService';
import { NavbarLinkDefault } from '../NavbarComponents/menuElements';

const LogoutComponent = () => {
    const auth = new ApiAuthService();
    const router = useRouter();

    const handleLogout = () => {
        auth
            .logout()
            .then((response) => {
                console.log(response);
                showNotification({
                    title: 'Success',
                    message: 'Bye Bye',
                    autoClose: true,
                    color: 'green',
                });
                router.push('/login');
            })
            .catch(({
                        data,
                    }) => {
                showNotification({
                    title: 'Error',
                    message: data.data.message,
                    autoClose: true,
                    color: 'red',
                });
            })
            .finally(() => {
            });
    };
    return (
        <NavbarLinkDefault icon={IconLogout} label="Logout" onClick={() => handleLogout()} />

    );
};
export default LogoutComponent;
