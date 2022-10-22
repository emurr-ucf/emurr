// End of Additional Extensions
import { GetServerSideProps, GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetServerSidePropsType, InferGetStaticPropsType, NextPage} from "next";
import { User } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { prisma } from "../../lib/prisma";
import { debug } from "console";
import { ParsedUrlQuery } from "querystring";
import { propTypesSelected } from "@material-tailwind/react/types/components/select";
// import { getData } from './api/hello';



export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const res = await fetch('http://localhost:3000/api/user/getUserId', {
        // method: "POST"
    }); //idk what to do for this tbh
    const data = await res.json();
    console.log(data);

    const paths = data.user.map((user: User) => {
        return{
            params: {userid: user.id.toString()}
        };
    })

    return{
        paths,
        fallback: false // to stop from bad ids routing
    }
}

interface jk {
    user?: User,
}
interface jk2 { 
}

interface Params extends ParsedUrlQuery {
    userid: string;
}

// \[T]/ //praise the sun

//ignoring types
export const getStaticProps:GetStaticProps<jk, Params> = async (context) => {
    const { userid } = context.params!;

    if(!userid) return { props: {user: undefined} }


     // Find user information.
     const user = await prisma.user.findFirst({
        where: {
            id: userid,
        },
        select: { 
            registeredAt: false,
            name: true,
        }
    })
    return { props: {user}}
}

const UsersPage:NextPage = ({ user }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return(
        <>
            <h1>{user?.name}</h1>
        </>
    )
};

export default UsersPage;
