import { ReactNode } from "react";

const LoadingSpinner = ({children}: {children?: ReactNode}) => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mb-5"></div>
      {children}
    </div>
  );
}

export default LoadingSpinner;
