import { NextResponse } from "next/server";
import { supabase } from "@/libs/supabase-server";

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const accessToken = authHeader?.split(" ")[1];

  if (!accessToken) {
    return NextResponse.json({ error: "No access token" }, { status: 401 });
  }

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (!user) {
      return NextResponse.json({ error: "No user found" }, { status: 401 });
    }

    const formData = await request.formData();
    const password = formData.get("password") as string;
    const display_name = formData.get("display_name") as string;
    console.log("formData", formData);

    const { error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      {
        password: password || undefined,
        user_metadata: {
          display_name: display_name || undefined,
        },
      }
    );

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const authHeader = request.headers.get("authorization");
  const accessToken = authHeader?.split(" ")[1];

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error: signOutError } = await supabase.auth.admin.deleteUser(
      user.id
    );
    if (signOutError) {
      return NextResponse.json(
        { error: signOutError.message },
        { status: 500 }
      );
    }
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
