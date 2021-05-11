import { VercelRequest, VercelResponse } from "@vercel/node";
import { OK, METHOD_NOT_ALLOWED, INTERNAL_SERVER_ERROR } from "http-status";
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: { "Content-Type": "application/json" },
});

type TPost = {
  userId?: number;
  id?: number;
  title: string;
  body: string;
};

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    if (req.method === "GET") {
      const res: any = await api.get("/posts");
      const { data }: { data: TPost[] } = res;

      const returnData: TPost[] | [] = data
        ? [
            data[Math.floor(Math.random() * 101)],
            data[Math.floor(Math.random() * 101)],
            data[Math.floor(Math.random() * 101)],
            data[Math.floor(Math.random() * 101)],
            data[Math.floor(Math.random() * 101)],
          ]
        : [];

      res.status(OK).json({
        statusCode: OK,
        message: "Random post obtained",
        data: returnData,
      });
    } else {
      res.status(METHOD_NOT_ALLOWED).json({
        statusCode: METHOD_NOT_ALLOWED,
        message: "Method Not Allowed",
      });
    }
  } catch (error) {
    console.error(error);

    res.status(INTERNAL_SERVER_ERROR).json({
      statusCode: INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
    });
  }
};
