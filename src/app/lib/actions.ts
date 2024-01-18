"use server";

import { AuthError } from "next-auth";
import { signIn } from "../../../auth";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import prisma from "./prisma";
import { redirect } from "next/navigation";

export async function authenticate() {
  noStore();

  try {
    await signIn();
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

async function postComment(comment: string, email: string, postName: string) {
  noStore();

  await prisma.blog.update({
    where: {
      name: postName,
    },
    data: {
      Comment: {
        create: {
          content: comment,
          email: email,
        },
      },
    },
  });
}

export type FormState = {
  errors?: {
    content?: string;
  };
  message?: string | null;
};

export async function createComment(
  email: string,
  postName: string,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const content = formData.get("content")?.toString() || "";

  if (!content) {
    return {
      message: "Please enter a comment.",
    };
  }

  try {
    await postComment(content, email, postName);
  } catch (error) {
    return {
      message: "Something went wrong.",
      errors: {},
    };
  }

  revalidatePath(`/blog/${postName}`);
  redirect(`/blog/${postName}`);
}
