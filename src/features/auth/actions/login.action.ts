"use server";

import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { loginSchema } from "../schemas/login.schema";

export const loginAction = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput }) => {
    const { identifier, password } = parsedInput;

    // Simulate authenticated login session or API client invocation
    if (!identifier || !password) {
      throw new Error("Invalid credentials provided.");
    }

    revalidatePath("/");

    return {
      success: true,
      user: {
        id: "usr_1",
        name: "Eljudy Prog",
        email: identifier.includes("@") ? identifier : `${identifier}@eljudy.com`,
        role: "admin",
      },
    };
  });
