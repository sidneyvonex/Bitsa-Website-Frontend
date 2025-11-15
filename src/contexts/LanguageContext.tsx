import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'sw' | 'fr';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const savedLang = localStorage.getItem('language');
        return (savedLang as Language) || 'en';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.lang = language;
    }, [language]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    const t = (key: string): string => {
        const keys = key.split('.');
        let value: any = translations[language];

        for (const k of keys) {
            value = value?.[k];
        }

        return value || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Translations
const translations = {
    en: {
        nav: {
            home: 'Home',
            aboutUs: 'About Us',
            events: 'Events',
            blogs: 'Blogs',
            resources: 'Resources',
            communities: 'Communities',
            signIn: 'Sign in',
            signUp: 'Sign up',
            aboutBitsa: 'About BITSA',
            missionVision: 'Mission & Vision',
            ourLeaders: 'Our Leaders',
            constitution: 'Constitution',
            upcomingEvents: 'Upcoming Events',
            pastEvents: 'Past Events',
            calendarView: 'Calendar View',
            gallery: 'Gallery',
            marketplace: 'Marketplace',
            projects: 'Projects'
        },
        hero: {
            slide1: {
                title: 'Join Tech Hackathons & Competitions',
                description: 'Compete, innovate, and showcase your skills in exciting tech challenges'
            },
            slide2: {
                title: 'BITSA Marketplace',
                description: 'Buy and sell tech products, services, and projects within our community'
            },
            slide3: {
                title: 'Student Leadership & Development',
                description: 'Grow your leadership skills and shape the future of tech at UEAB'
            },
            slide4: {
                title: 'Gallery & Memories',
                description: 'Explore moments from our events, workshops, and tech community gatherings'
            }
        },
        whoAreWe: {
            title: 'Who Are We?',
            subtitle: 'Empowering Future Tech Leaders',
            description: 'BITSA (Bachelor of Information Technology Students Association) is the official student organization representing all IT students at the University of Eastern Africa, Baraton. We are dedicated to fostering innovation, collaboration, and excellence in technology.',
            mission: 'Our mission is to create a vibrant community where students can learn, grow, and excel in various technology domains.',
            learnMore: 'Learn More About Us',
            specializations: 'Our Specializations',
            softwareEngineering: 'Software Engineering',
            bbit: 'BBIT',
            networking: 'Networking',
            cyberSecurity: 'Cyber Security',
            dataAnalytics: 'Data Analytics'
        },
        upcomingEvents: {
            title: 'Upcoming Events',
            subtitle: 'Stay updated with our latest tech events and activities',
            viewAll: 'View All Events'
        },
        featuredBlogs: {
            title: 'Featured Blogs',
            subtitle: 'Latest insights and stories from our tech community',
            readMore: 'Read More',
            viewAll: 'View All Blogs'
        },
        communities: {
            title: 'Our Tech Communities',
            subtitle: 'Join specialized groups and connect with like-minded tech enthusiasts',
            joinNow: 'Join Now',
            members: 'members',
            webDev: {
                name: 'Web Development',
                description: 'Learn modern web technologies, frameworks, and best practices'
            },
            mobileDev: {
                name: 'Mobile Development',
                description: 'Build innovative mobile apps for Android and iOS platforms'
            },
            aiMl: {
                name: 'AI & Machine Learning',
                description: 'Explore artificial intelligence and machine learning technologies'
            },
            cyberSecurity: {
                name: 'Cyber Security',
                description: 'Master security practices and protect digital assets'
            },
            dataScience: {
                name: 'Data Science',
                description: 'Analyze data and extract meaningful insights using modern tools'
            },
            cloudComputing: {
                name: 'Cloud Computing',
                description: 'Learn cloud platforms and modern infrastructure solutions'
            }
        },
        projects: {
            title: 'Student Projects',
            subtitle: 'Innovative solutions built by our talented members',
            viewProject: 'View Project',
            viewAll: 'View All Projects'
        },
        testimonials: {
            title: 'Success Stories',
            subtitle: 'Hear from our members about their journey with BITSA'
        },
        partners: {
            title: 'Our Trusted Global Partners & Clients',
            subtitle: 'Collaborating with leading tech companies and organizations worldwide',
            becomePartner: 'Become a Partner',
            interested: 'Interested in partnering with BITSA?'
        },
        cta: {
            title: 'Ready to Join BITSA?',
            subtitle: 'Be part of a thriving tech community and unlock endless opportunities',
            joinNow: 'Join BITSA Now',
            learnMore: 'Learn More',
            stats: {
                members: 'Active Members',
                events: 'Events Annually',
                projects: 'Student Projects',
                partners: 'Industry Partners'
            }
        },
        footer: {
            tagline: 'Empowering the next generation of tech leaders',
            quickLinks: 'Quick Links',
            contact: 'Contact Us',
            followUs: 'Follow Us',
            rights: 'All rights reserved.',
            phone: 'Phone',
            email: 'Email',
            location: 'Location'
        }
    },
    sw: {
        nav: {
            home: 'Nyumbani',
            aboutUs: 'Kuhusu Sisi',
            events: 'Matukio',
            blogs: 'Blogu',
            resources: 'Rasilimali',
            communities: 'Jumuiya',
            signIn: 'Ingia',
            signUp: 'Jisajili',
            aboutBitsa: 'Kuhusu BITSA',
            missionVision: 'Dhamira & Maono',
            ourLeaders: 'Viongozi Wetu',
            constitution: 'Katiba',
            upcomingEvents: 'Matukio Yanayokuja',
            pastEvents: 'Matukio Yaliyopita',
            calendarView: 'Muonekano wa Kalenda',
            gallery: 'Picha',
            marketplace: 'Soko',
            projects: 'Miradi'
        },
        hero: {
            slide1: {
                title: 'Jiunge na Mashindano ya Teknolojia',
                description: 'Shindana, bunifu, na onyesha ujuzi wako katika changamoto za teknolojia'
            },
            slide2: {
                title: 'Soko la BITSA',
                description: 'Nunua na uuze bidhaa za teknolojia, huduma, na miradi ndani ya jumuiya yetu'
            },
            slide3: {
                title: 'Uongozi wa Wanafunzi & Maendeleo',
                description: 'Kua ujuzi wako wa uongozi na uunde mustakabali wa teknolojia UEAB'
            },
            slide4: {
                title: 'Picha & Kumbukumbu',
                description: 'Chunguza matukio kutoka kwa matukio, warsha, na mikutano ya jumuiya ya teknolojia'
            }
        },
        whoAreWe: {
            title: 'Sisi Ni Nani?',
            subtitle: 'Kuwezesha Viongozi wa Teknolojia wa Kesho',
            description: 'BITSA (Chama cha Wanafunzi wa Teknolojia ya Habari) ni shirika rasmi la wanafunzi linalowakili wanafunzi wote wa IT katika Chuo Kikuu cha Afrika Mashariki, Baraton. Tunajitoa kuhimiza uvumbuzi, ushirikiano, na ubora katika teknolojia.',
            mission: 'Dhamira yetu ni kuunda jumuiya yenye nguvu ambapo wanafunzi wanaweza kujifunza, kukua, na kufanikiwa katika maeneo mbalimbali ya teknolojia.',
            learnMore: 'Jifunze Zaidi Kuhusu Sisi',
            specializations: 'Utaalamu Wetu',
            softwareEngineering: 'Uhandisi wa Programu',
            bbit: 'BBIT',
            networking: 'Mitandao',
            cyberSecurity: 'Usalama wa Mtandao',
            dataAnalytics: 'Uchambuzi wa Data'
        },
        upcomingEvents: {
            title: 'Matukio Yanayokuja',
            subtitle: 'Baki ukifahamu matukio yetu mapya ya teknolojia na shughuli',
            viewAll: 'Tazama Matukio Yote'
        },
        featuredBlogs: {
            title: 'Blogu Maalum',
            subtitle: 'Maarifa na hadithi za hivi karibuni kutoka kwa jumuiya yetu ya teknolojia',
            readMore: 'Soma Zaidi',
            viewAll: 'Tazama Blogu Zote'
        },
        communities: {
            title: 'Jumuiya Zetu za Teknolojia',
            subtitle: 'Jiunge na vikundi maalum na uungane na wapenzi wa teknolojia',
            joinNow: 'Jiunge Sasa',
            members: 'wanachama',
            webDev: {
                name: 'Utengenezaji wa Wavuti',
                description: 'Jifunze teknolojia za wavuti za kisasa, mifumo, na mbinu bora'
            },
            mobileDev: {
                name: 'Utengenezaji wa Programu za Simu',
                description: 'Jenga programu za simu za ubunifu kwa mifumo ya Android na iOS'
            },
            aiMl: {
                name: 'AI & Kujifunza kwa Mashine',
                description: 'Chunguza akili bandia na teknolojia za kujifunza kwa mashine'
            },
            cyberSecurity: {
                name: 'Usalama wa Mtandao',
                description: 'Fahamu mbinu za usalama na linda mali za kidijitali'
            },
            dataScience: {
                name: 'Sayansi ya Data',
                description: 'Chambuza data na upatanishe maelezo muhimu kwa kutumia zana za kisasa'
            },
            cloudComputing: {
                name: 'Kompyuta za Wingu',
                description: 'Jifunze majukwaa ya wingu na suluhisho za kisasa za miundombinu'
            }
        },
        projects: {
            title: 'Miradi ya Wanafunzi',
            subtitle: 'Suluhisho za ubunifu zilizojengwa na wanachama wetu wenye vipaji',
            viewProject: 'Tazama Mradi',
            viewAll: 'Tazama Miradi Yote'
        },
        testimonials: {
            title: 'Hadithi za Mafanikio',
            subtitle: 'Sikia kutoka kwa wanachama wetu kuhusu safari yao na BITSA'
        },
        partners: {
            title: 'Washirika Wetu wa Kimataifa Wanaoaminika',
            subtitle: 'Kushirikiana na makampuni na mashirika ya teknolojia duniani kote',
            becomePartner: 'Kuwa Mshirika',
            interested: 'Una nia ya kushirikiana na BITSA?'
        },
        cta: {
            title: 'Uko Tayari Kujiunge na BITSA?',
            subtitle: 'Kuwa sehemu ya jumuiya ya teknolojia inayostawi na kufungua fursa zisizo na kikomo',
            joinNow: 'Jiunge na BITSA Sasa',
            learnMore: 'Jifunze Zaidi',
            stats: {
                members: 'Wanachama Hai',
                events: 'Matukio Kila Mwaka',
                projects: 'Miradi ya Wanafunzi',
                partners: 'Washirika wa Viwanda'
            }
        },
        footer: {
            tagline: 'Kuwezesha kizazi kijacho cha viongozi wa teknolojia',
            quickLinks: 'Viungo vya Haraka',
            contact: 'Wasiliana Nasi',
            followUs: 'Tufuate',
            rights: 'Haki zote zimehifadhiwa.',
            phone: 'Simu',
            email: 'Barua Pepe',
            location: 'Mahali'
        }
    },
    fr: {
        nav: {
            home: 'Accueil',
            aboutUs: 'À Propos',
            events: 'Événements',
            blogs: 'Blogs',
            resources: 'Ressources',
            communities: 'Communautés',
            signIn: 'Se connecter',
            signUp: "S'inscrire",
            aboutBitsa: 'À propos de BITSA',
            missionVision: 'Mission & Vision',
            ourLeaders: 'Nos Leaders',
            constitution: 'Constitution',
            upcomingEvents: 'Événements à Venir',
            pastEvents: 'Événements Passés',
            calendarView: 'Vue Calendrier',
            gallery: 'Galerie',
            marketplace: 'Marché',
            projects: 'Projets'
        },
        hero: {
            slide1: {
                title: 'Rejoignez les Hackathons & Compétitions Tech',
                description: 'Compétitionnez, innovez et démontrez vos compétences dans des défis tech passionnants'
            },
            slide2: {
                title: 'Marché BITSA',
                description: 'Achetez et vendez des produits tech, services et projets au sein de notre communauté'
            },
            slide3: {
                title: 'Leadership Étudiant & Développement',
                description: 'Développez vos compétences en leadership et façonnez l\'avenir de la tech à UEAB'
            },
            slide4: {
                title: 'Galerie & Souvenirs',
                description: 'Explorez les moments de nos événements, ateliers et rassemblements de la communauté tech'
            }
        },
        whoAreWe: {
            title: 'Qui Sommes-Nous?',
            subtitle: 'Autonomiser les Futurs Leaders Tech',
            description: 'BITSA (Association des Étudiants en Technologies de l\'Information) est l\'organisation officielle représentant tous les étudiants en IT à l\'Université d\'Afrique de l\'Est, Baraton. Nous nous consacrons à favoriser l\'innovation, la collaboration et l\'excellence en technologie.',
            mission: 'Notre mission est de créer une communauté dynamique où les étudiants peuvent apprendre, grandir et exceller dans divers domaines technologiques.',
            learnMore: 'En Savoir Plus Sur Nous',
            specializations: 'Nos Spécialisations',
            softwareEngineering: 'Génie Logiciel',
            bbit: 'BBIT',
            networking: 'Réseautage',
            cyberSecurity: 'Cybersécurité',
            dataAnalytics: 'Analyse de Données'
        },
        upcomingEvents: {
            title: 'Événements à Venir',
            subtitle: 'Restez informé de nos derniers événements et activités tech',
            viewAll: 'Voir Tous les Événements'
        },
        featuredBlogs: {
            title: 'Blogs en Vedette',
            subtitle: 'Dernières perspectives et histoires de notre communauté tech',
            readMore: 'Lire Plus',
            viewAll: 'Voir Tous les Blogs'
        },
        communities: {
            title: 'Nos Communautés Tech',
            subtitle: 'Rejoignez des groupes spécialisés et connectez-vous avec des passionnés de tech',
            joinNow: 'Rejoindre Maintenant',
            members: 'membres',
            webDev: {
                name: 'Développement Web',
                description: 'Apprenez les technologies web modernes, frameworks et meilleures pratiques'
            },
            mobileDev: {
                name: 'Développement Mobile',
                description: 'Créez des applications mobiles innovantes pour Android et iOS'
            },
            aiMl: {
                name: 'IA & Apprentissage Automatique',
                description: 'Explorez l\'intelligence artificielle et les technologies d\'apprentissage automatique'
            },
            cyberSecurity: {
                name: 'Cybersécurité',
                description: 'Maîtrisez les pratiques de sécurité et protégez les actifs numériques'
            },
            dataScience: {
                name: 'Science des Données',
                description: 'Analysez les données et extrayez des insights significatifs avec des outils modernes'
            },
            cloudComputing: {
                name: 'Cloud Computing',
                description: 'Apprenez les plateformes cloud et solutions d\'infrastructure modernes'
            }
        },
        projects: {
            title: 'Projets Étudiants',
            subtitle: 'Solutions innovantes créées par nos membres talentueux',
            viewProject: 'Voir le Projet',
            viewAll: 'Voir Tous les Projets'
        },
        testimonials: {
            title: 'Histoires de Réussite',
            subtitle: 'Écoutez nos membres parler de leur parcours avec BITSA'
        },
        partners: {
            title: 'Nos Partenaires & Clients Mondiaux de Confiance',
            subtitle: 'Collaboration avec des entreprises et organisations tech de premier plan dans le monde',
            becomePartner: 'Devenir Partenaire',
            interested: 'Intéressé à devenir partenaire de BITSA?'
        },
        cta: {
            title: 'Prêt à Rejoindre BITSA?',
            subtitle: 'Faites partie d\'une communauté tech florissante et débloquez des opportunités infinies',
            joinNow: 'Rejoindre BITSA Maintenant',
            learnMore: 'En Savoir Plus',
            stats: {
                members: 'Membres Actifs',
                events: 'Événements Annuels',
                projects: 'Projets Étudiants',
                partners: 'Partenaires Industriels'
            }
        },
        footer: {
            tagline: 'Autonomiser la prochaine génération de leaders tech',
            quickLinks: 'Liens Rapides',
            contact: 'Contactez-Nous',
            followUs: 'Suivez-Nous',
            rights: 'Tous droits réservés.',
            phone: 'Téléphone',
            email: 'Email',
            location: 'Emplacement'
        }
    }
};
