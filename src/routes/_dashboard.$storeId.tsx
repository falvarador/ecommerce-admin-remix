import { json } from "@remix-run/node"; // or cloudflare/deno

export const loader = async () => {
  return json({ ok: true });
};

export default function Dashboard() {
  return (
    <>
      <div>This is the dashboard!</div>
    </>
  );
}
