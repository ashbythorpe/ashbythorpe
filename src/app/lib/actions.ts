"use server";

import { AuthError } from "next-auth";
import { auth, signIn } from "../../../auth";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function authenticate() {
  try {
    await signIn("github");
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

async function postComment(comment: string, id: string, postName: string) {
  await prisma.comment.create({
    data: {
      content: comment,
      blog: {
        connect: {
          name: postName,
        },
      },
      user: {
        connect: {
          id: id,
        },
      },
    },
  });
}

export type FormState = {
  errors?: {
    content?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  content: z
    .string({
      required_error: "Please enter a comment.",
      invalid_type_error: "Please enter a comment.",
    })
    .min(1, { message: "Please enter a comment." }),
});

export async function createComment(
  postName: string,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await auth();

  console.log(session);

  if (!session?.user?.id) {
    return {
      message: "Please sign in.",
    };
  }

  const result = FormSchema.safeParse(formData);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { content } = result.data;

  if (!content) {
    return {
      message: "Please enter a comment.",
    };
  }

  try {
    await postComment(content, session.user.id, postName);
  } catch (error) {
    console.error(error);
    return {
      message: "Something went wrong.",
    };
  }

  revalidatePath(`/blog/${postName}`);
  redirect(`/blog/${postName}`);
}
