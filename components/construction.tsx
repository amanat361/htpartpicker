import { Text, TextLink } from "./text";

export default function Greeting() {
  return (
    <div>
      <Text>
        Hey there! If you are seeing this, you probably are someone that knows a
        thing or two about Home Theaters. Checkout{" "}
        <TextLink href="/build">the build page</TextLink> and send me any and
        all feedback. Cheers!
      </Text>
    </div>
  );
}
