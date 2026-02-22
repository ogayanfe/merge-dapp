import { notFound } from "next/navigation";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Block Explorer",
  description: "Block Explorer created with 🏗 Scaffold-ETH 2",
});

const BlockExplorerLayout = ({ children }: { children: React.ReactNode }) => {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }
  return <>{children}</>;
};

export default BlockExplorerLayout;
