'use client';
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";

const EntrepriseDetails = () => {
    const {id} = useParams(); // Récupère l'ID de l'entreprise dans l'URL
    const [enterpriseDetails, setEnterpriseDetails] = useState(null);

    useEffect(() => {
        // Simulation d'un appel API pour récupérer les détails de l'entreprise
        async function fetchEnterpriseDetails() {
            // Remplacez ceci par un appel à votre API
            const data = {
                id: id,
                name: "Best Innovation Award",
                email: "entreprise@gmail.com",
                phone: "74123658",
                fax: "74123658",
                sector: "Tech Industry",
                mission: "Innovating technology solutions for the future.",
                size: "50",
                localisation: "Tunis",
                description: "The king, seeing how much happier his subjects were, realized the error of his ways and repealed  the joke tax. Jokester was declared a hero, and the kingdom lived happily ever after The moral of the story is: never underestimate the power of a good laugh and always be careful of bad ideas.",
            };
            setEnterpriseDetails(data);
        }

        fetchEnterpriseDetails();
    }, [id]);

    if (!enterpriseDetails) {
        return <div>Loading...</div>;
    }

    return (
        // <div className="container mx-auto py-32">
        //     <h1 className="text-3xl font-semibold">{enterpriseDetails.name}</h1>
        //     <p>{enterpriseDetails.description}</p>
        //     <p>Sector: {enterpriseDetails.sector}</p>
        //     <p>Size: {enterpriseDetails.size}</p>
        //     <p>Localisation: {enterpriseDetails.localisation}</p>
        // </div>

        <section className="py-32">
            <div className="container mx-auto">
                <nav aria-label="breadcrumb">
                    <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
                        <li className="inline-flex items-center gap-1.5">
                            <a className="transition-colors hover:text-foreground" href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round" className="lucide lucide-house h-4 w-4">
                                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                                    <path
                                        d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                </svg>
                            </a>
                        </li>
                        <li role="presentation" aria-hidden="true" className="[&>svg]:size-3.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="lucide lucide-chevron-right">
                                <path d="m9 18 6-6-6-6"></path>
                            </svg>
                        </li>
                        <li className="inline-flex items-center gap-1.5">
                            <a className="transition-colors hover:text-foreground" href="/">Entreprise</a>
                        </li>
                        <li role="presentation" aria-hidden="true" className="[&>svg]:size-3.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="lucide lucide-chevron-right">
                                <path d="m9 18 6-6-6-6"></path>
                            </svg>
                        </li>
                        <li className="inline-flex items-center gap-1.5">
                        <span role="link" aria-disabled="true" aria-current="page"
                              className="font-normal text-foreground">Détail Entreprise</span>
                        </li>
                    </ol>
                </nav>

                <h1 className="mt-7 text-3xl font-semibold md:text-5xl">{enterpriseDetails.name}</h1>
                <div className="relative mt-12 grid gap-16 md:grid-cols-2">
                    <article className="prose order-2 mx-auto md:order-1">
                        <div>
                            <img src="https://shadcnblocks.com/images/block/placeholder-1.svg" alt="placeholder"
                                 className="mb-8 mt-0 aspect-video w-full rounded-lg object-cover"/>
                        </div>
                        <h1>The Joke Tax Chronicles</h1>
                        {enterpriseDetails.description}

                    </article>
                    <div className="order-1 h-fit md:sticky md:top-20 md:order-2">
                        <div className="flex items-center gap-4 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24"
                                 height="24">
                                <path
                                    d="M2 4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H2zm0 2h20v.01L12 13 2 6.01V6zm0 3.99l7.73 4.73c.63.39 1.61.39 2.23 0L22 9.99V18H2V9.99z"/>
                            </svg>

                            <h2>{enterpriseDetails.email}</h2>
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24"
                                 height="24">
                                <path
                                    d="M20 15.5a1.5 1.5 0 00-1.09-.67c-.48-.05-1.52-.12-2.1-.12a1 1 0 00-.8.39l-1.6 2a14.77 14.77 0 01-6.48-6.48l2-1.6a1 1 0 00.39-.8c0-.58-.07-1.62-.12-2.1A1.5 1.5 0 008.5 4H6A1.5 1.5 0 004.5 5.5 17.5 17.5 0 0021 19.5 1.5 1.5 0 0020 15.5z"/>
                            </svg>

                            <h2>{enterpriseDetails.phone}</h2>
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24"
                                 height="24">
                                <path
                                    d="M19 7h-1V4a2 2 0 00-2-2H8a2 2 0 00-2 2v3H5a3 3 0 00-3 3v8a3 3 0 003 3h14a3 3 0 003-3v-8a3 3 0 00-3-3zM8 4h8v3H8zm11 14a1 1 0 01-1 1H5a1 1 0 01-1-1v-8a1 1 0 011-1h14a1 1 0 011 1zM7 13h2v2H7zm4 0h6v2h-6z"/>
                            </svg>


                            <h2>{enterpriseDetails.fax}</h2>
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24"
                                 height="24">
                                <path
                                    d="M18 7H6V4h12v3zm2 3h-2V8h-4v2h-2V9h-2v6h-2V9h-2v4H4V8H2v10h2v4h12v-4h2v-4zm-4 2h2v2h-2zm-4 0h2v2h-2z"/>
                            </svg>


                            <h2>{enterpriseDetails.sector}</h2>
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24"
                                 height="24">
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h6v-2h-4z"/>
                            </svg>

                            <h2>{enterpriseDetails.mission}</h2>
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <p className="flex items-center gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
                                     width="24"
                                     height="24">
                                    <path
                                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm6 1c1.66 0 3 1.34 3 3v1c0 .55-.45 1-1 1h-16c-.55 0-1-.45-1-1v-1c0-1.66 1.34-3 3-3 1.48 0 2.73.81 3.42 2.04C9.19 15.49 10.51 16 12 16c1.49 0 2.81-.51 3.58-1.96C15.27 13.81 16.52 13 18 13z"/>
                                </svg>

                                {enterpriseDetails.size}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor"
                                     className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 2a9 9 0 019 9c0 7-9 13-9 13S3 18 3 11a9 9 0 019-9z"/>
                                </svg>

                                {enterpriseDetails.localisation}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EntrepriseDetails;
