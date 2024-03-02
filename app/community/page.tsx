import { clsx } from "clsx";
import { BsDiscord, BsReddit, BsLink, BsYoutube } from "react-icons/bs";

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
            alt="Discord"
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
      <Invite
        title="Home Theater Enthusiasts"
        description="You've been invited to join a server"
        image_url="https://cdn.discordapp.com/icons/724144086625550347/a_1d933c44aa957d3a2cf17c0e527939f6.webp?size=240"
        redirect_url="https://discord.gg/n76Gz4Mu5s"
        Icon={BsDiscord}
        className="bg-[#5865F2] hover:bg-[#454FBF]"
      />
      <Invite
        title="r/HomeTheater"
        description="The main subreddit for Home Theaters"
        image_url="https://styles.redditmedia.com/t5_2rof6/styles/communityIcon_tg187l1m8xs21.png?width=256&s=8bc24bad23153469022c5b33a2ffe90bb13bb3f4"
        redirect_url="https://www.reddit.com/r/hometheater/"
        Icon={BsReddit}
        className="bg-[#FF5700] hover:bg-[#FF4500]"
      />
      <Invite
        title="r/TVTooHigh"
        description="TVs that are too high"
        image_url="https://a.thumbs.redditmedia.com/IWvUdrzk_smpcQfDw7QjshkBY4SWcJ5FcQGJl8tTA30.png"
        redirect_url="https://www.reddit.com/r/TVTooHigh/"
        Icon={BsReddit}
        className="bg-[#FF5700] hover:bg-[#FF4500]"
      />
      <Invite
        title="rtings.com"
        description="TV Reviews and Ratings"
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhLOg15fetlXRFtNyvA3t6IfePiDFgXXdt-zTeydHEw&s"
        redirect_url="https://www.rtings.com/"
        Icon={BsLink}
        className="bg-blue-500 hover:bg-blue-600"
      />
      <Invite
        title="Official Home Theater Channel"
        description="YouTube Channel for Home Theaters"
        image_url="https://www.mydomaine.com/thmb/I5UQtJB13nCvUQb2ygbao5QbRN8=/1630x0/filters:no_upscale():strip_icc()/art-deco-f48cf28f73904a60ade1c30626130f0f.png"
        redirect_url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        Icon={BsYoutube}
        className="bg-[#FF0000] hover:bg-[#CC0000]"
      />
    </div>
  );
}
