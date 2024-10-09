"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { signOut } from "next-auth/react";

import { User } from "~/types/main-types";

const UserNav = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{user.name}</DropdownMenuTrigger>

      <DropdownMenuContent
        className="flex w-60 flex-col items-center justify-center gap-1 bg-primary/90 py-1"
        align="end"
      >
        <p className="text-sm text-black">{user.email}</p>

        <DropdownMenuItem
          onClick={() => signOut()}
          className="cursor-pointer text-sm text-primary-foreground"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
