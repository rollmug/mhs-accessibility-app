import React from "react";
import { Container } from "@/components/Container";
import StorageProvider from "@/app/storageProvider";
import Image from 'next/image';
import Link from "next/link";
import { getCategories } from "@/lib/collection-data";

export default async function Collections() {
    const categories = await getCategories();
    const urlBase = process.env.FILES_BASE_URL;

    console.log(categories);

    if (categories.error) {
        return (
            <>
                <StorageProvider>
                    <Container>
                        <section className="my-6">
                            <div role="alert" className="alert alert-error text-white">{categories.message}. {categories.error}</div>
                        </section>
                    </Container>
                </StorageProvider>
            </>
        );
    }

    return (
        <>
            <StorageProvider>
                <Container page="collections">
                    <main>
                        <section className="px-7 pt-10 pb-4">
                            <h1 className="text-3xl font-bold text-secondary">Select a Category</h1>

                            <p>
                                This text will eventually tell you what you can do on this page. We have not written it yet.
                            </p>
                        </section>

                        <section className="px-7 pb-12">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                                {categories.map((category) => (
                                    <Link key={category.id} href={`/collections/${category.id}`} className="cursor-pointer" aria-label={`Category: ${category.categoryName}`}>
                                        <div className={`p-1 aspect-square flex items-center justify-center`} style={{ backgroundColor: category.color }}>
                                            <Image
                                                src={`${urlBase}/${category.icon.id}/${category.icon.filename_disk}`}
                                                alt={`Category: ${category.categoryName}`}
                                                aria-hidden="true"
                                                width={150}
                                                height={150}
                                            />
                                        </div>
                                        <h2 className="mt-4 text-center text-lg font-bold text-base-content leading-tight" aria-hidden="true">{category.categoryName}</h2>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </main>

                </Container>
            </StorageProvider>
        </>
    );
}
