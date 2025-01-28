import { NextResponse } from "next/server";
import { supabase } from "@/libs/supabase-server";

async function DELETE(request: Request) {
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
