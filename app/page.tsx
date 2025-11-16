import Link from "next/link";
import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Welcome to Test Task Frontend
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          A Next.js 14 application with user registration and management
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register" className="inline-block">
            <Button variant="primary" className="w-full sm:w-auto">
              Register User
            </Button>
          </Link>
          <Link href="/users" className="inline-block">
            <Button variant="outline" className="w-full sm:w-auto">
              View Users
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

