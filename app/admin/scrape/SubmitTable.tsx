import { Button } from "@components/button";
import { CheckBadgeIcon, StopCircleIcon } from "@heroicons/react/16/solid";

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
        {loading ? <StopCircleIcon /> : <CheckBadgeIcon />}
        {loading ? "Loading..." : "Submit Products"}
      </Button>
    </div>
  );
}
