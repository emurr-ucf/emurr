const bcrypt = require("bcrypt");

export default function comparePass(password: string, hashedPass: string)
{
   return bcrypt.compareSync(password, hashedPass);
}
