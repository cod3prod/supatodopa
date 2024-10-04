"use client";

import { deletePerson } from "@/actions/person";

export default function RemoveButton({ name }: { name: string }) {
  return (
    <>
      <button
        className="text-red-500 hover:text-red-700"
        onClick={async () => await deletePerson(name)}
      >
        Remove
      </button>
    </>
  );
}
