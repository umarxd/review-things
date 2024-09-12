"use client";

import { signIn } from "next-auth/react";
import React from "react";

const SignIn = () => {
  return <button onClick={() => signIn()}>Sign in with Discord</button>;
};

export default SignIn;
