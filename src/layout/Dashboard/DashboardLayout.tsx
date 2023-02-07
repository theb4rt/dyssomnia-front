import { AppShell } from '@mantine/core';

import { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import SidebarCollapsed from './Sidebar/SidebarCollapsed';
import Headerbar from './HeaderBar';

const DashboardLayout = () => {
    const [collapsed, setCollapsed] = useState(true);
    const handleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <AppShell
          padding="md"
          layout="alt"
          navbar={
                collapsed ? (<Sidebar handleCollapse={handleCollapse} />) : (
                    <SidebarCollapsed handleCollapse={handleCollapse} />)

            }
          header={<Headerbar />}
          styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}

        >
            {/* Your application here */}
        </AppShell>
    );
};

export default DashboardLayout;
