import { useState } from 'react';
import { Box, Collapse, createStyles, Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { IconChevronLeft, IconChevronRight, TablerIcon } from '@tabler/icons';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
    control: {
        fontWeight: 500,
        display: 'block',
        width: '100%',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        fontSize: theme.fontSizes.sm,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },

    link: {
        fontWeight: 500,
        display: 'block',
        textDecoration: 'none',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        paddingLeft: 31,
        marginLeft: 30,
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        borderLeft: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },

    chevron: {
        transition: 'transform 200ms ease',
    },
}));

export interface LinksGroupProps {
    label: string
    icon: TablerIcon
    initiallyOpened: boolean
    dropdownElements: dropdownElement[]
}

export interface dropdownElement {
    label: string
    route: string
    iconDropdown: TablerIcon
}

export const LinksGroup = ({
                               icon: Icon,
                               label,
                               initiallyOpened,
                               dropdownElements,
                           }: LinksGroupProps) => {
    const {
        classes,
        theme,
    } = useStyles();
    const hasLinks = Array.isArray(dropdownElements);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;
    const items = (hasLinks ? dropdownElements : []).map((link, index) => (
        <Link
          href={link.route || ''}
          key={index}
          style={{ textDecoration: 'none' }}
          passHref
        >
            <Text
              className={classes.link}
              key={index}
            >
                {link.label}
            </Text>
        </Link>
    ));

    return (
        <>
            <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
                <Group position="apart" spacing={0}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    >
                        <ThemeIcon variant="light" size={30}>
                            <Icon size={18} />
                        </ThemeIcon>
                        <Box ml="md">{label}</Box>
                    </Box>
                    {hasLinks && (
                        <ChevronIcon
                          className={classes.chevron}
                          size={14}
                          stroke={1.5}
                          style={{
                                transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
                            }}
                        />
                    )}
                </Group>
            </UnstyledButton>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
};
