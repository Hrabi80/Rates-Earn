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
        <div className="container mx-auto py-32">
            <h1 className="text-3xl font-semibold">{enterpriseDetails.name}</h1>
            <p>{enterpriseDetails.description}</p>
            <p>Sector: {enterpriseDetails.sector}</p>
            <p>Size: {enterpriseDetails.size}</p>
            <p>Localisation: {enterpriseDetails.localisation}</p>
        </div>
    );
};

export default EntrepriseDetails;
