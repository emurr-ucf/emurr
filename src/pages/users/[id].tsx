// End of Additional Extensions
import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, NextPage } from "next";
import { User } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { prisma } from "../../lib/prisma";
import { id } from "@material-tailwind/react/types/components/tabs";
// import { getData } from './api/hello';


export const getStaticPaths = async () => {
    const res = await fetch('http://localhost:3000/api/hello', {
        method: "GET"
    }); //idk what to do for this tbh
    const data = await res.json();
    
    const paths = data.users.map((user: User) => {
        return{
            params: {id: user.id.toString()}
        };
    });
    
    return{
        paths,
        fallback: false // to stop from bad ids routing
    }
}

export const getStaticProps = async (context) => {
    
    return{props: {}}
}

const Details = ({}) => {
    return(
        <div>
            Test 
        </div>
    )
} 
export default Details;


// const UsersPage: NextPage = () => {
//     return(
//         <>
//             <h1>Test Page</h1>
//         </>
//     )
// };

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

// export default UsersPage;