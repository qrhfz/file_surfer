import { BiLoaderAlt } from "react-icons/bi"

export const LoadingCircle = ({ size = "64px" }: { size?: string }) => {
  return (
    <div className="animate-spin inline-block">
      <BiLoaderAlt size={size} />
    </div>
  )
}