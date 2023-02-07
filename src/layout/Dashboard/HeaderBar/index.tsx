import { ActionIcon, Container, createStyles, Group, Header } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons';
import Image from 'next/image';
import DyssomniaLogo from '../../../../public/assets/logos/dyssomnia-logo-blank.png';

const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 56,

        [theme.fn.smallerThan('sm')]: {
            justifyContent: 'flex-start',
        },
    },

    links: {
        width: 50,

        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    social: {
        width: 260,

        [theme.fn.smallerThan('sm')]: {
            width: 'auto',
            marginLeft: 'auto',
        },
    },

    burger: {
        marginRight: theme.spacing.md,

        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({
                variant: 'light',
                color: theme.primaryColor,
            }).background,
            color: theme.fn.variant({
                variant: 'light',
                color: theme.primaryColor,
            }).color,
        },
    },
}));

const Headerbar = () => {
    const { classes } = useStyles();

    return (
        <Header height={56} mb={120}>
            <Container className={classes.inner}>
                <Group className={classes.links} spacing={5} />

                <Group>
                    <Image src={DyssomniaLogo} alt="dyssomnia-logo" width={250} />
                </Group>

                <Group spacing={0} className={classes.social} position="right" noWrap>
                    <ActionIcon size="lg">
                        <IconBrandTwitter size={18} stroke={1.5} color="green" />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <IconBrandLinkedin size={18} stroke={1.5} color="green" />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <IconBrandGithub size={18} stroke={1.5} color="green" />
                    </ActionIcon>
                </Group>
            </Container>
        </Header>

    );
};
export default Headerbar;
