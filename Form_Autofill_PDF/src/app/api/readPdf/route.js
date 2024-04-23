 import { NextResponse } from 'next/server'
import pdf from "pdf-parse"

export const POST = async (request) => { 
    try{
 const data = await request.formData()
 const file = data.get('file')


 if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

    // Parse the PDF and extract the text
    const pdfData = await pdf(buffer);
    const text = pdfData.text;

    // Split the text by "Message" to separate "Name" and "Message" fields
    const textParts = text.split("Email");

    let name = '';
    let email = '';

    if (textParts.length > 0) {
      name = textParts[0].replace(/Name/g, '').trim();
      if (textParts.length > 1) {
        email = textParts[1].trim();
      }
    }

   
    const dataToSendToFrontend = {
      name,
      email,
    };

   const response =  JSON.stringify(dataToSendToFrontend)
  return new NextResponse(response, { status: 200 });
    }catch(err){
        return new NextResponse("Error", { status: 500 });
    }
}

