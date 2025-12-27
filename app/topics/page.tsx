import Footer from "@/frontend/components/Footer";
import Header from "../../frontend/components/Header";
import Link from "next/link";

export default function Topics() {
    return (
        <>
        <Header />
        <main>
            <h1 className="mt-[150px] text-center text-3xl font-bold">HTML, CSS, & JavaScript Topics</h1>

            <section className="easy-level grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10 mt-8 mb-[280px]">
                <div className="easy1 border border-gray-300 rounded-lg p-4 shadow-md">
                    <h3 className="font-bold text-lg">HTML Lesson</h3>
                    <p className="text-gray-600">This lesson contains HTML concepts that will teach you enhance your coding skills.</p>
                    <Link href="/topics/html_lessons">
                        <button className="bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-4 rounded mt-4">View Now</button>
                    </Link>
                </div>

                <div className="easy1 border border-gray-300 rounded-lg p-4 shadow-md">
                    <h3 className="font-bold text-lg">CSS Lesson</h3>
                    <p className="text-gray-600">This lesson contains concepts about styling and enhancing the appearance of webpages.</p>
                    <Link href="/topics/css_lessons">
                        <button className="bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-4 rounded mt-4">View Now</button>
                    </Link>
                </div>

                <div className="easy1 border border-gray-300 rounded-lg p-4 shadow-md">
                    <h3 className="font-bold text-lg">JavaScript Lesson</h3>
                    <p className="text-gray-600">This lesson will teach you the fundamentals of JavaScript to have interaction with websites.</p>
                    <Link href="/topics/js_lessons">
                        <button className="bg-(--secondary-color) hover:bg-(--hover-background) text-white py-2 px-4 rounded mt-4">View Now</button>
                    </Link>
                </div>
            </section>
        </main>
        <Footer />
        </>
    )
}