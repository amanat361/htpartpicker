import { Button } from "@components/button";
import { CheckBadgeIcon } from "@heroicons/react/16/solid";

export default function SubmitTable({
  loading,
  onSubmit,
}: {
  loading: boolean;
  onSubmit: () => void;
}) {

  return (
    <div className="flex justify-end">
      <Button disabled={loading} type="button" color="blue" onClick={onSubmit}>
        {loading ? <l-quantum color="white" size="16" /> : <CheckBadgeIcon />}
        {loading ? "Loading..." : "Submit Products"}
      </Button>
    </div>
  );
}
