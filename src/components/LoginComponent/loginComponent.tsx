import React from 'react';
import { upperFirst, useToggle } from '@mantine/hooks';
import { Anchor, Button, Checkbox, Divider, Group, Paper, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { NextPage } from 'next';
import { GoogleButton, TwitterButton } from '../SocialButtons/SocialButtons';
import { IFormValues, IValues } from '../../interfaces/IFormLogin';

interface AuthProps {
    handleFormValues: (values: IFormValues) => void;
    handleSubmitting: boolean;
}

const LoginComponent: NextPage<AuthProps> = (props: AuthProps) => {
    const [toggleType, setToggleType] = useToggle(['login', 'register']);
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },

    });

    const setFormValues = (values: IValues) => {
        const formValues = {
            values,
            type: toggleType === 'login' ? 0 : 1,
        };
        props.handleFormValues(formValues);
    };
    return (

        <Paper radius="md" p="xl" withBorder>
            <Text size="lg" weight={500}>
                Welcome to Dyssomnia, {toggleType} with
            </Text>

            <Group grow mb="md" mt="md">
                <GoogleButton radius="xl">Google</GoogleButton>
                <TwitterButton radius="xl">Twitter</TwitterButton>
            </Group>

            <Divider label="Or continue with email" labelPosition="center" my="lg" />

            <form onSubmit={form.onSubmit(() => setFormValues(form.values))}>
                <Stack>
                    {toggleType === 'register' && (
                        <TextInput
                          label="Name"
                          placeholder="Your name"
                          value={form.values.name}
                          onChange={(e) => form.setFieldValue('name', e.currentTarget.value)}
                        />
                    )}

                    <TextInput
                      required
                      label="Email"
                      placeholder="mail@example"
                      value={form.values.email}
                      onChange={(e) => form.setFieldValue('email', e.currentTarget.value)}
                      error={form.errors.email && 'Invalid email'}
                    />

                    <PasswordInput
                      required
                      label="Password"
                      placeholder="Your password"
                      value={form.values.password}
                      onChange={(e) => form.setFieldValue('password', e.currentTarget.value)}
                      error={form.errors.password && 'Password should include at least 6 characters'}
                    />

                    {toggleType === 'register' && (
                        <Checkbox
                          label="I accept terms and conditions"
                          checked={form.values.terms}
                          onChange={(e) => form.setFieldValue('terms', e.currentTarget.checked)}
                        />
                    )}
                </Stack>

                <Group position="apart" mt="xl">
                    <Anchor
                      component="button"
                      type="button"
                      color="dimmed"
                      onClick={() => setToggleType()}
                      size="xs"
                    >
                        {toggleType === 'register'
                            ? 'Already have an account? Login'
                            : "Don't have an account? Register"}
                    </Anchor>
                    <Button type="submit" loading={props.handleSubmitting}>{upperFirst(toggleType)}</Button>
                </Group>
            </form>
        </Paper>
    );
};

export default LoginComponent;
