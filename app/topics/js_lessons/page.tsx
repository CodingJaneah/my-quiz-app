import Header from "../../../frontend/components/Header";
import Footer from "../../../frontend/components/Footer";
import Link from "next/link";

export default function JsLessons() {

    return (
        <>
        <Header />
        <main>
            <h1 className="mt-[150px] text-center text-3xl font-bold">JavaScript Lessons</h1>
            <span id="back-icon"><Link href="/topics">BACK</Link></span>

             <section className="html-outline">
              <div className="contents mt-0">

                <div className="video-card">
                    <Link href="#" target="_blank" className="video-link">
                        <div className="video-thumbnail">
                            <svg className="play-icon" viewBox="0 0 24 24" fill="white">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            <span className="video-title">JS Alert Function</span>
                        </div>
                    </Link>
                </div>

                <div className="video-card">
                    <Link href="#" target="_blank" className="video-link">
                        <div className="video-thumbnail">
                            <svg className="play-icon" viewBox="0 0 24 24" fill="white">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            <span className="video-title">JS Variables</span>
                        </div>
                    </Link>
                </div>

                <div className="video-card">
                    <Link href="#" target="_blank" className="video-link">
                        <div className="video-thumbnail">
                            <svg className="play-icon" viewBox="0 0 24 24" fill="white">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            <span className="video-title">JS Assignment Operators</span>
                        </div>
                    </Link>
                </div>

                <div className="video-card">
                    <Link href="#" target="_blank" className="video-link">
                        <div className="video-thumbnail">
                            <svg className="play-icon" viewBox="0 0 24 24" fill="white">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            <span className="video-title">JS Arithmetic Operators</span>
                        </div>
                    </Link>
                </div>

                <div className="video-card">
                    <Link href="#" target="_blank" className="video-link">
                        <div className="video-thumbnail">
                            <svg className="play-icon" viewBox="0 0 24 24" fill="white">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            <span className="video-title">JS Comparison Operators</span>
                        </div>
                    </Link>
                </div>

                <div className="video-card">
                    <Link href="#" target="_blank" className="video-link">
                        <div className="video-thumbnail">
                            <svg className="play-icon" viewBox="0 0 24 24" fill="white">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            <span className="video-title">JS Logical Operators</span>
                        </div>
                    </Link>
                </div>

                <div className="video-card">
                    <Link href="#" target="_blank" className="video-link">
                        <div className="video-thumbnail">
                            <svg className="play-icon" viewBox="0 0 24 24" fill="white">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            <span className="video-title">JS Function</span>
                        </div>
                    </Link>
                </div>

                <div className="video-card">
                    <Link href="#" target="_blank" className="video-link">
                        <div className="video-thumbnail">
                            <svg className="play-icon" viewBox="0 0 24 24" fill="white">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            <span className="video-title">JS Object</span>
                        </div>
                    </Link>
                </div>

                <div className="video-card">
                    <Link href="#" target="_blank" className="video-link">
                        <div className="video-thumbnail">
                            <svg className="play-icon" viewBox="0 0 24 24" fill="white">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            <span className="video-title">JS Document Object Model</span>
                        </div>
                    </Link>
                </div>

              </div>
            </section>

        </main>
        <Footer />
        </>
    )
}