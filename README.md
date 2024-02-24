<p align="center">
  <img src="https://www.htpartpicker.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhome-theater.893ed986.png&w=1080&q=75" width="250" title="HT Part Picker Logo">
</p>

## What is HT Part Picker?

Please read this article to see what started this whole thing in the first place!

https://www.saminamanat.com/articles/home-theater-part-picker

This is a passion project built out of love for the home theater enthusiast community. It is still very clearly in development and not even at an alpha stage. Despite that, due to a strong principle for all things open source, you can check out the code anyway.

Most updates are going to be on the `dev` branch and take some time to make it to production. Regardless, you can always check out the status of the live site [here](https://www.htpartpicker.com/).

## Tech Stack

HT Part Picker uses a bit of everything!

The framework: **NextJs**. I chose NextJS because it provides modern and efficient tooling for very large applications like this one. Useful for generating hundreds of product pages statically to make the user experience nice and snappy!

The language: **TypeScript**. There is very strong type safety throughout the entire project. If you choose to contribute, please keep the consistency of type safety and clearly defined types throughout the codebase.

The styling: **TailwindCSS**. HT Part Picker uses only the best! On top of that, we are using TailwindUI and [Catalyst](https://catalyst.tailwindui.com/docs) for beautiful and reusable components. *Please know, Catalyst is a paid product and some of its code is in this project. I urge you to support [TailwindUI](https://tailwindui.com/) directly and purchase your own license if you decide to use these components elsewhere. Thank you.*

The backend: **SUPABASE**. These guys are seriously the goats. The whole backend as a service idea truly does work. On top of supa, HT Part Picker uses **Puppeteer**, **Vercel Serverless**, **AWS-Lambda**, **Go** (experimental), **Python** (experimental), and so much more.

## Getting Started

If you want to use serverless functions locally, which probably doesn't apply to anyone reading this, you can run the Vercel dev environment directly:

```bash
vercel dev
```

For regular development, just use good ol' NPM. Sorry Bun, you'll be added soon :)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you push a change to a branch, you will see it at its own preview link thanks to Vercel

## Note from the creator

Thank you truly for taking the time to even read this! This project means a lot to me and I cannot wait until it gets out into the world for you to use. In the mean time, check out some of my other work if you'd like:

https://www.saminamanat.com/projects

Never hesitate to send an email either if you'd like to get in touch:

[sam@firewave.dev](mailto:sam@firewave.dev?subject=I%20saw%20HT%20Part%20Picker%20on%20GitHub%20and%20want%20to%20get%20in%20touch!&body=Hey%20there!%20Your%20project%20was%20absolutely%20AMAZING!!!%20I%20would%20love%20to%20work%20together%20and%20have%20a%20few%20things%20to%20say...)

Cheers!
