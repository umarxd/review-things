import { getServerAuthSession } from "~/server/auth";
import SignIn from "./SignIn";
import Link from "next/link";
import UserNav from "./UserNav";

const Navbar = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="fixed inset-x-0 top-0 flex justify-between border-b border-foreground px-4 text-sm text-foreground sm:text-lg">
      <Link href="/review/create">Create</Link>
      <Link className="hidden sm:block" href="/">
        ReviewThings
      </Link>
      {session ? <UserNav user={session.user} /> : <SignIn />}
    </nav>
  );
};

export default Navbar;
