import { ourFileRouter } from "@/app/api/uploadthing/core";
import { generateComponents } from "@uploadthing/react";

export const { uploadButton, uploadDropzone,
    Uploader } = 
generateComponents();