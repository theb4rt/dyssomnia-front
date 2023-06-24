import { useState } from 'react';
import NextApp, { AppContext, AppProps } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import DashboardLayout from '../layout/Dashboard/DashboardLayout';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
    const {
        Component,
        pageProps,
    } = props;
    const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
    const fontFamilies = {
        fontFamily: 'Simplifica, sans-serif',
        fontFamilyMonospace: 'Verdana, sans-serif',
        headings: { fontFamily: 'Greycliff CF, sans-serif' },
    };

    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
        setColorScheme(nextColorScheme);
        setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 }
        );
    };

    return (
        <>
            <Head>
                <title>Dyssomnia Scanner</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <link rel="shortcut icon" href="/assets/images/b4rt.ico" />
            </Head>

            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider
                  theme={{ colorScheme, ...fontFamilies }}
                  withGlobalStyles
                  withNormalizeCSS
                >
                    <NotificationsProvider>
                        <DashboardLayout>
                            <Component {...pageProps} />
                        </DashboardLayout>
                    </NotificationsProvider>
                </MantineProvider>
            </ColorSchemeProvider>
        </>
    );
}

App.getInitialProps = async (appContext: AppContext) => {
    const appProps = await NextApp.getInitialProps(appContext);
    return {
        ...appProps,
        colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',

    };
};
