import Web3Provider from '@/providers/Web3Provider';

export default function CryptoWalletLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Web3Provider>{children}</Web3Provider>;
}
