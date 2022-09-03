const bcrypt = require("bcrypt");

export default function hashPass(password: string)
{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}
