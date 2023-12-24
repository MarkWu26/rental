'use client';


import useActiveList from "@/app/hooks/useActiveList";
import Image from "next/image";
import { User } from "@prisma/client";

interface AvatarProps {
  user?: User;
  isBody?: boolean;
  isSidebar?: boolean
};

const Avatar: React.FC<AvatarProps> = ({ 
  user,
  isBody,
  isSidebar
}) => {
  console.log('haha:L', user?.image)
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;
  const avatarStyle = {
    zIndex: isBody ? -1 : isSidebar ? 1 : undefined
  }

  return (
    <div className="relative">
      <div className="
        relative 
        inline-block 
        rounded-full 
        overflow-hidden
        h-9 
        w-9 
        md:h-11 
        md:w-11
      "
      style={avatarStyle}
      /* style={{zIndex: -1}} */
      >
        <Image
          fill
          src={user?.image || "/images/placeholder.jpg"}
          alt="Avatar"
        /*   style{{o}} */
        />
      </div>
      {isActive ? (
        <span 
          className="
            absolute 
            block 
            rounded-full 
            bg-green-500 
            ring-2 
            ring-white 
            top-0 
            right-0
            h-2 
            w-2 
            md:h-3 
            md:w-3
          " 
        />
      ) : null}
    </div>
  );
}

export default Avatar;
