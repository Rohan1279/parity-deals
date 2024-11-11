"use server";

import { productDetailsSchema } from "@/schemas/products";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createProduct as createProductDb } from "@/server/db/products";
import { redirect } from "next/navigation";

export async function createProduct(
  unsafeData: z.infer<typeof productDetailsSchema>
): Promise<{ error: boolean; message: string } | undefined> {
  const { userId } = await auth();
  const { success, data, error } = productDetailsSchema.safeParse(unsafeData);
  if (!success || userId == null) {
    return { error: true, message: "Error creating product" };
  }
  const { id } = await createProductDb({ ...data, clerkUserId: userId });

  redirect(`/dashbaord/products/${id}/edit?tab=countries`);
}
