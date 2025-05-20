import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

export default function SignUp() {
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}