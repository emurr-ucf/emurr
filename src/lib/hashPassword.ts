<<<<<<< HEAD
const bcrypt = require("bcrypt");
=======
import bcrypt from "bcryptjs";
>>>>>>> sign-in-connect

export default function hashPass(password: string)
{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}
