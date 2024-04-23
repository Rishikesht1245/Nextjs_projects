import { NextResponse } from "next/server";
import  pdf, { Result }  from "pdf-parse";

export const POST = async (request: Request) => {
  try {
    const data = await request.formData();
    const file = data.get("file") as File;
    if (!file) {
      return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const dataToSendToFrontend = await new Promise<{ name: string; email: string }>((resolve, reject) => {
      pdf(buffer)
        .then((text: Result) => {
          const textParts = text.toString().split("Email");
          let name = "";
          let email = "";
          if (textParts.length > 0) {
            name = textParts[0].replace(/Name/g, "").trim();
            if (textParts.length > 1) {
              email = textParts[1].trim();
            }
          }
          resolve({ name, email });
        })
        .catch((error: Error) => {
          console.log("Error in pdf parsing", error);
          reject(error);
        });
    });

    const response = JSON.stringify(dataToSendToFrontend);
    return new NextResponse(response, { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse("Error", { status: 500 });
  }
};