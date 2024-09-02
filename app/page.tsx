import { validateRequest } from "@/models/auth";
import { redirect } from "next/navigation";

const headers = [
  "Order ID",
  "Rating",
  "Shop",
  "Question 1",
  "Question 2",
  "Comment",
];

export default async function Home() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <>
    </>
  );
}
