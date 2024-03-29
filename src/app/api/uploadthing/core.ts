import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth/next"
import {authOptions} from "@/src/lib/auth";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const session = await getServerSession(authOptions);

      // This code runs on your server before upload
 
      // If you throw, the user will not be able to upload
      if (!session) throw new Error("Unauthorized");
      if (session?.user.role !== "ADMIN") throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

     
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;