'use client';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const EntrepriseDetails = () => {
    const { id } = useParams(); // Récupère l'ID de l'entreprise dans l'URL
    const [enterpriseDetails, setEnterpriseDetails] = useState(null);

    useEffect(() => {
        // Simulation d'un appel API pour récupérer les détails de l'entreprise
        async function fetchEnterpriseDetails() {
            // Remplacez ceci par un appel à votre API
            const data = {
                id: id,
                name: "Best Innovation Award",
                sector: "Tech Industry",
                size: "50",
                localisation: "Tunis",
                description: "Details about the enterprise.",
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-chevron-right">
                            <path d="m9 18 6-6-6-6"></path>
                        </svg>
                    </li>
                    <li className="inline-flex items-center gap-1.5">
                        <a className="transition-colors hover:text-foreground" href="/">Components</a>
                    </li>
                    <li role="presentation" aria-hidden="true" className="[&>svg]:size-3.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-chevron-right">
                            <path d="m9 18 6-6-6-6"></path>
                        </svg>
                    </li>
                    <li className="inline-flex items-center gap-1.5">
                        <span role="link" aria-disabled="true" aria-current="page"
                              className="font-normal text-foreground">Products</span>
                    </li>
                </ol>
            </nav>

            <h1 className="mt-7 text-3xl font-semibold md:text-5xl">Professional Service Agreement</h1>

            <div className="relative mt-12 grid gap-16 md:grid-cols-2">
                <article className="prose order-2 mx-auto md:order-1">
                    <div>
                        <img src="https://shadcnblocks.com/images/block/placeholder-1.svg" alt="placeholder"
                             className="mb-8 mt-0 aspect-video w-full rounded-lg object-cover"/>
                    </div>
                    <h1>The Joke Tax Chronicles</h1>
                    <p>Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his
                        throne. One day, his advisors came to him with a problem: the kingdom was running out of
                        money.</p>
                    <h2>The King's Plan</h2>
                    <p>The king thought long and hard, and finally came up with <a href="#">a brilliant plan</a>: he
                        would tax the jokes in the kingdom.</p>
                    <blockquote>“After all,” he said, “everyone enjoys a good joke, so it's only fair that they should
                        pay for the privilege.”
                    </blockquote>
                    <h3>The Joke Tax</h3>
                    <p>The king's subjects were not amused. They grumbled and complained, but the king was firm:</p>
                    <ul>
                        <li>1st level of puns: 5 gold coins</li>
                        <li>2nd level of jokes: 10 gold coins</li>
                        <li>3rd level of one-liners : 20 gold coins</li>
                    </ul>
                    <p>As a result, people stopped telling jokes, and the kingdom fell into a gloom. But there was one
                        person who refused to let the king's foolishness get him down: a court jester named
                        Jokester.</p>
                    <h3>Jokester's Revolt</h3>
                    <p>Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the
                        place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but
                        he couldn't seem to stop Jokester.</p>
                    <p>And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so
                        funny that they couldn't help but laugh. And once they started laughing, they couldn't stop.</p>
                    <h3>The People's Rebellion</h3>
                    <p>The people of the kingdom, feeling uplifted by the laughter, started to tell jokes and puns
                        again, and soon the entire kingdom was in on the joke.</p>
                    <div>
                        <table>
                            <thead>
                            <tr>
                                <th>King's Treasury</th>
                                <th>People's happiness</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Empty</td>
                                <td>Overflowing</td>
                            </tr>
                            <tr className="m-0 border-t p-0 even:bg-muted">
                                <td>Modest</td>
                                <td>Satisfied</td>
                            </tr>
                            <tr className="m-0 border-t p-0 even:bg-muted">
                                <td>Full</td>
                                <td>Ecstatic</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>The king, seeing how much happier his subjects were, realized the error of his ways and repealed
                        the joke tax. Jokester was declared a hero, and the kingdom lived happily ever after.</p>
                    <p>The moral of the story is: never underestimate the power of a good laugh and always be careful of
                        bad ideas.</p>
                </article>
                <div className="order-1 h-fit md:sticky md:top-20 md:order-2">
                    <p className="mb-2 text-lg font-semibold">Excerpt from the document</p>
                    <p className="text-muted-foreground">A comprehensive service agreement template designed for
                        professional service providers and their clients. This document outlines the scope of work,
                        deliverables, timelines, and terms of service to ensure clear expectations and protect both
                        parties' interests.</p>
                    <button
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 mt-6">
                        Download the document
                    </button>
                    <div data-orientation="horizontal" role="none"
                         className="shrink-0 bg-border h-[1px] w-full my-6"></div>
                    <div className="flex gap-3">
              <span className="relative flex shrink-0 overflow-hidden size-10 rounded-full border">
                <img className="aspect-square h-full w-full" alt="placeholder"
                     src="https://shadcnblocks.com/images/block/avatar-1.webp"/>
              </span>
                        <div>
                            <h2 className="text-sm font-medium">Reviewed by John Doe</h2>
                            <p className="text-sm text-muted-foreground">Legal Consultant</p>
                        </div>
                    </div>
                    <div data-orientation="horizontal" role="none"
                         className="shrink-0 bg-border h-[1px] w-full my-6"></div>
                    <p className="mb-4 text-sm font-medium">Key Features</p>
                    <ul className="flex flex-col gap-2">
                        <li className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" className="lucide lucide-circle-check h-4 w-4">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="m9 12 2 2 4-4"></path>
                            </svg>
                            <p>Customizable Terms</p>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check h-4 w-4">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="m9 12 2 2 4-4"></path>
                            </svg>
                            <p>Digital Signatures</p>
                        </li>
                        <li className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check h-4 w-4">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="m9 12 2 2 4-4"></path>
                            </svg>
                            <p>Clear Definitions</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    );
};

export default EntrepriseDetails;
