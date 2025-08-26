
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mi Ecommerce",
  description: "Ecommerce con Next.js y NestJS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}