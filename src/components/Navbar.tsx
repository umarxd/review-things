import { getServerAuthSession } from "~/server/auth";
import SignIn from "./SignIn";
import Link from "next/link";

const Navbar = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="fixed inset-x-0 top-0 flex justify-between border-b border-black px-4">
      <Link href="/review/create">Create</Link>
      <Link href="/">ReviewThings</Link>
      {session ? <div>{session?.user.name}</div> : <SignIn />}
    </nav>
  );
};

export default Navbar;
