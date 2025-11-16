import React from "react";
import { getUsers } from "@/lib/api";
import Card from "@/components/ui/Card";
import Link from "next/link";
import Button from "@/components/ui/Button";

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return dateString;
  }
}

export default async function UsersPage() {
  let users;
  let error: string | null = null;

  try {
    users = await getUsers();
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : "Failed to fetch users. Please check your API connection.";
  }

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Link
              href="/"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-2 inline-block"
            >
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Users</h1>
          </div>
          <Link href="/auth/register">
            <Button variant="primary">Register New User</Button>
          </Link>
        </div>

        {error ? (
          <Card>
            <div className="text-center py-8">
              <p className="text-red-600 dark:text-red-400 mb-4" role="alert">
                {error}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Make sure the backend is running and{" "}
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-900 dark:text-gray-100">
                  NEXT_PUBLIC_API_URL
                </code>{" "}
                is correctly configured.
              </p>
            </div>
          </Card>
        ) : !users || users.length === 0 ? (
          <Card>
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">No users found.</p>
              <Link href="/auth/register">
                <Button variant="primary">Register First User</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <Card key={user.id} className="hover:shadow-lg transition-shadow">
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{user.email}</p>
                  </div>
                  {user.fullName && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {user.fullName}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Registered</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

