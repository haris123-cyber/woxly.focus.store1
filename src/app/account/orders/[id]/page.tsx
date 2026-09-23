import { OrderDetailsClient } from "./client";

export const metadata = { title: "Order Details | Woxly" };

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <OrderDetailsClient orderId={resolvedParams.id} />;
}
