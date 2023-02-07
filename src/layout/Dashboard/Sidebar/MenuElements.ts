import { IconCalendarStats, IconCloudComputing, IconLayoutDashboard, IconNetwork, IconWorldWww } from '@tabler/icons';

export const menuElements = [
    {
        label: 'Dashboard',
        icon: IconLayoutDashboard,
        initiallyOpened: true,
        dropdownElements: [{
            label: 'Default',
            route: '/',
            iconDropdown: IconLayoutDashboard,
        }],

    },
    {
        label: 'Web Modules',
        icon: IconWorldWww,
        initiallyOpened: false,
        dropdownElements: [
            {
                label: 'Gathering',
                route: '/gathering',
                iconDropdown: IconCalendarStats,
            },
            {
                label: 'Scan',
                route: '/scan',
                iconDropdown: IconCalendarStats,

            },
            {
                label: 'Dir Busting',
                route: '/dir-bust',
                iconDropdown: IconCalendarStats,

            },
            {
                label: 'Scripts',
                route: '/web-scripts',
                iconDropdown: IconCalendarStats,
            },
            {
                label: 'Reports1',
                route: '/',
                iconDropdown: IconCalendarStats,
            },
        ],
    },
    {
        label: 'IP Modules',
        icon: IconNetwork,
        initiallyOpened: false,
        dropdownElements: [
            {
                label: 'Nmap',
                route: '/',
                iconDropdown: IconCalendarStats,
            },
            {
                label: 'Templates Nmap',
                route: '/',
                iconDropdown: IconCalendarStats,
            },
            {
                label: 'Reports2',
                route: '/',
                iconDropdown: IconCalendarStats,
            },
        ],
    },
    {
        label: 'Api Modules',
        icon: IconCloudComputing,
        initiallyOpened: false,
        dropdownElements: [
            {
                label: 'Test',
                route: '/',
                iconDropdown: IconCalendarStats,
            },
            {
                label: 'Mapping APIs',
                route: '/',
                iconDropdown: IconCalendarStats,
            },
            {
                label: 'Reports3',
                route: '/',
                iconDropdown: IconCalendarStats,
            }],
    },

];
