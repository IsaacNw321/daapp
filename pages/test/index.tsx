import { sql } from "@vercel/postgres";
import { useEffect, useState } from "react";
export default async function Page({
  params
} : {
  params: { user: string }
}): Promise<JSX.Element> {
  const res = await sql`SELECT * from User`;
  const users = res.rows
 
  return (
    <main>
      <div>
        <h1>Users</h1>
      </div>
      {
      users.length === 0 ?  <p>No hay usuarios</p> : (
      users.map((user) => (
        <div key={user.id}>
          {user.id} - {user.quantity}
        </div>
      )) 
      )}
    </main>
  );
}