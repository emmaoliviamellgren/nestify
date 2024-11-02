'use client'

import { useAuth } from "@/hooks/authProvider";

const ProfilePage = () => {
    const { user } = useAuth();
    console.log(user)

    return <div>
        <p className="title">My account</p>
        <p>Welcome back, {user?.username}</p>
    </div>;
};

export default ProfilePage;
