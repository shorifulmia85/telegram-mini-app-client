import type { ReactNode } from "react";
import { BottomNavigation } from "./BottomNav";

type IProps = {
  children: ReactNode;
};
const CommonLayout = ({ children }: IProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {children}
      <div className="mt-24">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default CommonLayout;
