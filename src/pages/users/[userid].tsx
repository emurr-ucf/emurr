// End of Additional Extensions
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { User } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { prisma } from "../../lib/prisma";
// import { getData } from './api/hello';


export const getStaticPaths = async () => {
    const res = await fetch('http://localhost:3000/api/hello', {
        // method: "POST"
    }); //idk what to do for this tbh
    const data = await res.json();
    console.log(data);

    const paths = data.map((user: User) => {
        return{
            params: {id: user.id.toString()}
        };
    })

    return{
        paths,
        fallback: false // to stop from bad ids routing
    }
}

// const body = {firstName, lastName, email, password};
//     fetch("api/user", {
//       method: "POST",
//       headers: {"Content-Type": "application/json"},
//       body: JSON.stringify(body)
//     }).then((response: Response) => {
//       if (response.status === 200) {
//         success("Registered! Please check your inbox and verify your email address.");
//       }
//       else {
//         response.json().then((json) => error(json.error));
//       }
//     });

const UsersPage: NextPage = () => {
    return(
        <>
            <h1>Test Page</h1>
        </>
    )
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const token = await getToken(context);
  
//     if (token) {
//       const propUsers = await prisma.user.findUnique({
//         where: {
//           id: token.id,
//         },
//         select: {
//           id: true,
//           firstName: true,
//           lastName: true,
//         }
//       });
    
//       return {
//         props: { propUsers }
//       }
//     }
  
//     return {
//       props: { propUsers: [] }
//     }
//   }

export default UsersPage;
