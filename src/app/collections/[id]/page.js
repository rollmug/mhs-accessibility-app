import React from "react";
import { Container } from "@/components/Container";
import StorageProvider from "@/app/storageProvider";
import Image from 'next/image';
import Link from "next/link";
import { getCollectionsByCategory, getCategoryByID } from "@/lib/collection-data";
import { stripHtml } from "string-strip-html";

import Arrow from "../../../../public/arrow.svg";

export default async function CollectionItems({ params }) {
    const { id } = await params;
    const category = await getCategoryByID(id);
    const collections = await getCollectionsByCategory(id);

    const transform = "?fit=cover&height=130&width=130&format=auto";

    if (collections.error) {
        return (
            <>
                <StorageProvider>
                    <Container>
                        <section className="my-6">
                            <div role="alert" className="alert alert-error text-white">{collections.message}. {collections.error}</div>
                        </section>
                    </Container>
                </StorageProvider>
            </>
        );
    }

    //console.log(collections);

    // collections.forEach(element => {
    //     console.log(element.id)
    //     //console.log(element.imageEntries)
    //     element.imageEntries.forEach(image => {
    //         // console.log(image.ImageEntry_id.image.id)
    //         console.log(image.ImageEntry_id.image.filename_disk)
    //     });
    //     console.log('--------------')
    // });
    return (
        <>
            <StorageProvider>
                <Container page="items">
                    <main>
                        <section className="px-7 pt-10 pb-3">
                            <div className="text-lg font-bold text-base-content mb-5" aria-hidden="true">Category</div>
                            <h1 className="text-3xl font-bold text-secondary" aria-label={`Category: ${category.categoryName}`}>
                                {category.categoryName}
                            </h1>

                            <p>
                                Select an item below to learn more.
                            </p>
                        </section>

                        <section className="px-7 pb-10">
                            <div className="flex flex-col gap-y-9">
                                {collections.map((collection) => (
                                    <Link
                                        key={collection.id}
                                        href={`/collections/${id}/${collection.id}`}
                                        className="flex flex-row gap-4 items-center bg-item-btn-bg pr-3"
                                        aria-label={`Visit item: ${stripHtml(collection.assetTitle).result}`}>
                                        <div className="flex-none w-[110px] aspect-square">
                                            <Image
                                                src={`${process.env.FILES_BASE_URL}/${collection.imageEntries[0].ImageEntry_id.image.id}/${collection.imageEntries[0].ImageEntry_id.image.filename_disk}${transform}`}
                                                alt={stripHtml(collection.assetTitle).result}
                                                width={130}
                                                height={130}
                                                aria-hidden="true"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <p className="m-0 text-base font-bold text-item-btn-text leading-tight" aria-hidden="true">
                                                <span dangerouslySetInnerHTML={{ __html: collection.assetTitle }}></span>
                                            </p>
                                        </div>
                                        <div className="flex-none w-4" aria-hidden="true">
                                            <Image src={Arrow} alt="Arrow icon" aria-hidden="true" />
                                        </div>
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