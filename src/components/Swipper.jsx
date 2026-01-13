import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router';
import { Typewriter } from 'react-simple-typewriter';

import img1 from "../assets/slider1.jpg";
import img2 from "../assets/slider2.webp";
import img3 from "../assets/slider3.jpg";

const slides = [
    { img: img1, tagline: "A Small Act of Kindness Can Save a Life." },
    { img: img2, tagline: "Blood Donation Is the Gift of Life." },
    { img: img3, tagline: "Stand With Humanity — Donate Blood." },
];

const Swipper = () => {
    const navigate = useNavigate();

    return (
        <Swiper navigation modules={[Navigation]} className="mySwiper">
            {slides.map((slide, index) => (
                <SwiperSlide key={index} className="relative">
                    <img
                        className="w-full h-[420px] object-cover"
                        src={slide.img}
                        alt=""
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/70 via-black/40 to-black/20 text-center px-4 space-y-8">

                        {/* Tagline */}
                        <h2 className="text-white text-2xl md:text-4xl font-bold max-w-3xl leading-snug">
                            <Typewriter
                                words={[slide.tagline]}
                                loop={false}
                                cursor
                                cursorStyle="|"
                                typeSpeed={60}
                                deleteSpeed={40}
                                delaySpeed={1500}
                            />
                        </h2>

                        {/* Action Buttons */}
                        <div className="flex justify-center gap-5 flex-wrap">

                            {/* Primary CTA */}
                            <button
                                onClick={() => navigate("/register")}
                                className="
                                    px-9 py-3 rounded-full font-semibold text-white
                                    bg-gradient-to-r from-red-600 to-red-500
                                    shadow-lg shadow-red-600/40
                                    hover:scale-105 hover:shadow-xl
                                    transition-all duration-300
                                "
                            >
                                Join as a Donor
                            </button>

                            {/* Secondary CTA */}
                            <button
                                onClick={() => navigate("/search")}
                                className="
                                    px-9 py-3 rounded-full font-semibold
                                    backdrop-blur-md bg-white/15 text-white
                                    border border-white/30
                                    shadow-md
                                    hover:bg-white/25 hover:scale-105
                                    transition-all duration-300
                                "
                            >
                                Search Donors
                            </button>

                        </div>

                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Swipper;
