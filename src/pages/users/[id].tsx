// End of Additional Extensions
import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, NextPage } from "next";
import { User } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { prisma } from "../../lib/prisma";
import { id } from "@material-tailwind/react/types/components/tabs";
// import { getData } from './api/hello';


export const getStaticPaths = async () => {
    const test = {
        email: 'watkins.braedon@gmail.com',
    };
    const res = await fetch('https://localhost:3000/api/user/getUserId', {
        method: "POST",
        body: JSON.stringify(test),
        headers:  { "Content-Type": "application/json" }
    }); //idk what to do for this tbh
    const data = await res.json();
    
    // console.log(data.id.toString());
    const paths = [{params: {id: data.id.id.toString()}}];
    console.log(paths);
    // console.log("TYPE: " + typeof(data.id));
    // const paths = data.id.map((ids: String) => {
    //     return{
    //         params: {ids: ids.toString()}
    //     };
    // });
    
    return{
        paths,
        fallback: false // to stop from bad ids routing
    }
}

export const getStaticProps: GetStaticProps = async (context) => {

    const id = context.params?.id;
    const res = await fetch('localhost:3000/users/' + id);
    const data = await res.json();

    return{props: {id: data}}
}

const Details = ({id}) => {
    return(
        <div>
            <h1>{id.id}</h1>
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