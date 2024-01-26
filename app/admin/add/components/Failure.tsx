import { XCircleIcon } from "@heroicons/react/20/solid";

export default function Failure({ errorMessage }: { errorMessage: string }) {
  const errors = errorMessage.split("+");
  return (
    <div className="rounded-md bg-red-50 dark:bg-red-800 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400 dark:text-red-50" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-50">
            There was an error when adding the product
          </h3>
          <div className="mt-2 text-sm text-red-700 dark:text-red-50">
            <ul role="list" className="list-disc space-y-1 pl-5">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}