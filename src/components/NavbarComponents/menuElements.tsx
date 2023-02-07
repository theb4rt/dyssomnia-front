import { createStyles, Menu, Tooltip, UnstyledButton } from '@mantine/core';
import React from 'react';
import { TablerIcon } from '@tabler/icons';
import Link from 'next/link';

interface NavbarLinkCustomProps {
    icon: TablerIcon;
    label: string;
    active?: boolean;
    menuItemsDropdown: MenuItemsDropdown[];

}

//
interface MenuItemsDropdown {
    MenuItemsIcon: TablerIcon;
    menuItemsLink: string;
    menuItemsLabel: string;
}

interface NavbarLinkProps {
    icon: TablerIcon;
    label: string;
    active?: boolean;

    onClick?(): void;
}

const useStyles = createStyles((theme) => ({
    link: {
        width: 50,
        height: 50,
        borderRadius: theme.radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        },
    },

    active: {
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

export const NavbarLinkCustom = ({
                                     icon: Icon,
                                     label,
                                     active,
                                     menuItemsDropdown,
                                 }: NavbarLinkCustomProps) => {
    const {
        classes,
        cx,
    } = useStyles();
    return (

        <Menu position="right-start" shadow="md" width={200}>
            <Menu.Target>
                <Tooltip label={label} position="right" transitionDuration={0}>
                    <UnstyledButton
                        // onClick={() => onClick}
                      className={cx(classes.link, { [classes.active]: active })}
                    >
                        <Icon stroke={1.5} />
                    </UnstyledButton>
                </Tooltip>

            </Menu.Target>

            <Menu.Dropdown>
                {menuItemsDropdown.map((
                    {
                        MenuItemsIcon,
                        menuItemsLabel,
                        menuItemsLink,
                    }, index) => (
                    <Link
                      href={menuItemsLink || ''}
                      key={index}
                      style={{ textDecoration: 'none' }}
                      passHref
                    >
                        <Menu.Item
                          icon={<MenuItemsIcon
                            stroke={1.5}
                          />}

                        >
                            {menuItemsLabel}
                        </Menu.Item>
                    </Link>
                ))
                }

            </Menu.Dropdown>

        </Menu>

    );
};

export const NavbarLinkDefault = ({
                                      icon: Icon,
                                      label,
                                      active,
                                      onClick,

                                  }: NavbarLinkProps) => {
    const {
        classes,
        cx,
    } = useStyles();
    return (
        <Tooltip label={label} position="right" transitionDuration={0}>
            <UnstyledButton
              onClick={onClick}
              className={cx(classes.link, { [classes.active]: active })}
            >
                <Icon stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    );
};
