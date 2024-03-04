import { clsx } from "clsx";
import { BsDiscord, BsReddit, BsLink, BsYoutube } from "react-icons/bs";
import Testimonials from "@/components/testimonials";
import InvitationsPanel from "./invitations";

type IconType = typeof BsDiscord | typeof BsReddit;

function Invite({
  title,
  description,
  image_url,
  redirect_url,
  Icon,
  className,
}: {
  title: string;
  description: string;
  image_url: string;
  redirect_url: string;
  Icon: IconType;
  className?: string;
}) {
  return (
    <div className="cursor-default select-none space-y-2 rounded-lg bg-[#f2f3f5] p-4 dark:bg-[#2b2d31] shadow-xl w-full max-w-lg">
      <div className="flex items-center justify-between gap-16">
        <div className="flex items-center gap-4">
          <img
            src={image_url}
            alt={`Image for invitation to ${title}`}
            className="h-14 w-14 rounded-xl object-cover"
            draggable="false"
          />
          <div>
            <a target="_blank" rel="noopener noreferrer" href={redirect_url}>
              <div className="flex flex-col gap-2">
                <h1 className="cursor-pointer font-normal text-[#060607] hover:underline dark:text-white">
                  {title}
                </h1>
                <p className="text-xs text-[#4e5058] dark:text-[#b5bac1]">
                  {description}
                </p>
              </div>
            </a>
          </div>
        </div>
        <a target="_blank" rel="noopener noreferrer" href={redirect_url}>
          <button
            className={clsx([
              className,
              "focus-visible:ring-ring ring-offset-background inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-[#e9ffec] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            ])}
          >
            <Icon className="h-6 w-6 mr-2" />
            Visit
          </button>
        </a>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  return (
    <div className="max-w-6xl w-full space-y-4 md:space-y-6 lg:space-y-8 flex flex-col items-center">
      <Testimonials />
      <InvitationsPanel />
    </div>
  );
}
