import { createUploadthing } from "uploadthing/next";
// import type { FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "1 MB" } })
    .onUploadComplete(async ({ metadata, file }) => {
 
      console.log("file url", file.ufsUrl);
    
    }),
} ;
