import { redirect } from "next/navigation";

/**
 * Admin Root Page
 * Redirects to the dashboard page
 */
export default function AdminPage() {
    redirect("/admin/dashboard");
}
