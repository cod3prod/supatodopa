"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function addPerson(formData: FormData) {
  try {
    const name = (formData.get("personName") as string) || "";
    if (name === "") {
      throw new Error("name is empty");
    }
    const data = await sql`INSERT INTO Person (NAME) VALUES (${name})`;
    revalidatePath("/");
    console.log('data', data);
    console.log("success");
  } catch (error) {
    return { error, status: 500 };
  }
}


export async function deletePerson(name: string) {
    try {
      if (name === "") {
        throw new Error("name is empty");
      }
      const data = await sql`DELETE FROM Person WHERE NAME =${name};`;
      revalidatePath("/");
      console.log('data', data);
      console.log("success");
    } catch (error) {
      return { error, status: 500 };
    }
  }
  