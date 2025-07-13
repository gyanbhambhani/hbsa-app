import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
  pdfUploader: f({
    pdf: { maxFileSize: "8MB" },
    "application/msword": { maxFileSize: "8MB" },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "8MB" }
  })
    .middleware(async () => {
      // This code runs on your server before upload
      return { userId: "user" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code runs on your server after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter; 