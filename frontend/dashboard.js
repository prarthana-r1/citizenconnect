import { auth, RedirectToSignIn, UserButton } from "@clerk/nextjs";

export default function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="p-5">
      <nav className="flex justify-between items-center bg-gray-900 text-white p-3">
        <h1 className="text-xl font-bold">Schemes Dashboard</h1>
        <UserButton />
      </nav>
      
      <div className="mt-5">
        <h2 className="text-2xl font-bold">Welcome to the Schemes Portal!</h2>
        <p>Check your eligibility, get AI assistance, and save schemes.</p>
      </div>
    </div>
  );
}
