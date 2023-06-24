import { AppShell } from '@mantine/core';

import { PropsWithChildren, useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import SidebarCollapsed from './Sidebar/SidebarCollapsed';
import Headerbar from './HeaderBar';

const DashboardLayout = ({ children }: PropsWithChildren) => {
    const [collapsed, setCollapsed] = useState(true);
    const handleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <AppShell
          padding="md"
          layout="alt"
          navbar={
                collapsed ? (<Sidebar
                  handleCollapse={handleCollapse}
                  user_email="root@localhost"
                />) : (
                    <SidebarCollapsed handleCollapse={handleCollapse} />)

            }
          header={<Headerbar />}
          styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}

        >
            {children}
        </AppShell>
    );
};

export default DashboardLayout;
