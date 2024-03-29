import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from "../../../lib/prisma";
import generateRandString from "../../../lib/generateRandString";
import comparePass from "../../../lib/comparePassword";
import hashPass from "../../../lib/hashPassword";
import sendEmail from "../../../lib/sendEmail";
import fs from "fs";

// Post API Inputs.
export interface PostUserRequestType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  // Not passed in, created by this endpoint.
  verifyEmail: number;
  emailToken: string;
  resPassword: number;
  resPassToken: string;
}

// Post API Output.
export interface PostUserResponseType {
  error?: string;
}

// Put API Inputs.
export interface PutUserRequestType {
  firstName: string;
  lastName: string;
}

// Put API Outputs.
export interface PutUserResponseType {
  error?: string;
}

// Get API Inputs.
export interface GetUserRequestType {}

// Put API Outputs.
export interface GetUserResponseType {
  firstName?: string;
  lastName?: string;
  email?: string;
  error?: string;
}

// Delete API Inputs.
export interface DeleteUserRequestType {
  userID: string;
}

// Delete API Outputs.
export interface DeleteUserResponseType {
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Registers a User.
  if (req.method === "POST") {
    const { firstName, lastName, email, password } = req.body;

    // Error: Not a valid email.
    if (
      !email ||
      typeof email != "string" ||
      !email.includes("@") ||
      !email.includes(".")
    )
      return res.status(400).json({ error: "Please input a valid email." });

    // Error: User already exists.
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user) return res.status(409).json({ error: "User already exists." });

    // Error: Not all fields are filled out.
    if (!firstName || !lastName || !password)
      return res.status(400).json({ error: "Please add all fields." });

    // Error: Name values are not strings.
    if (typeof firstName !== "string" || typeof lastName !== "string")
      return res.status(400).json({ error: "Please input a proper name." });

    // If all checks are passed.

    // Send Verification Email.
    // Creates a random string.
    const emailTok = generateRandString();

    // Sends the verifcation email.
    const emailSend = sendEmail(firstName, email, emailTok, "Verify");

    // Hash password.
    const hashedPass = hashPass(password);

    // Saves New User.
    const userData = {
      name: firstName,
      lastName,
      email,
      password: hashedPass,
      verifyEmail: false,
      emailToken: emailTok,
      resPassword: 0,
      resPassToken: "",
    };
    const savedUser = await prisma.user.create({ data: userData });

    if (!savedUser)
      return res.status(409).json({ error: "User was not registered." });

    const accountData = {
      userId: savedUser.id,
      type: "credentials",
      provider: "credentials",
      providerAccountId: savedUser.id,
    };

    const savedAccount = await prisma.account.create({
      data: accountData,
    });

    if (!savedAccount)
      return res.status(409).json({
        error:
          "Account could not be generated. Please contact support with an account error.",
      });
    return res.status(200).json({});
  }

  // Updates User Information.
  if (req.method === "PUT") {
    // Checks JWT token.
    const token = await getToken({ req });
    if (!token)
      return res.status(401).json({ error: "User is not logged in." });

    const { firstName, lastName } = req.body;

    // If all checks are passed.
    // Updates user based on input.
    const user = await prisma.user.update({
      where: {
        id: token.id,
      },
      data: {
        name: firstName,
        lastName,
      },
    });
    if (user)
      return res
        .status(200)
        .json({ firstName: user.name, lastName: user.lastName });
    else return res.status(409).json({ error: "Could not update information" });
  }

  // Retrieves a User's Information.
  if (req.method === "GET") {
    // Checks JWT token.
    const token = await getToken({ req });
    if (!token)
      return res.status(401).json({ error: "User is not logged in." });

    // Gets User.
    const user = await prisma.user.findFirst({
      where: {
        id: token.id,
      },
    });

    if (user)
      return res.status(200).json({
        firstName: user.name,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
      });
    else return res.status(404).json({ error: "User not found." });
  }

  // Deletes User's Account.
  if (req.method === "DELETE") {
    // Checks JWT token.
    const token = await getToken({ req });
    if (!token)
      return res.status(401).json({ error: "User is not logged in." });

    const { password } = req.body;

    // Error: Password was wrong or was not sent.
    if (!password || typeof password != "string")
      return res
        .status(400)
        .json({ error: "Password is incorrect or missing." });

    const user = await prisma.user.findFirst({
      where: {
        id: token.id,
      },
    });

    if (user) {
      if (user.password && comparePass(password, user.password)) {
        const tours = await prisma.tour.findMany({
          where: {
            tourAuthorId: user.id,
          },
        });

        if (tours) {
          for (let i = 0; i < tours.length; i++) {
            fs.rm(
              "./websites/" + tours[i].id,
              { recursive: true, force: true },
              (err) => {
                if (err) {
                  throw err;
                }

                console.log(`${tours[i].id} is deleted!`);
              }
            );
          }
        }

        // Deletes User.
        const deleteUser = await prisma.user.delete({
          where: {
            id: token.id,
          },
        });

        if (deleteUser) return res.status(200).json({});
        else return res.status(409).json({ error: "User was not deleted." });
      } else return res.status(401).json({ error: "Password is incorrect" });
    } else return res.status(409).json({ error: "User was not found." });
  }
}
