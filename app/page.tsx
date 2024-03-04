import Banner from "@/components/banner";
import LandingPage from "@/components/landing";

const repository_url =
  "https://api.github.com/repos/amanat361/htpartpicker/commits/dev?per_page=1";

export default async function Home() {

  const response = await fetch(repository_url);
  const data = await response.json();

  return (
    <>
      <LandingPage />
      {/* {data && <Banner data={data}/>} */}
    </>
  );
}
