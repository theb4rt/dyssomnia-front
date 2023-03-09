import { GetServerSideProps, NextPage } from 'next';
import DashboardLayout from '../../layout/Dashboard/DashboardLayout';
import ssrPropsUser from '../../helpers/ssrPropsUser';
import { IUserProfile } from '../../interfaces/IUser';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {
        id,
        email,
        token,
    } = await ssrPropsUser(context);

    if (!token) {
        return ({
            redirect: {
                destination:
                    '/login',
                permanent:
                    false,

            },
        });
    }

    const props: IUserProfile = {

        id: id || '',
        email: email || '',
        token,

    };

    return {
        props,
    };
};

const HomePage: NextPage<IUserProfile> = (props) => (
    <>
        <DashboardLayout email={props.email} id={props.id} token={props.token} />
    </>
);
export default HomePage;
