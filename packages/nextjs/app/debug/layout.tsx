import { notFound } from "next/navigation";

const DebugLayout = ({ children }: { children: React.ReactNode }) => {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }
  return <>{children}</>;
};

export default DebugLayout;
