import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@/components/Profile";

interface Params {
  id: string;
}

const UserProfile = ({ params }: { params: Params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name") ?? "Anonymous User";

  const [userPosts, setUserPosts] = useState<any[]>([]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
