import UserModel from "@/models/user";

import { Form } from "@/components/Form";
import { redirect } from "next/navigation";
import { Input } from "@/components/Input";
import { validateRequest } from "@/models/auth";
import { AuthForm } from "../components/AuthForm";

export default async function Page() {
  const { user } = await validateRequest();

  if (!user && process.env.NODE_ENV === "production") {
    redirect("/auth/login");
  }

  return (
    <AuthForm>
      <div className="flex flex-col flex-1 gap-8">
        <h2 className="text-center text-3xl">Register a New Admin</h2>
        <p className="text-center text-gray-400">
          This will generate a new session
        </p>
        <Form className="gap-8 items-stretch flex-1" action={register}>
          <Input
            text="Username"
            type="text"
            placeholder="username"
            name="username"
            required={true}
          />
          <Input
            text="Password"
            type="password"
            placeholder="password"
            name="password"
            required={true}
          />
          <button className="bg-[#003478] rounded p-1 text-white" type="submit">
            Register
          </button>
        </Form>
      </div>
    </AuthForm>
  );
}

async function register(_: any, formData: FormData) {
  "use server";

  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username and password are required" };
  }

  try {
    const user = await UserModel.register({ username, password });

    if (!user) {
      return { error: "User not found" };
    }
    return {
      redirect: "/",
    };
  } catch (error) {
    console.log(error);
    return { error } as { error: string };
  }
}
