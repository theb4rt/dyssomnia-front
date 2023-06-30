import React, { useRef, useState } from 'react';
import { Alert, Autocomplete, Button, Container, Loader, SimpleGrid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { IconAlertCircle } from '@tabler/icons';
import NiktoService from '../../../../services/web-module/nikto.service';
import { ssrToken } from '../../../helpers/ssrPropsUser';

export function NiktoScan({ token }: any) {
    const timeoutRef = useRef<number>(-1);
    const [targetUrl, setTargetUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<string[]>([]);
    const niktoService = new NiktoService(token);
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const form = useForm({
        initialValues: {
            targetUrl: '',
        },
        validate: {
            targetUrl(value) {
                const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
                return urlRegex.test(value) ? null : 'Invalid URL';
            },
        },

    });

    const handleSubmitThreshold = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log(targetUrl);
        try {
            const response = await niktoService.launchScan({ targetUrl });
            setIsAlertVisible(true);
            console.log(response);
        } catch (error) {
            console.error('Error:', error);
            setIsAlertVisible(true);
        }
    };

    const handleChange = (val: string) => {
        window.clearTimeout(timeoutRef.current);
        setTargetUrl(val);
        setData([]);

        if (val.trim().length === 0 || val.includes('http://') || val.includes('https://')) {
            setLoading(false);
        } else {
            setLoading(true);
            timeoutRef.current = window.setTimeout(() => {
                setLoading(false);
                setData(['http://', 'https://'].map((provider) => `${provider}${val}`));
            }, 1000);
        }
    };
    return (
        <Container my="md">
            <SimpleGrid
              cols={2}
              spacing="md"
              breakpoints={[
                    {
                        maxWidth: 'sm',
                        cols: 1,
                    },
                ]}
            >
                <form onSubmit={handleSubmitThreshold}>
                    <div
                      style={{
                            display: 'flex',
                            alignItems: 'flex-end',
                        }}
                    >
                        <Autocomplete
                          value={targetUrl}
                          data={data}
                          onChange={handleChange}
                          rightSection={loading ? <Loader size="xs" /> : null}
                          label="Set target"
                          placeholder="https://example.com"
                        />
                        <Button
                          variant="filled"
                          type="submit"
                          color="teal"
                          style={{
                                marginLeft: '8px',
                            }}
                        >
                            Go
                        </Button>
                    </div>
                </form>
                <>
                    {isAlertVisible && (
                        <Alert
                          withCloseButton
                          icon={<IconAlertCircle size={16} />}
                          title="Nice!"
                          color="green"
                          onClose={() => setIsAlertVisible(false)}
                        >
                            The scan has been launched, you will be notified when it is finished.
                        </Alert>
                    )}
                </>
            </SimpleGrid>

        </Container>

    );
}

export async function getServerSideProps(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) {
    const token = await ssrToken(context);

    return {
        props: token,
    };
}

export default NiktoScan;
