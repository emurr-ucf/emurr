<<<<<<< HEAD
const bcrypt = require("bcrypt");
=======
import bcrypt from "bcryptjs";
>>>>>>> sign-in-connect

export default function comparePass(password: string, hashedPass: string)
{
   return bcrypt.compareSync(password, hashedPass);
}
