"use server";
import { validateRequest } from "@/models/auth";
import { LogOut } from "./Logout";

export async function Avatar() {
  const { user, session } = await validateRequest();
  const name = user?.username || "D";
  const firstLetter = name.charAt(0).toUpperCase();

  if (!session) {
    return <></>;
  }

  return (
    <div className="dropdown dropdown-end my-auto">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-square rounded-full flex justify-center items-center"
      >
        <span className="text-xl">{firstLetter}</span>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-neutral rounded-box z-[1] w-52 p-2 shadow mt-1"
      >
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <LogOut />
        </li>
      </ul>
    </div>
  );
}

