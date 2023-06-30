import { useRouter } from 'next/router';
import { PropsWithChildren, ReactElement } from 'react';
import DashboardLayout from './DashboardLayout';

const Layout = ({ children }: PropsWithChildren<{}>): ReactElement | null => {
    const router = useRouter();

    console.log('b4rt: ', router.pathname);
    if (router.pathname === '/login') {
        return <>{children}</>;
    }

    return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
