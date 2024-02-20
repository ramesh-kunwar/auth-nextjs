import React from "react";

const UserProfile = ({ params }: any) => {
  return (
    <div>
      <h1 className="text-2xl">Profile - {params.id}</h1>
    </div>
  );
};
export default UserProfile;
