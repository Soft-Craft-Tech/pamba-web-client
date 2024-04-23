import Link from "next/link";

function NotFoundPage() {
  return (
    <div className="flex justify-center flex-col gap-4 h-screen w-full items-center">
      <h1 className="text-3xl font-bold">Sorry, we can't find that Page</h1>
      <Link
        href="/"
        className="w-max py-2 px-5 bg-primary text-white font-semibold rounded-md"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
