import { useAuth } from "../../hooks/useAuth.ts";

interface Props {
    size?: "sm" | "lg"
}

const ProfileAvatar = ({ size = "sm" }: Props) => {
    const { user } = useAuth();

    const sizeClasses = size === "sm" ? "w-10 h-10 text-base" : "w-24 h-24 text-3xl";

    return (
        <div
            style={{ backgroundColor: '#4338ca', color: '#ffffff' }}
            className={`${sizeClasses} rounded-full flex items-center justify-center font-bold border-2 border-white shrink-0`}
        >
            {user?.name.charAt(0).toUpperCase()}
        </div>
    );
}

export default ProfileAvatar;