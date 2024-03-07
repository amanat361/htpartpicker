import ButtonWithError from "./buttonwitherror";
import ButtonWithToast from "./buttonwithtoast";

export default function TestingPage() {
  return (
    <div>
      <h1>Testing Page</h1>
      <p>Testing page content</p>
      <ButtonWithError />
      <ButtonWithToast />
    </div>
  );
}
