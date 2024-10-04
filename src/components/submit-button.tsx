"use client";

// import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  // const { pending } = useFormStatus()
  // console.log('pending', pending);
  return (
    <button
      type="submit"
      className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      Add Person
    </button>
  );
}
