import { FC } from "preact/compat";

export const SingleColumnLayout: FC = ({ children }) => {
  return (
    <div class="w-full md:w-8/12 lg:w-6/12 p-8 mt-16 mx-auto shadow-lg">
      {children}
    </div>
  )
}