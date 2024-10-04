import { sql } from "@vercel/postgres";
import { addPerson, deletePerson } from "../actions/person";
import RemoveButton from "@/components/remove-button";

// v2
export default async function Home() {
  // API
  // -> 데이터 요청, 데이터를 변경, 삭제
  const { rows } = await sql`select * from Person`;

  return (
    <div className="bg-zinc-900 min-h-screen flex items-center justify-center p-6">
      <div className="flex flex-col gap-4 w-[400px]">
        {/* Form Container */}
        <div className="w-full max-w-md bg-gray-700 rounded-xl shadow-md">
          <form
            action={async (formData: FormData) => {
              "use server";
              await addPerson(formData);
            }}
            className="space-y-4 p-4"
          >
            <input
              type="text"
              name="personName"
              id="personName"
              placeholder="Enter a Person"
              className="w-full px-3 py-2 text-white bg-gray-600 border border-gray-500 rounded-md placeholder-gray-400"
              autoComplete="off"
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Person
            </button>
          </form>
        </div>

        {/* List Container */}
        <div className="w-full max-w-md rounded-md shadow-md flex flex-col gap-4">
          {rows &&
            rows.map((row, idx) => (
              <div
                key={idx}
                className="text-white space-y-4 p-4 bg-gray-700 flex justify-between"
              >
                {/* Replace with dynamic content */}
                {row.name}
                <RemoveButton name={row.name} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
