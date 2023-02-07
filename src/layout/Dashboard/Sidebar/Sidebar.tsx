import { Button, Code, createStyles, Divider, Group, Navbar, ScrollArea } from '@mantine/core';
import { IconLayoutSidebarLeftCollapse } from '@tabler/icons';
import Image from 'next/image';
import { getCookie } from 'cookies-next';
import { LinksGroup } from '../SidebarLinksGroup';

import b4rtLogo from '../../../../public/assets/images/b4rt-logo.png';
import { UserButton } from '../UserButton';
import { menuElements } from './MenuElements';

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        paddingBottom: 0,
    },

    header: {
        padding: theme.spacing.md,
        paddingTop: 0,
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
    },

    links: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
    },

    linksInner: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
    },

    footer: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
    },
}));

type SidebarProps = {

    handleCollapse: () => void;
};
const Sidebar = (props: SidebarProps) => {
    const { classes } = useStyles();
    const links = menuElements.map((item) => <LinksGroup {...item} key={item.label} />);
    const logoUser: string | boolean = getCookie('user-profile-image') || false;
    const nameUser: string | boolean = getCookie('user-name') || 'User Name';
    const email: string | boolean = getCookie('user-name') || 'admin@example.com';

    return (

        <Navbar width={{ sm: 250 }} p="md" className={classes.navbar}>
            <Navbar.Section className={classes.header}>
                <Group position="center">
                    <Image alt="logo" src={b4rtLogo} />
                    <Code sx={{ fontWeight: 700 }}>Dyssomnia Scanner</Code>
                </Group>
            </Navbar.Section>

            <Navbar.Section grow className={classes.links} component={ScrollArea}>
                <div className={classes.linksInner}>{links}</div>
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <UserButton
                  image={logoUser}
                  name={String(nameUser)}
                  email={String(email)}
                />
                <Divider mt="md" mb="md" />
                <Group position="center">
                    <div>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => props.handleCollapse()}
                        >
                            <IconLayoutSidebarLeftCollapse
                              size={20}

                            />
                        </Button>
                    </div>

                </Group>
            </Navbar.Section>

        </Navbar>
    );
};
export default Sidebar;
