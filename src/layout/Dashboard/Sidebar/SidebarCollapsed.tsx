import React from 'react';
import { Center, Navbar, Stack } from '@mantine/core';
import { IconLayoutSidebarRightCollapse, IconLogout, IconSwitchHorizontal, TablerIcon } from '@tabler/icons';
import Image from 'next/image';
import { menuElements } from './MenuElements';
import { NavbarLinkCustom, NavbarLinkDefault } from '../../../components/NavbarComponents/menuElements';
import b4rtLogo from '../../../../public/assets/images/b4rt-logo.png';

type HeaderbarProps = {
    handleCollapse: () => void;
};

export interface MenuElementsProps {
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

const NavBarCollapsed = (props: HeaderbarProps) => {
    const links = menuElements.map((elem: MenuElementsProps, index) => {
            const menu_elements =
                <NavbarLinkCustom
                  key={index}
                  label={elem.label}
                    // active={active === 2}
                  icon={elem.icon}
                  menuItemsDropdown={
                        elem.dropdownElements.map(({
                                                       iconDropdown,
                                                       label,
                                                       route,
                                                   }) => (
                            {
                                MenuItemsIcon: iconDropdown,
                                menuItemsLabel: label,
                                menuItemsLink: route,
                            })
                        )

                    }
                />;

            return (
                menu_elements

            );
        }
    );

    return (

        <Navbar width={{ base: 80 }} p="md">

            <Center>
                <Image alt="logo" src={b4rtLogo} width={30} height={30} />

            </Center>
            <Navbar.Section grow mt={50}>
                <Stack justify="center" spacing={0}>
                    {links}

                </Stack>
            </Navbar.Section>
            <Navbar.Section>
                <Stack justify="center" spacing={0}>
                    <NavbarLinkDefault
                      icon={IconSwitchHorizontal}
                      label="Change account"

                    />
                    <NavbarLinkDefault icon={IconLogout} label="Logout" />

                </Stack>
            </Navbar.Section>
            <Navbar.Section mt={50}>
                <Stack justify="center" spacing={0}>

                    <NavbarLinkDefault
                      icon={IconLayoutSidebarRightCollapse}
                      onClick={() => props.handleCollapse()}
                      label="collapse"
                    />
                </Stack>

            </Navbar.Section>
        </Navbar>
    );
};
export default NavBarCollapsed;
