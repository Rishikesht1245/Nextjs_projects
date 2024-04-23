import { NextResponse } from "next/server";
const pdf = require("pdf-parse");

export const POST = async (request: Request) => {
  try {
    const data = await request.formData();
    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let dataToSendToFrontend ={name : "", email : ""};

    // Parse the PDF and extract the text
    pdf(buffer).then(function(text : string) {
         // Split the text by "Message" to separate "Name" and "Message" fields
    const textParts = text.split("Email");

    if (textParts.length > 0) {
      dataToSendToFrontend.name = textParts[0].replace(/Name/g, "").trim();
      if (textParts.length > 1) {
        dataToSendToFrontend.email = textParts[1].trim();
      }
    }
    })
    .catch(function(error : Error){
        // handle exceptions
        console.log("Error in pdf parsing", Error)
    })

    const response = JSON.stringify(dataToSendToFrontend);
    return new NextResponse(response, { status: 200 });
  } catch (err) {
    return new NextResponse("Error", { status: 500 });
  }
  // return new NextResponse("hello", {status:200})
};
