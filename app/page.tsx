import Greeting from "@/components/construction";
import Banner from "@/components/banner";

const repository_url =
  "https://api.github.com/repos/amanat361/htpartpicker/commits/dev?per_page=1";

export default async function Home() {

  const response = await fetch(repository_url);
  const data = await response.json();
  const message = data["commit"]["message"] || "";
  const url = data["html_url"] || "";

  return (
    <>
      <Greeting />
      {message && url && <Banner message={message} url={url} />}
    </>
  );
}
