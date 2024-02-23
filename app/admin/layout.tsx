import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

function AdminAlert() {
  return (
    <div className="rounded-md bg-yellow-50 p-4 w-full max-w-6xl mb-12">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            YOU ARE ON AN ADMIN PAGE
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              If you are not an admin, please{" "}
              <Link
                href="/"
                className="font-medium text-yellow-700 underline hover:text-yellow-600"
              >
                return to the homepage
              </Link>{" "}
              HT Part Picker is still in development and is not ready for public use. We are excited to share it soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <AdminAlert /> */}
      {children}
    </>
  );
}
