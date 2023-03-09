import { AppShell } from '@mantine/core';

import { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import SidebarCollapsed from './Sidebar/SidebarCollapsed';
import Headerbar from './HeaderBar';
import { IUserProfile } from '../../interfaces/IUser';

const DashboardLayout = (props: IUserProfile) => {
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
                  user_email={props.email}
                />) : (
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
