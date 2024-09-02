import { Form, type ActionResult } from "@/components/Form";
import { redirect } from "next/navigation";
import UserModel from "@/models/user";
import { validateRequest } from "@/models/auth";
import { Input } from "@/components/Input";
import { AuthForm } from "../components/AuthForm";

export default async function Page() {
  const { user } = await validateRequest();

  if (user) {
    redirect("/");
  }

  return (
    <AuthForm>
      <div className="flex flex-col flex-1 gap-8">
        <h2 className="text-center text-3xl">Welcome Back</h2>
        <p className="text-center text-gray-400">Enter Login credentials</p>
        <Form className="gap-8 items-stretch flex-1" action={login}>
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
            Login
          </button>
        </Form>
      </div>
    </AuthForm>
  );
}

async function login(_: any, formData: FormData) {
  "use server";

  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username and password are required" };
  }

  try {
    const user = await UserModel.login({ username, password });

    if (!user) {
      return { error: "User not found" };
    }

    return {
      redirect: "/",
    };
  } catch {
    return { error: "An error occurred" };
  }
}
