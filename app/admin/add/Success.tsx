import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function Success() {
  return (
    <div className="rounded-md bg-green-50 dark:bg-green-800 p-4 col-start-3">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-green-400 dark:text-green-50"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800 dark:text-green-50">
            Successfully uploaded product to database
          </p>
        </div>
      </div>
    </div>
  );
}