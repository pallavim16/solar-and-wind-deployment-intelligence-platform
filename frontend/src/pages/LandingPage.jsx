import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/landing.css";

function LandingPage() {

    return (

        <>

            <Navbar />

            <section className="hero">

                <div className="hero-left">

                    <h1>

                        GreenGrid AI

                    </h1>

                    <h2>

                        Solar & Wind Deployment Intelligence Platform

                    </h2>

                    <p>

                        Smart platform for renewable energy planning using

                        Artificial Intelligence, GIS and Data Analytics.

                    </p>

                    <button>

                        Get Started

                    </button>

                </div>

                <div className="hero-right">

                    <img

                        src="https://cdn-icons-png.flaticon.com/512/2942/2942923.png"

                        alt="renewable"

                    />

                </div>

            </section>

            <section className="features">

                <div className="card">

                    <h2>Solar Analytics</h2>

                    <p>

                        AI based solar deployment suggestions.

                    </p>

                </div>

                <div className="card">

                    <h2>Wind Prediction</h2>

                    <p>

                        Wind farm suitability prediction.

                    </p>

                </div>

                <div className="card">

                    <h2>GIS Mapping</h2>

                    <p>

                        Interactive deployment map.

                    </p>

                </div>

            </section>

            <Footer />

        </>

    );

}

export default LandingPage;