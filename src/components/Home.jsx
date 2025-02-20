'use client'

import React, { useState, useEffect, useContext } from "react";
import Image from 'next/image';
import Link from "next/link";
import DarkLogo from "../../public/Collected-Logo_Dark@2x.png";
import LightLogo from "../../public/Collected-Logo_Light@2x.png";
import { StorageContext } from "@/app/storageProvider";

export const HomePage = () => {
    const { theme } = useContext(StorageContext);
    const [logo, setLogo] = useState(LightLogo);

    useEffect(() => {
        setLogo(theme === 'dark' ? DarkLogo : LightLogo);
    }, [theme]);

    return (
        <>
            <main>
                <section className="px-7 py-8 bg-neutral-content flex justify-center items-center">
                    <Image src={logo} className="max-w-[90%]" alt="Logo. Geometric multicolored shapes forming a circular pattern next to the word COLLECTED." suppressHydrationWarning />
                </section>

                <section className="px-7 py-10">
                    <h1 className="text-3xl font-bold text-secondary">Explore the Collection</h1>

                    <p>
                        The Collected exhibit showcases 150 years’ worth of objects gathered by the Missouri Historical Society. Touch below to explore them!
                    </p>

                    <div className="mt-8">
                        <Link href="/collections">
                            <button className="btn btn-primary btn-block rounded-none text-xl tracking-wide">
                                Begin
                            </button>
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
};