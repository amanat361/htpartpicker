import Testimonials from "@/components/testimonials";
import InvitationsPanel from "./invitations";

export default function CommunityPage() {
  return (
    <div className="max-w-6xl w-full space-y-4 md:space-y-6 lg:space-y-8 flex flex-col items-center">
      <Testimonials />
      <InvitationsPanel />
    </div>
  );
}
