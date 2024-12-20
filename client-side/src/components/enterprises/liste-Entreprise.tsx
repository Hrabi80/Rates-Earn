'use client';
import {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {Trophy, ArrowRight} from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";

export default function Listeentreprise() {
    const [achievements, setAchievements] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Nombre d'éléments à afficher par page
   // const navigate = useNavigate(); // Hook pour la navigation

    // const handleViewEntreprise = (id: number) => {
    //     navigate(`/entreprise/${id}`); // Redirige vers la page de détails avec l'ID de l'entreprise
    // };

    useEffect(() => {
        async function fetchData() {
            const data = [
                { id: 1, name: "Outstanding Performance Award", sector: "Industry Recognition", size: "100", localisation: "Sfax", culture: "#" },
                { id: 2, name: "Best Innovation Award", sector: "Tech Industry", size: "50", localisation: "Tunis", culture: "#" },
                { id: 3, name: "Best Innovation Award", sector: "Tech Industry", size: "50", localisation: "Tunis", culture: "#" },
                { id: 4, name: "Best Innovation Award", sector: "Tech Industry", size: "50", localisation: "Tunis", culture: "#" },
                { id: 5, name: "Best Innovation Award", sector: "Tech Industry", size: "50", localisation: "Tunis", culture: "#" },
                { id: 6, name: "Best Innovation Award", sector: "Tech Industry", size: "50", localisation: "Tunis", culture: "#" },
            ];
            setAchievements(data);
        }
        fetchData();
    }, []);

    // Calcul des lignes à afficher en fonction de la page actuelle
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = achievements.slice(indexOfFirstItem, indexOfLastItem);

    // Gérer la pagination
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <section className="container mx-auto py-32">
            <div className="container px-0 md:px-8">
                <h1 className="mb-10 px-4 text-3xl font-semibold md:mb-14 md:text-4xl">
                    Liste des Entreprises
                </h1>

                {/* Ajout de la table */}
                <table className="min-w-full table-auto">
                    <thead>
                    <tr className="border-b">
                        <th className="px-4 py-2 text-left">Nom</th>
                        <th className="px-4 py-2 text-left">Secteur</th>
                        <th className="px-4 py-2 text-left">Taille</th>
                        <th className="px-4 py-2 text-left">Localisation</th>
                        <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.map((achievement) => (
                        <tr key={achievement.id} className="border-b">
                            <td className="px-4 py-2">{achievement.name}</td>
                            <td className="px-4 py-2">{achievement.sector}</td>
                            <td className="px-4 py-2">{achievement.size}</td>
                            <td className="px-4 py-2">{achievement.localisation}</td>
                            <td className="px-4 py-2">
                                <Button
                                    variant="outline"
                                    className="w-fit gap-2"
                                    onClick={() => handleViewEntreprise(achievement.id)} // Redirige l'utilisateur
                                >
                                    <span>View Entreprise</span>
                                    <ArrowRight className="h-4 w-4"/>
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <Separator className="w-full"/>
            </div>

            {/* Pagination */}
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            href="#"
                        />
                    </PaginationItem>
                    {[...Array(Math.ceil(achievements.length / itemsPerPage))].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                isActive={currentPage === index + 1}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === Math.ceil(achievements.length / itemsPerPage)}
                            href="#"
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </section>
    );
}
