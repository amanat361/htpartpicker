import {
  ChevronRightIcon,
  ShareIcon,
  WrenchIcon,
  PlusCircleIcon,
  CurrencyDollarIcon,
  TvIcon,
  InformationCircleIcon,
  CodeBracketIcon,
  PhoneIcon,
} from "@heroicons/react/20/solid";
import {
  UsersIcon,
} from "@heroicons/react/24/outline";
import { TypewriterEffectSmooth } from "./effects/typewriter-effect";
import { Button } from "./primitives/button";
import { Text, TextLink } from "./primitives/text";
import { Badge } from "./primitives/badge";

const primaryFeatures = [
  {
    name: "Create",
    description:
      "Use our intuitive interface to create a build that meets your needs. Check for compatible parts, export to various formats, and more.",
    href: "/build",
    icon: WrenchIcon,
  },
  {
    name: "Collaborate",
    description:
      "With one click share your setup across the world. You can create a completed build page to show off pictures and specs. (Coming soon)",
    href: "/build",
    icon: ShareIcon,
  },
  {
    name: "Community",
    description:
      "Join the rest of the Home Theater Enthusiast community. Feel free to take a look at what they already have to say about HT Part Picker!",
    href: "/community",
    icon: UsersIcon,
  },
];
const secondaryFeatures = [
  {
    name: "Add new products.",
    description:
      "We allow community sourced products to ensure that nothing gets left behind.",
    icon: PlusCircleIcon,
  },
  {
    name: "Compare prices.",
    description:
      "Check the live price between multiple top retailers to ensure your wallet is happy.",
    icon: CurrencyDollarIcon,
  },
  {
    name: "TV Distance Checking.",
    description:
      "Get realtime feedback on how you should layout your room based on your chosen parts.",
    icon: TvIcon,
  },
  {
    name: "Comprehensive Guides.",
    description:
      "Don't try to reinvent the wheel when you can learn from others mistakes.",
    icon: InformationCircleIcon,
  },
  {
    name: "Powerful API.",
    description:
      "Access the HT Part Picker database with a well documented API (comming soon).",
    icon: CodeBracketIcon,
  },
  {
    name: "Mobile support.",
    description:
      "Access your builds and more on the go with our mobile friendly interface.",
    icon: PhoneIcon,
  },
];
const stats = [
  { id: 1, name: "Developers building HT Part Picker", value: "Just Me!" },
  { id: 2, name: "Products", value: "1m+" },
  { id: 3, name: "Users", value: "100+" },
  { id: 4, name: "Builds", value: "200+" },
];
const footerNavigation = {
  solutions: [
    { name: "Hosting", href: "#" },
    { name: "Data Services", href: "#" },
    { name: "Uptime Monitoring", href: "#" },
    { name: "Enterprise Services", href: "#" },
  ],
  support: [
    { name: "Pricing", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
    { name: "API Reference", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
  ],
  legal: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
  social: [
    {
      name: "X",
      href: "https://twitter.com/amanat361",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/amanat361/htpartpicker",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

function SectionHeadingPartOne() {
  return (
    <TypewriterEffectSmooth
      className=""
      cursorClassName="hidden"
      words={[{ text: "Welcome" }, { text: "to" }]}
    />
  );
}

function SectionHeadingPartTwo() {
  return (
    <TypewriterEffectSmooth
      className=""
      cursorClassName="hidden"
      words={[
        {
          text: "HT",
          className: "text-blue-700 dark:text-blue-800",
        },
        {
          text: "Part",
          className: "text-indigo-700 dark:text-indigo-800",
        },
        {
          text: "Picker",
          className: "text-violet-700 dark:text-violet-800",
        },
      ]}
    />
  );
}

export default function LandingPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      {/* <SectionHeading /> */}
      <main>
        {/* Hero section */}
        <div className="relative isolate overflow-hidden">
          <svg
            className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 dark:stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg
              x="50%"
              y={-1}
              className="overflow-visible fill-gray-50 dark:fill-gray-800/20"
            >
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
            />
          </svg>
          <div
            className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
            aria-hidden="true"
          >
            <div
              className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
              style={{
                clipPath:
                  "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-40 lg:flex lg:px-8 lg:pt-40">
            <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
              <div className="mt-24 sm:mt-32 lg:mt-16">
                <a href="#" className="inline-flex space-x-6">
                  {/* <Badge color="indigo">Latest updates</Badge> */}
                  <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 dark:text-indigo-400 ring-1 ring-inset dark:ring-indigo-500/20">
                    Latest updates
                  </span>
                  <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600 dark:text-gray-300">
                    <span>Just shipped v1.0</span>
                    <ChevronRightIcon
                      className="h-5 w-5 text-gray-800 dark:text-gray-500"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </div>
              <div className="flex flex-col gap-4 mt-6">
                <SectionHeadingPartOne />
                <SectionHeadingPartTwo />
              </div>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                The world’s only one stop shop for all your Home Theater needs.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Button color="blue" href="/build">
                  Get started
                </Button>
                <Button outline href="/guides">
                  View Guides <span aria-hidden="true">→</span>
                </Button>
              </div>
            </div>
            <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
              <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                <img
                  src="/buildPage.png"
                  alt="App screenshot of HT Part Picker Build Page"
                  width={2432}
                  height={1442}
                  className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Logo cloud */}
        <div className="mx-auto mt-8 max-w-7xl px-6 sm:mt-16 lg:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-black dark:text-white">
            Products hand sourced from trusted retailers
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://www.thesun.co.uk/wp-content/uploads/2022/02/Amazon-Logo-1024x426-1.png"
              alt="Amazon"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Best_Buy_Logo.svg/1280px-Best_Buy_Logo.svg.png"
              alt="Best Buy"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://images.crutchfieldonline.com/ImageBank/v20190322131200/social-media/og-meta.jpg"
              alt="Crutchfield"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
              src="https://upload.wikimedia.org/wikipedia/commons/4/48/EBay_logo.png"
              alt="SavvyCal"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
              src="https://cdn.dribbble.com/users/13145/screenshots/2497508/bobbyjkane-bandh-logo.png"
              alt="Statamic"
              width={158}
              height={48}
            />
          </div>
        </div>

        {/* Feature section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-400">
              Build Quickly
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
              Everything you need to create your dream home theater.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Whether you&apos;re a seasoned professional or just starting out,
              HT Part Picker has everything you need to get started. From the
              latest products to the best deals, we&apos;ve got you covered.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {primaryFeatures.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-black dark:text-white">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                      <feature.icon
                        className="h-6 w-6 text-black dark:text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">{feature.description}</p>
                    <p className="mt-6">
                      <Button outline href={feature.href}>
                        Learn more <span aria-hidden="true">→</span>
                      </Button>
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Feature section */}
        <div className="mt-32 sm:mt-56">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-400">
                Everything you need
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
                Don&apos;t know what to buy? No problem.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Home Theater Part Picker has meticulously crafted the most
                comprehensive and up to date database of home theater
                components. You can check out the supported categories and sort
                by all of your needs.
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden pt-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <img
                src="/products-screenshot.png"
                alt="App screenshot of product categories"
                className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-white/10"
                width={2432}
                height={1442}
              />
            </div>
          </div>
          <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
            <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 dark:text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
              {secondaryFeatures.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold text-black dark:text-white">
                    <feature.icon
                      className="absolute left-1 top-1 h-5 w-5 text-indigo-500"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>{" "}
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
            <h2 className="text-base font-semibold leading-8 text-indigo-400">
              HT Part Picker Stats
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
              Trusted by hundreds* of enthusiasts&nbsp;worldwide
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              *Okay well not hundreds yet, but we&apos;re working on it. You can
              help by sharing our app with your friends and family. We
              appreciate your support! (And yes the other stats are fake too
              here but hey we all got to start somewhere. Don&apos;t judge!)
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-black dark:text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col gap-y-3 border-l border-gray-200 dark:border-white/10 pl-6"
              >
                <dt className="text-sm leading-6">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* CTA section */}
        <div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
          <svg
            className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 dark:stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="1d4240dd-898f-445f-932d-e2872fd12de3"
                width={200}
                height={200}
                x="50%"
                y={0}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={0} className="overflow-visible fill-gray-50 dark:fill-gray-800/20">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#1d4240dd-898f-445f-932d-e2872fd12de3)"
            />
          </svg>
          <div
            className="absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
              style={{
                clipPath:
                  "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
              Make your dream theater a reality.
              <br />
              We can&apos;t wait to see what you build!
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              Seriously, just give it a try. It&apos;s free!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button color="blue" href="/build">
                Get started
              </Button>
              <Button outline href="/guides">
                View Guides <span aria-hidden="true">→</span>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer aria-labelledby="footer-heading" className="relative">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-4 lg:px-8">
          <div className="border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              {footerNavigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-500 hover:text-gray-400"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
            <Text className="mt-8 md:mt-0">
              &copy; {new Date().getFullYear()}&nbsp;
              <TextLink
                href="https://www.htpartpicker.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                HT Part Picker
              </TextLink>
              . Made with 💖 by&nbsp;
              <TextLink
                href="https://www.firewave.dev"
                target="_blank"
                rel="noreferrer noopener"
              >
                Firewave LLC
              </TextLink>
              . All rights reserved.
            </Text>
          </div>
        </div>
      </footer>
    </div>
  );
}
