import Image from 'next/image'


interface UserIdProps{
    idImageSrc: string;
}


const UserIdDocs: React.FC<UserIdProps> = ({
    idImageSrc
}) => {
  return (
    <div>
        UserIdDocs
        <Image
                alt="Image"
                src={idImageSrc}
                fill
                className="object-cover w-full"
            />

    </div>
  )
}

export default UserIdDocs