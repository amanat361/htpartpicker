import { useState } from "react";
import { RadioGroup, Label, Description } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const configurations = [
  {
    id: 1,
    title: "Newsletter",
    description: "Last message sent an hour ago",
    users: "621 users",
  },
  {
    id: 2,
    title: "Existing Customers",
    description: "Last message sent 2 weeks ago",
    users: "1200 users",
  },
  {
    id: 3,
    title: "Trial Users",
    description: "Last message sent 4 days ago",
    users: "2740 users",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Configurations() {
  const [selectedConfiguration, setSelectedConfiguration] = useState(
    configurations[0]
  );

  return (
    <RadioGroup value={selectedConfiguration} onChange={setSelectedConfiguration}>
      <Label className="text-base font-semibold leading-6 text-gray-900">
        Select a configuration for your home theater
      </Label>

      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        {configurations.map((configuration) => (
          <RadioGroup.Option
            key={configuration.id}
            value={configuration}
            className={({ checked }) =>
              classNames(
                checked
                  ? "border-indigo-600 ring-2 ring-indigo-600"
                  : "border-gray-300",
                "relative flex cursor-pointer rounded-lg border bg-zinc-300 dark:bg-zinc-700 p-4 shadow-sm focus:outline-none"
              )
            }
          >
            {({ checked }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <Label
                      as="span"
                      className="block text-sm font-medium text-gray-900"
                    >
                      {configuration.title}
                    </Label>
                    <Description
                      as="span"
                      className="mt-1 flex items-center text-sm text-gray-500"
                    >
                      {configuration.description}
                    </Description>
                    <Description
                      as="span"
                      className="mt-6 text-sm font-medium text-gray-900"
                    >
                      {configuration.users}
                    </Description>
                  </span>
                </span>
                <CheckCircleIcon
                  className={classNames(
                    !checked ? "invisible" : "",
                    "h-5 w-5 text-indigo-600"
                  )}
                  aria-hidden="true"
                />
                <span
                  className={classNames(
                    checked ? "border-indigo-600" : "border-transparent",
                    "pointer-events-none absolute -inset-px rounded-lg"
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
