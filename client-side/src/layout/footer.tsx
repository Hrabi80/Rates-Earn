import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import React from "react";
import "./../app/globals.css";
import Contact from '../components/contact';

const sections = [
  {
    title: "Liens légaux",
    links: [
      { name: "Mentions légales", href: "#" },
      { name: "conditions d’utilisation", href: "#" },
      { name: "politique de confidentialité", href: "#" },
    ],
  },
];

const Footer : React.FC = () => {
  return (
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto">
          <footer>
            <div className="flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-left">
              <div className="liens-legaux">
                <div><h3 className="mb-6 font-bold">Liens légaux</h3>
                  <ul className="space-y-4 text-sm text-muted-foreground">
                    <li className="font-medium hover:text-primary"><a href="#">Mentions légales</a></li>
                    <li className="font-medium hover:text-primary"><a href="#">conditions d’utilisation</a></li>
                    <li className="font-medium hover:text-primary"><a href="#">politique de confidentialité</a></li>
                  </ul>
                </div>
              </div>
              <div className="reseaux-sociaux">
                <ul className="flex items-center space-x-6 text-muted-foreground">
                  <li className="font-medium hover:text-primary">
                    <a href="#">
                      <FaInstagram className="size-8"/>
                    </a>
                  </li>
                  <li className="font-medium hover:text-primary">
                    <a href="#">
                      <FaFacebook className="size-8"/>
                    </a>
                  </li>
                  <li className="font-medium hover:text-primary">
                    <a href="#">
                      <FaTwitter className="size-8"/>
                    </a>
                  </li>
                  <li className="font-medium hover:text-primary">
                    <a href="#">
                      <FaLinkedin className="size-8"/>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="contact">
                <Contact/>
              </div>
            </div>
          </footer>
        </div>
      </section>
  );
};

export default Footer;
