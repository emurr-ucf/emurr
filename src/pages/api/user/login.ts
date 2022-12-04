import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { User } from "@prisma/client";
import comparePass from "../../../lib/comparePassword";

// Post API Inputs.
export interface PostLoginRequestType {
  email: string;
  password: string;
}

// Post API Outputs.
export interface PostLoginResponseType {
  user?: User;
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { email, provider } = req.query;

    if (typeof email != "string")
      return res.status(400).json({ error: "Not a valid email." });

    const account = await prisma.account.findFirst({
      where: {
        user: {
          email,
        },
      },
    });

    if (account && account.provider != provider)
      return res.status(400).json({
        error: `User can only login with provider ${account.provider}.`,
      });

    return res.status(200).json({});
  } else if (req.method === "POST") {
    const { email, password } = req.body;

    // Error: Not all fields are filled out.
    if (!email || !password)
      return res.status(400).json({ error: "Please fill out all fields." });

    // Error: Not a valid email.
    if (
      typeof email !== "string" ||
      !email.includes("@") ||
      !email.includes(".")
    )
      return res.status(400).json({ error: "Please input a valid email." });

    // If all checks are passed.

    // Query the Database.
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      // If inputted password and hashed password are the same, continue to next step.
      if (user.password && comparePass(password, user.password)) {
        // If Email is Verified Return User.
        if (user.verifyEmail === true)
          return res.status(200).json({ error: "", user });
        //Error: Email not verified.
        else
          return res
            .status(409)
            .json({ error: "Email not verified, please check email." });
      }
      // Error: Incorrect password.
      else return res.status(401).send({ error: "Incorrect password." });
    } else return res.status(409).send({ error: "User doesn't exist." });
  }
}

