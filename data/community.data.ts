import { BsDiscord, BsReddit, BsLink, BsYoutube } from "react-icons/bs";

export const communityLinks = [
  {
    title: "Home Theater Enthusiasts",
    description:
      "The official Discord server for Home Theater Enthusiasts from the subreddit r/hometheater. Join us to discuss everything related to Home Theaters, showcase your build, and ask for help!",
    href: "https://discord.gg/n76Gz4Mu5s",
    icon: BsDiscord,
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
  },
  {
    title: "r/HomeTheater",
    description:
      "The official subreddit for Home Theaters. Follow for memes, discussions, and the occasional good deal. Also a great place to showcase your build! Just make sure your TV isn't too high!",
    href: "https://www.reddit.com/r/hometheater/",
    icon: BsReddit,
    iconForeground: "text-orange-700",
    iconBackground: "bg-red-50",
  },
  {
    title: "r/TVTooHigh",
    description:
      "A subreddit dedicated to TVs that are too high. Join us to share your experiences and help others avoid making the same mistake! Mostly a meme subreddit, but we do have some good discussions too.",
    href: "https://www.reddit.com/r/TVTooHigh/",
    icon: BsReddit,
    iconForeground: "text-orange-700",
    iconBackground: "bg-red-50",
  },
  {
    title: "Official Home Theater Channel",
    description:
      "The official YouTube channel for Home Theaters. Follow for reviews, build guides, and the occasional meme. Also a great place to ask for help and showcase your build!",
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    icon: BsYoutube,
    iconForeground: "text-red-700",
    iconBackground: "bg-red-50",
  },
];
