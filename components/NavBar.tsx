import { Avatar } from "./Avatar";

export function NavBar() {
  return (
    <nav className="bg-primary-content flex justify-between items-center p-5 shadow-xl">
      <h1 className="text-2xl">Logo</h1>
      <Avatar />
    </nav>
  );
}
