import { NextPage } from 'next';
import { IUserProfile } from '../../interfaces/IUser';
// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const {
//         id,
//         email,
//         token,
//     } = await ssrPropsUser(context);
//
//     if (!token) {
//         return ({
//             redirect: {
//                 destination:
//                     '/login',
//                 permanent:
//                     false,
//
//             },
//         });
//     }
//
//     const props: IUserProfile = {
//
//         id: id || '',
//         email: email || '',
//         token,
//
//     };
//
//     return {
//         props,
//     };
// };
const HomePage: NextPage<IUserProfile> = () => (
    <>

    </>
);
export default HomePage;
