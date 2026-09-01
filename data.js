// ════════════════════════════════════════════════
// CONFIGURATION DES AXES
// ════════════════════════════════════════════════
const axes = ["pana", "coop", "econ", "reli", "soci", "demo", "decent"];

const axesConfig = {
    pana: { name: "Panarabisme", leftLabel: "Panarabisme", rightLabel: "Nationalisme", leftColor: "#047857", rightColor: "#dc2626" },
    coop: { name: "Coopération", leftLabel: "Internationalisme", rightLabel: "Souverainisme", leftColor: "#2563eb", rightColor: "#4b5563" },
    econ: { name: "Économie", leftLabel: "Socialisme", rightLabel: "Libéralisme", leftColor: "#b91c1c", rightColor: "#eab308" },
    reli: { name: "Religion", leftLabel: "Islamisme", rightLabel: "Sécularisme", leftColor: "#15803d", rightColor: "#9333ea" },
    soci: { name: "Sociétal", leftLabel: "Conservatisme", rightLabel: "Progressisme", leftColor: "#d97706", rightColor: "#db2777" },
    demo: { name: "Démocratie", leftLabel: "Démocratie", rightLabel: "Autoritarisme", leftColor: "#0ea5e9", rightColor: "#1e293b" },
    decent: { name: "Gouvernance", leftLabel: "Décentralisation", rightLabel: "Centralisation", leftColor: "#4f46e5", rightColor: "#64748b" }
};

const specialLabels = {
    "25juillet": "Soutien au 25 Juillet",
    "maghreb": "Union du Maghreb",
    "monarchie": "Monarchiste",
    "ugtt": "Soutien à l'UGTT",
    "ks": "Pro-Kaïs Saïed",
    "2011": "Critique de 2011",
    "afrique": "Union Africaine"
};

// ════════════════════════════════════════════════
// PARTIS TUNISIENS (INTACTS - Système de zone)
// ════════════════════════════════════════════════
const ideologies = [
    {
        "id": "ennahdha",
        "name": "Ennahdha",
        "image": "images/ennahdha.png",
        "range_vector": {
            "pana": [
                -60,
                -20
            ],
            "coop": [
                -80,
                -40
            ],
            "econ": [
                20,
                60
            ],
            "reli": [
                -85,
                -50
            ],
            "soci": [
                -85,
                -45
            ],
            "demo": [
                -90,
                -60
            ],
            "decent": [
                -100,
                -70
            ]
        },
        "populism": 40,
        "vetos": {
            "reli_separation": {
                "val": 0.9,
                "type": "greater"
            },
            "soci_lgbt": {
                "val": 0.4,
                "type": "greater"
            },
            "ctx_party": {
                "val": 0.4,
                "type": "greater"
            }
        }
    },
    {
        "id": "pdl",
        "name": "Parti Destourien Libre",
        "image": "images/pdl.png",
        "range_vector": {
            "pana": [
                60,
                100
            ],
            "coop": [
                -30,
                20
            ],
            "econ": [
                0,
                60
            ],
            "reli": [
                70,
                100
            ],
            "soci": [
                -30,
                20
            ],
            "demo": [
                50,
                85
            ],
            "decent": [
                70,
                100
            ]
        },
        "populism": 60,
        "vetos": {
            "spec_2011": {
                "val": -0.1,
                "type": "less"
            },
            "reli_parties": {
                "val": 0.4,
                "type": "greater"
            },
            "ctx_ben": {
                "val": -0.1,
                "type": "less"
            },
            "spec_bourguiba": {
                "val": -0.1,
                "type": "less"
            }
        }
    },
    {
        "id": "echaab",
        "name": "Mouvement Echaâb",
        "image": "images/echaab.png",
        "range_vector": {
            "pana": [
                -100,
                -70
            ],
            "coop": [
                0,
                50
            ],
            "econ": [
                -70,
                -30
            ],
            "reli": [
                0,
                40
            ],
            "soci": [
                -30,
                20
            ],
            "demo": [
                -20,
                20
            ],
            "decent": [
                -40,
                30
            ]
        },
        "populism": 70,
        "vetos": {
            "pana_no_arab": {
                "val": 0.4,
                "type": "greater"
            },
            "ctx_dl54": {
                "val": 0.4,
                "type": "greater"
            }
        }
    },
    {
        "id": "afek",
        "name": "Afek Tounes",
        "image": "images/afektounes.png",
        "range_vector": {
            "pana": [
                30,
                80
            ],
            "coop": [
                -100,
                -60
            ],
            "econ": [
                60,
                100
            ],
            "reli": [
                50,
                90
            ],
            "soci": [
                40,
                100
            ],
            "demo": [
                -100,
                -80
            ],
            "decent": [
                -90,
                -40
            ]
        },
        "populism": 0,
        "vetos": {
            "econ_no_private": {
                "val": 0.4,
                "type": "greater"
            },
            "econ_corrupt_elite": {
                "val": 0.9,
                "type": "greater"
            },
            "demo_authoritarian": {
                "val": 0.4,
                "type": "greater"
            },
            "spec_ks": {
                "val": 0.4,
                "type": "greater"
            },
            "ctx_infl": {
                "val": 0.4,
                "type": "greater"
            },
            "ctx_dl54": {
                "val": 0.4,
                "type": "greater"
            },
            "ctx_mig": {
                "val": 0.9,
                "type": "greater"
            }
        }
    },
    {
        "id": "pt",
        "name": "Parti des Travailleurs",
        "image": "images/pt.png",
        "range_vector": {
            "pana": [
                -50,
                0
            ],
            "coop": [
                -10,
                50
            ],
            "econ": [
                -100,
                -80
            ],
            "reli": [
                80,
                100
            ],
            "soci": [
                70,
                100
            ],
            "demo": [
                -80,
                -30
            ],
            "decent": [
                -40,
                0
            ]
        },
        "populism": 60,
        "vetos": {
            "econ_competition": {
                "val": 0.4,
                "type": "greater"
            },
            "econ_privatization": {
                "val": 0.4,
                "type": "greater"
            },
            "spec_ugtt": {
                "val": -0.1,
                "type": "less"
            }
        }
    },
    {
        "id": "alkarama",
        "name": "Coalition Al Karama",
        "image": "images/alkarama.png",
        "range_vector": {
            "pana": [
                -90,
                -60
            ],
            "coop": [
                70,
                100
            ],
            "econ": [
                -70,
                -30
            ],
            "reli": [
                -100,
                -80
            ],
            "soci": [
                -100,
                -80
            ],
            "demo": [
                10,
                60
            ],
            "decent": [
                60,
                90
            ]
        },
        "populism": 95,
        "vetos": {
            "reli_separation": {
                "val": 0.4,
                "type": "greater"
            },
            "soci_lgbt": {
                "val": 0.4,
                "type": "greater"
            },
            "spec_2011": {
                "val": -0.1,
                "type": "less"
            },
            "reli_sharia": {
                "val": -0.1,
                "type": "less"
            },
            "reli_parties": {
                "val": -0.1,
                "type": "less"
            }
        }
    },
    {
        "id": "attayar",
        "name": "Courant Démocrate (Attayar)",
        "image": "images/attayar.png",
        "range_vector": {
            "pana": [
                -30,
                10
            ],
            "coop": [
                10,
                60
            ],
            "econ": [
                -40,
                10
            ],
            "reli": [
                50,
                80
            ],
            "soci": [
                10,
                60
            ],
            "demo": [
                -100,
                -70
            ],
            "decent": [
                -50,
                -10
            ]
        },
        "populism": 35,
        "vetos": {
            "ctx_dl54": {
                "val": 0.4,
                "type": "greater"
            },
            "ctx_civ": {
                "val": 0.4,
                "type": "greater"
            },
            "ctx_gabes": {
                "val": -0.1,
                "type": "less"
            }
        }
    },
    {
        "id": "ettakatol",
        "name": "Ettakatol",
        "image": "images/ettakatol.png",
        "range_vector": {
            "pana": [
                -10,
                40
            ],
            "coop": [
                -70,
                -100
            ],
            "econ": [
                -30,
                20
            ],
            "reli": [
                70,
                100
            ],
            "soci": [
                70,
                100
            ],
            "demo": [
                -100,
                -80
            ],
            "decent": [
                -80,
                -50
            ]
        },
        "populism": 0,
        "vetos": {
            "demo_strong_leader": {
                "val": 0.9,
                "type": "greater"
            },
            "spec_2011": {
                "val": 0.4,
                "type": "greater"
            },
            "ctx_gabes": {
                "val": -0.1,
                "type": "less"
            }
        }
    },
    {
        "id": "aljoumhouri",
        "name": "Al Joumhouri",
        "image": "images/aljoumhouri.png",
        "range_vector": {
            "pana": [
                10,
                50
            ],
            "coop": [
                -50,
                -10
            ],
            "econ": [
                -20,
                20
            ],
            "reli": [
                40,
                80
            ],
            "soci": [
                30,
                80
            ],
            "demo": [
                -100,
                -70
            ],
            "decent": [
                -70,
                -30
            ]
        },
        "populism": 0,
        "vetos": {
            "demo_authoritarian": {
                "val": 0.4,
                "type": "greater"
            },
            "spec_ks": {
                "val": 0.4,
                "type": "greater"
            },
            "spec_2011": {
                "val": 0.4,
                "type": "greater"
            },
            "ctx_party": {
                "val": 0.4,
                "type": "greater"
            },
            "ctx_nsf": {
                "val": 0.4,
                "type": "greater"
            }
        }
    },
    {
        "id": "baath",
        "name": "Parti Baath",
        "image": "images/baath.png",
        "range_vector": {
            "pana": [
                -100,
                -80
            ],
            "coop": [
                20,
                100
            ],
            "econ": [
                -80,
                -40
            ],
            "reli": [
                0,
                80
            ],
            "soci": [
                -50,
                50
            ],
            "demo": [
                80,
                100
            ],
            "decent": [
                50,
                100
            ]
        },
        "populism": 70,
        "vetos": {
            "pana_no_arab": {
                "val": 0.4,
                "type": "greater"
            }
        }
    },
    {
        "id": "25jul",
        "name": "Mouvement du 25-Juillet",
        "image": "images/almassar.png",
        "range_vector": {
            "pana": [
                -60,
                20
            ],
            "coop": [
                40,
                100
            ],
            "econ": [
                -60,
                10
            ],
            "reli": [
                -20,
                30
            ],
            "soci": [
                -80,
                -30
            ],
            "demo": [
                50,
                100
            ],
            "decent": [
                -100,
                60
            ]
        },
        "populism": 90,
        "vetos": {
            "spec_25jul": {
                "val": -0.1,
                "type": "less"
            },
            "ctx_imf": {
                "val": -0.1,
                "type": "less"
            },
            "ctx_nsf": {
                "val": -0.1,
                "type": "less"
            },
            "ctx_amb": {
                "val": -0.1,
                "type": "less"
            },
            "ctx_party": {
                "val": -0.1,
                "type": "less"
            }
        }
    },
    {
        "id": "tnp",
        "name": "Parti Nationaliste Tunisien",
        "image": "images/tnp.png",
        "range_vector": {
            "pana": [
                80,
                100
            ],
            "coop": [
                60,
                100
            ],
            "econ": [
                -60,
                -20
            ],
            "reli": [
                -20,
                30
            ],
            "soci": [
                -80,
                -30
            ],
            "demo": [
                80,
                100
            ],
            "decent": [
                0,
                80
            ]
        },
        "populism": 90,
        "vetos": {
            "spec_25jul": {
                "val": -0.1,
                "type": "less"
            },
            "ctx_sub": {
                "val": -0.1,
                "type": "less"
            }
        }
    },
    {
        "id": "upl",
        "name": "Union Patriotique Libre",
        "image": "images/UPL.png",
        "range_vector": {
            "pana": [
                20,
                100
            ],
            "coop": [
                -40,
                20
            ],
            "econ": [
                40,
                80
            ],
            "reli": [
                40,
                80
            ],
            "soci": [
                20,
                70
            ],
            "demo": [
                -40,
                20
            ],
            "decent": [
                20,
                60
            ]
        },
        "populism": 20,
        "vetos": {}
    },
    {
        "id": "pl",
        "name": "Parti Libéral Tunisien",
        "image": "images/pl.png",
        "range_vector": {
            "pana": [
                80,
                100
            ],
            "coop": [
                -100,
                -80
            ],
            "econ": [
                60,
                100
            ],
            "reli": [
                90,
                100
            ],
            "soci": [
                90,
                100
            ],
            "demo": [
                -100,
                -80
            ],
            "decent": [
                -100,
                -60
            ]
        },
        "populism": 10,
        "vetos": {
            "pana_diplo": {
                "val": -0.1,
                "type": "less"
            },
            "pana_national_interest": {
                "val": -0.1,
                "type": "less"
            },
            "pana_unity": {
                "val": 0.9,
                "type": "greater"
            },
            "pana_conflict": {
                "val": 0.9,
                "type": "greater"
            },
            "pana_alliances": {
                "val": 0.9,
                "type": "greater"
            },
            "reli_separation": {
                "val": -0.1,
                "type": "less"
            },
            "soci_lgbt": {
                "val": -0.1,
                "type": "less"
            },
            "ctx_normalisation": {
                "val": 0.4,
                "type": "greater"
            }
        }
    },
    {
        "id": "watad",
        "name": "Mouvement des Patriotes Démocrates (Watad)",
        "image": "images/watad.png",
        "range_vector": {
            "pana": [
                -100,
                -80
            ],
            "coop": [
                70,
                100
            ],
            "econ": [
                -100,
                -80
            ],
            "reli": [
                80,
                100
            ],
            "soci": [
                70,
                100
            ],
            "demo": [
                20,
                60
            ],
            "decent": [
                -40,
                0
            ]
        },
        "populism": 60,
        "vetos": {
            "pana_no_arab": {
                "val": 0.4,
                "type": "greater"
            },
            "econ_privatization": {
                "val": 0.4,
                "type": "greater"
            },
            "spec_ugtt": {
                "val": -0.1,
                "type": "less"
            },
            "ctx_civ": {
                "val": -0.1,
                "type": "less"
            },
            "ctx_normalisation": {
                "val": -0.1,
                "type": "less"
            }
        }
    },
    {
        "id": "massar",
        "name": "Al Massar",
        "image": "images/almassarsd.png",
        "range_vector": {
            "pana": [
                -10,
                30
            ],
            "coop": [
                -40,
                0
            ],
            "econ": [
                -60,
                -20
            ],
            "reli": [
                60,
                95
            ],
            "soci": [
                70,
                100
            ],
            "demo": [
                -100,
                -80
            ],
            "decent": [
                -60,
                -20
            ]
        },
        "populism": 15,
        "vetos": {
            "ctx_ugtt": {
                "val": 0.4,
                "type": "greater"
            },
            "econ_inequality": {
                "val": 0.9,
                "type": "greater"
            }
        }
    },
    {
        "id": "tahya",
        "name": "Tahya Tounes",
        "image": "images/tahyatounes.png",
        "range_vector": {
            "pana": [
                20,
                70
            ],
            "coop": [
                -100,
                -60
            ],
            "econ": [
                20,
                70
            ],
            "reli": [
                20,
                70
            ],
            "soci": [
                20,
                70
            ],
            "demo": [
                -55,
                -15
            ],
            "decent": [
                -25,
                25
            ]
        },
        "populism": 30,
        "vetos": {
            "spec_bourguiba": {
                "val": -0.9,
                "type": "less"
            },
            "econ_no_private": {
                "val": 0.4,
                "type": "greater"
            }
        }
    },
    {
        "id": "beni",
        "name": "Beni Watani",
        "image": "images/beniwatani.png",
        "range_vector": {
            "pana": [
                15,
                50
            ],
            "coop": [
                -50,
                0
            ],
            "econ": [
                -10,
                30
            ],
            "reli": [
                20,
                70
            ],
            "soci": [
                20,
                70
            ],
            "demo": [
                -70,
                -15
            ],
            "decent": [
                -30,
                -5
            ]
        },
        "populism": 5,
        "vetos": {
            "econ_services": {
                "val": -0.1,
                "type": "less"
            },
            "spec_bourguiba": {
                "val": -0.9,
                "type": "less"
            }
        }
    },
    {
        "id": "frontpopulaire",
        "name": "Front Populaire",
        "image": "images/fp.png",
        "range_vector": {
            "pana": [
                -85,
                -30
            ],
            "coop": [
                -20,
                50
            ],
            "econ": [
                -100,
                -75
            ],
            "reli": [
                75,
                100
            ],
            "soci": [
                40,
                100
            ],
            "demo": [
                -75,
                -20
            ],
            "decent": [
                -70,
                -25
            ]
        },
        "populism": 60,
        "vetos": {
            "ctx_normalisation": {
                "val": -0.1,
                "type": "less"
            },
            "ctx_ugtt": {
                "val": 0.4,
                "type": "greater"
            },
            "econ_privatization": {
                "val": 0.4,
                "type": "greater"
            }
        }
    }
];

// ════════════════════════════════════════════════
// ÉQUIVALENTS INTERNATIONAUX (France 🇫🇷, Belgique 🇧🇪, Québec ⚜️)
// ════════════════════════════════════════════════
const internationalEquivalents = {
    _countryMeta: {
        tn: { name: "Tunisie", flag: "images/flag_tn.svg" },
        fr: { name: "France", flag: "images/flag_fr.svg" },
        be: { name: "Belgique", flag: "images/flag_be.svg" },
        qc: { name: "Québec", flag: "images/flag_qc.svg" }
    },
    ennahdha: {
        fr: null,
        be: null,
        qc: null
    },
    pdl: {
        fr: {
            name: "Les Républicains (LR)",
            desc: "Droite républicaine d'autorité, laïcité stricte, filiation historique RPR/UMP et centralisme d'État."
        },
        be: null,
        qc: {
            name: "Coalition Avenir Québec (CAQ)",
            desc: "Nationalisme civique, autorité de l'État et laïcité stricte des institutions (Loi 21)."
        }
    },
    echaab: {
        fr: null,
        be: null,
        qc: null
    },
    afek: {
        fr: {
            name: "Renaissance / MoDem",
            desc: "Libéralisme économique, réformisme pro-marché et intégration internationale."
        },
        be: {
            name: "Mouvement Réformateur (MR) / Open VLD",
            desc: "Libéralisme institutionnel, compétitivité économique et ouverture européenne."
        },
        qc: {
            name: "Parti Libéral du Québec (PLQ)",
            desc: "Pragmatisme des affaires, libre-marché et réformisme institutionnel."
        }
    },
    pt: {
        fr: {
            name: "Nouveau Parti Anticapitaliste (NPA)",
            desc: "Lutte des classes, marxisme révolutionnaire et syndicalisme ouvrier combatif."
        },
        be: {
            name: "Parti du Travail de Belgique (PTB-PVDA)",
            desc: "Marxisme combatif, défense intransigeante de la classe travailleuse et justice sociale."
        },
        qc: {
            name: "Parti Communiste du Québec (PCQ)",
            desc: "Socialisme anticapitaliste, internationalisme prolétarien et rupture avec le libéralisme."
        }
    },
    alkarama: {
        fr: null,
        be: {
            name: "Parti ISLAM",
            desc: "Revendication politique confessionnelle et conservatisme religieux."
        },
        qc: null
    },
    attayar: {
        fr: {
            name: "Parti Socialiste (PS)",
            desc: "Social-démocratie républicaine, combat anticorruption, moralisation publique et primauté de l'État de droit."
        },
        be: {
            name: "Parti Socialiste (PS belge) / Vooruit",
            desc: "Social-démocratie réformatrice, défense des services publics et gouvernance éthique."
        },
        qc: {
            name: "Québec Solidaire (QS)",
            desc: "Justice sociale, intégrité politique, redistribution et institutions démocratiques."
        }
    },
    ettakatol: {
        fr: {
            name: "Place Publique (PP) / Parti Socialiste (PS)",
            desc: "Social-démocratie réformiste européenne, humanisme civique et centre-gauche démocrate."
        },
        be: {
            name: "Parti Socialiste (PS belge)",
            desc: "Social-démocratie modérée, concertation sociale et progressisme équilibré."
        },
        qc: {
            name: "Parti Québécois (PQ - aile sociale-démocrate)",
            desc: "Tradition sociale-démocrate réformiste, interventionnisme étatique modéré et modèle civique."
        }
    },
    aljoumhouri: {
        fr: {
            name: "MoDem (Mouvement Démocrate)",
            desc: "Centrisme républicain, modération démocratique, humanisme et réformisme institutionnel."
        },
        be: {
            name: "Les Engagés / DéFI",
            desc: "Centrisme rénové, équilibre des pouvoirs et défense des libertés civiles."
        },
        qc: {
            name: "Parti Libéral du Québec (aile centriste)",
            desc: "Centrisme institutionnel réformateur et modération politique."
        }
    },
    baath: {
        fr: null,
        be: null,
        qc: null
    },
    "25jul": {
        fr: null,
        be: null,
        qc: null
    },
    tnp: {
        fr: {
            name: "Reconquête!",
            desc: "Nationalisme identitaire sans concession, priorité nationale et discours sécuritaire anti-immigration."
        },
        be: {
            name: "Chez Nous / Vlaams Belang",
            desc: "Nationalisme identitaire radical, souverainisme strict et contrôle dur des frontières."
        },
        qc: {
            name: "Courants nationalistes identitaires",
            desc: "Nationalisme identitaire strict et préservation culturelle sans compromis."
        }
    },
    upl: {
        fr: {
            name: "Parti Radical / Aile libérale-pragmatique",
            desc: "Centrisme pragmatique, libéralisme économique et politique d'investissements."
        },
        be: {
            name: "Mouvement Réformateur (MR)",
            desc: "Gestion pragmatique, promotion de l'entrepreneuriat et libéralisme économique."
        },
        qc: {
            name: "Coalition Avenir Québec (CAQ - volet économique)",
            desc: "Pragmatisme des affaires, relance économique et gestion entrepreneuriale."
        }
    },
    pl: {
        fr: {
            name: "Parti Libéral Démocrate / Mouvements libertariens",
            desc: "Libertarianisme, libertés individuelles maximales, laïcité totale et marché dérégulé."
        },
        be: {
            name: "Parti Libertarien Belge / Open VLD (aile libertarienne)",
            desc: "Défense absolue des droits individuels, anti-étatisme et liberté totale de conscience."
        },
        qc: {
            name: "Parti Libertarien du Québec",
            desc: "Libertés individuelles absolues, gouvernement minimal et libéralisme sociétal intégral."
        }
    },
    watad: {
        fr: {
            name: "PRCF (Pôle de Renaissance Communiste en France)",
            desc: "Marxisme-léninisme orthodoxe, anti-impérialisme radical, laïcité sans compromis et souverainisme populaire."
        },
        be: {
            name: "Parti Communiste de Belgique (PCB-CPB)",
            desc: "Marxisme révolutionnaire, anti-impérialisme et engagement ouvrier historique."
        },
        qc: {
            name: "Parti Communiste du Québec",
            desc: "Marxisme conséquent, anticolonialisme et émancipation des classes laborieuses."
        }
    },
    massar: {
        fr: {
            name: "Parti Communiste Français (PCF)",
            desc: "Gauche républicaine historique, progrès social, défense des services publics et laïcité."
        },
        be: {
            name: "Parti Socialiste (aile gauche)",
            desc: "Gauche républicaine et syndicale, transformation sociale et justice distributive."
        },
        qc: {
            name: "Québec Solidaire (QS)",
            desc: "Gauche progressiste, justice sociale, égalité des droits et réformisme démocratique."
        }
    },
    tahya: {
        fr: {
            name: "Renaissance",
            desc: "Centre moderniste gestionnaire, technocratie d'État et continuité des réformes libérales."
        },
        be: {
            name: "Mouvement Réformateur (MR)",
            desc: "Centre-droit gestionnaire, modernisation administrative et soutien à l'activité économique."
        },
        qc: {
            name: "Parti Libéral du Québec (PLQ)",
            desc: "Gestion gouvernementale pragmatique, modernisme institutionnel et modération."
        }
    },
    beni: {
        fr: {
            name: "MoDem (Mouvement Démocrate)",
            desc: "Centrisme républicain, éthique publique et réformes douces."
        },
        be: {
            name: "Les Engagés",
            desc: "Centrisme progressiste, participation citoyenne et modération."
        },
        qc: {
            name: "Parti Libéral du Québec (aile centriste)",
            desc: "Centrisme pragmatique et modération politique."
        }
    },
    frontpopulaire: {
        fr: {
            name: "Nouveau Front Populaire (NFP)",
            desc: "Rassemblement des gauches sociales, écologistes et républicaines contre l'austérité et pour la justice sociale."
        },
        be: null,
        qc: {
            name: "Québec Solidaire (QS)",
            desc: "Coalition unitaire des mouvements citoyens, syndicaux et de gauche écologiste."
        }
    }
};

const personalities = [
    {
        "id": "rached_ghannouchi",
        "name": "Rached Ghannouchi",
        "image": "images/rached_ghannouchi.png",
        "vector": {
            "pana": -40,
            "coop": -60,
            "econ": 40,
            "reli": -67,
            "soci": -65,
            "demo": -75,
            "decent": -85
        },
        "populism": 40,
        "vetos": {
            "reli_separation": {
                "val": 0.9,
                "type": "greater"
            },
            "soci_lgbt": {
                "val": 0.4,
                "type": "greater"
            },
            "reli_parties": {
                "val": -0.9,
                "type": "less"
            }
        },
        "boosts": {
            "reli_parties": {
                "val": 0.9,
                "type": "greater",
                "bonus": 10
            },
            "reli_politics": {
                "val": 0.9,
                "type": "greater",
                "bonus": 10
            }
        }
    },
    {
        "id": "abir_moussi",
        "name": "Abir Moussi",
        "image": "images/abir_moussi.png",
        "vector": {
            "pana": 80,
            "coop": -5,
            "econ": 30,
            "reli": 85,
            "soci": -5,
            "demo": 67,
            "decent": 85
        },
        "populism": 80,
        "vetos": {
            "spec_2011": {
                "val": -0.1,
                "type": "less"
            },
            "reli_parties": {
                "val": 0.4,
                "type": "greater"
            },
            "reli_sharia": {
                "val": 0.4,
                "type": "greater"
            },
            "ctx_ben": {
                "val": -0.1,
                "type": "less"
            },
            "spec_bourguiba": {
                "val": -0.1,
                "type": "less"
            }
        },
        "boosts": {
            "spec_2011": {
                "val": 0.9,
                "type": "greater",
                "bonus": 5
            },
            "spec_bourguiba": {
                "val": 0.9,
                "type": "greater",
                "bonus": 5
            },
            "ctx_ben": {
                "val": 0.9,
                "type": "greater",
                "bonus": 20
            },
            "ctx_party": {
                "val": 0.4,
                "type": "greater",
                "bonus": 5
            }
        }
    },
    {
        "id": "zouhair_maghzaoui",
        "name": "Zouhair Maghzaoui",
        "image": "images/zouhair_maghzaoui.png",
        "vector": {
            "pana": -85,
            "coop": 55,
            "econ": -50,
            "reli": 20,
            "soci": -25,
            "demo": 0,
            "decent": -5
        },
        "populism": 70,
        "vetos": {
            "pana_no_arab": {
                "val": 0.4,
                "type": "greater"
            },
            "spec_ugtt": {
                "val": -0.9,
                "type": "less"
            }
        },
        "boosts": {
            "spec_25jul": {
                "val": 0.4,
                "type": "greater",
                "bonus": 5
            },
            "spec_ugtt": {
                "val": 0.9,
                "type": "greater",
                "bonus": 10
            },
            "ctx_ugtt": {
                "val": -0.9,
                "type": "less",
                "bonus": 10
            }
        }
    },
    {
        "id": "fadhel_abdelkefi",
        "name": "Fadhel Abdelkefi",
        "image": "images/fadhel_abdelkefi.png",
        "vector": {
            "pana": 55,
            "coop": -80,
            "econ": 80,
            "reli": 70,
            "soci": 55,
            "demo": -80,
            "decent": -65
        },
        "populism": 10,
        "vetos": {
            "econ_no_private": {
                "val": 0.4,
                "type": "greater"
            },
            "econ_corrupt_elite": {
                "val": 0.9,
                "type": "greater"
            },
            "demo_authoritarian": {
                "val": 0.9,
                "type": "greater"
            },
            "spec_ks": {
                "val": 0.9,
                "type": "greater"
            }
        },
        "boosts": {
            "econ_tax_cuts": {
                "val": 0.9,
                "type": "greater",
                "bonus": 5
            }
        }
    },
    {
        "id": "hamma_hammami",
        "name": "Hamma Hammami",
        "image": "images/hamma_hammami.png",
        "vector": {
            "pana": -25,
            "coop": 20,
            "econ": -90,
            "reli": 90,
            "soci": 85,
            "demo": -55,
            "decent": -20
        },
        "populism": 60,
        "vetos": {
            "econ_privatization": {
                "val": 0.4,
                "type": "greater"
            },
            "spec_ugtt": {
                "val": -0.1,
                "type": "less"
            }
        },
        "boosts": {
            "econ_subsidies": {
                "val": 0.9,
                "type": "greater",
                "bonus": 10
            },
            "econ_phd_jobs": {
                "val": 0.4,
                "type": "greater",
                "bonus": 5
            },
            "econ_corrupt_elite": {
                "val": 0.9,
                "type": "greater",
                "bonus": 5
            }
        }
    },
    {
        "id": "seifeddine_makhlouf",
        "name": "Seifeddine Makhlouf",
        "image": "images/seifeddine_makhlouf.png",
        "vector": {
            "pana": -75,
            "coop": 85,
            "econ": -50,
            "reli": -90,
            "soci": -90,
            "demo": 35,
            "decent": 75
        },
        "populism": 95,
        "vetos": {
            "reli_separation": {
                "val": 0.4,
                "type": "greater"
            },
            "soci_lgbt": {
                "val": 0.4,
                "type": "greater"
            },
            "spec_2011": {
                "val": -0.1,
                "type": "less"
            },
            "reli_parties": {
                "val": -0.1,
                "type": "less"
            },
            "reli_sharia": {
                "val": -0.1,
                "type": "less"
            },
            "reli_constitution": {
                "val": 0.4,
                "type": "greater"
            }
        },
        "boosts": {
            "reli_sharia": {
                "val": 0.9,
                "type": "greater",
                "bonus": 30
            }
        }
    },
    {
        "id": "mohamed_abbou",
        "name": "Mohamed Abbou",
        "image": "images/mohamed_abbou.png",
        "vector": {
            "pana": -10,
            "coop": 35,
            "econ": -30,
            "reli": 65,
            "soci": 50,
            "demo": -85,
            "decent": -30
        },
        "populism": 40,
        "vetos": {
            "demo_elections": {
                "val": -0.1,
                "type": "less"
            },
            "spec_ks": {
                "val": 0.4,
                "type": "greater"
            },
            "spec_2011": {
                "val": 0.4,
                "type": "greater"
            }
        },
        "boosts": {
            "ctx_dl54": {
                "val": -0.9,
                "type": "less",
                "bonus": 10
            },
            "spec_ks": {
                "val": -0.9,
                "type": "less",
                "bonus": 10
            }
        }
    },
    {
        "id": "mustapha_ben_jaafar",
        "name": "Mustapha Ben Jaafar",
        "image": "images/mustapha_ben_jaafar.png",
        "vector": {
            "pana": 20,
            "coop": -85,
            "econ": 10,
            "reli": 85,
            "soci": 85,
            "demo": -90,
            "decent": -50
        },
        "populism": 10,
        "vetos": {
            "demo_strong_leader": {
                "val": 0.9,
                "type": "greater"
            },
            "spec_2011": {
                "val": 0.4,
                "type": "greater"
            }
        },
        "boosts": {
            "demo_checks": {
                "val": 0.9,
                "type": "greater",
                "bonus": 10
            },
            "ctx_mor": {
                "val": -0.9,
                "type": "less",
                "bonus": 10
            }
        }
    },
    {
        "id": "nejib_chebbi",
        "name": "Néjib Chebbi",
        "image": "images/nejib_chebbi.png",
        "vector": {
            "pana": 20,
            "coop": -40,
            "econ": 20,
            "reli": 60,
            "soci": 60,
            "demo": -85,
            "decent": -40
        },
        "populism": 10,
        "vetos": {
            "demo_authoritarian": {
                "val": 0.4,
                "type": "greater"
            },
            "spec_ks": {
                "val": 0.9,
                "type": "greater"
            },
            "spec_2011": {
                "val": 0.4,
                "type": "greater"
            }
        },
        "boosts": {
            "ctx_nsf": {
                "val": -0.9,
                "type": "less",
                "bonus": 10
            },
            "ctx_party": {
                "val": -0.9,
                "type": "less",
                "bonus": 5
            },
            "ctx_dl54": {
                "val": -0.9,
                "type": "less",
                "bonus": 5
            }
        }
    },
    {
        "id": "maya_jribi",
        "name": "Maya Jribi",
        "image": "images/maya_jribi.png",
        "vector": {
            "pana": 20,
            "coop": -30,
            "econ": 0,
            "reli": 70,
            "soci": 90,
            "demo": -90,
            "decent": -50
        },
        "populism": 10,
        "vetos": {
            "demo_authoritarian": {
                "val": 0.4,
                "type": "greater"
            },
            "spec_ks": {
                "val": 0.9,
                "type": "greater"
            },
            "spec_2011": {
                "val": 0.4,
                "type": "greater"
            }
        },
        "boosts": {
            "soci_gender": {
                "val": 0.9,
                "type": "greater",
                "bonus": 10
            },
            "soci_liberty": {
                "val": 0.9,
                "type": "greater",
                "bonus": 10
            }
        }
    },
    {
        "id": "kais_saied",
        "name": "Kaïs Saïed",
        "image": "images/kais_saied.png",
        "vector": {
            "pana": -20,
            "coop": 70,
            "econ": -25,
            "reli": 5,
            "soci": -55,
            "demo": 75,
            "decent": 0
        },
        "populism": 90,
        "vetos": {
            "spec_25jul": {
                "val": -0.1,
                "type": "less"
            },
            "spec_ks": {
                "val": -0.1,
                "type": "less"
            },
            "econ_corrupt_elite": {
                "val": -0.9,
                "type": "less"
            }
        },
        "boosts": {
            "spec_ks": {
                "val": 0.9,
                "type": "greater",
                "bonus": 20
            },
            "spec_25jul": {
                "val": 0.9,
                "type": "greater",
                "bonus": 10
            },
            "econ_corrupt_elite": {
                "val": 0.4,
                "type": "greater",
                "bonus": 5
            },
            "ctx_party": {
                "val": 0.9,
                "type": "greater",
                "bonus": 10
            },
            "ctx_corp": {
                "val": 0.9,
                "type": "greater",
                "bonus": 10
            }
        }
    },
    {
        "id": "mounir_baatour",
        "name": "Mounir Baatour",
        "image": "images/mounir_baatour.png",
        "vector": {
            "pana": 90,
            "coop": -90,
            "econ": 80,
            "reli": 95,
            "soci": 95,
            "demo": -90,
            "decent": -80
        },
        "populism": 10,
        "vetos": {
            "pana_diplo": {
                "val": -0.1,
                "type": "less"
            },
            "pana_national_interest": {
                "val": -0.1,
                "type": "less"
            },
            "pana_unity": {
                "val": 0.9,
                "type": "greater"
            },
            "pana_conflict": {
                "val": 0.9,
                "type": "greater"
            },
            "pana_alliances": {
                "val": 0.9,
                "type": "greater"
            },
            "reli_separation": {
                "val": -0.1,
                "type": "less"
            },
            "soci_lgbt": {
                "val": -0.1,
                "type": "less"
            }
        },
        "boosts": {
            "pana_no_arab": {
                "val": 0.9,
                "type": "greater",
                "bonus": 5
            },
            "soci_lgbt": {
                "val": 0.9,
                "type": "greater",
                "bonus": 20
            },
            "ctx_normalisation": {
                "val": -0.9,
                "type": "less",
                "bonus": 10
            }
        }
    },
    {
        "id": "chokri_belaid",
        "name": "Chokri Belaïd",
        "image": "images/chokri_belaid.png",
        "vector": {
            "pana": -90,
            "coop": 69,
            "econ": -90,
            "reli": 90,
            "soci": 85,
            "demo": -40,
            "decent": -20
        },
        "populism": 60,
        "vetos": {
            "pana_no_arab": {
                "val": 0.4,
                "type": "greater"
            },
            "econ_privatization": {
                "val": 0.4,
                "type": "greater"
            },
            "spec_ugtt": {
                "val": -0.1,
                "type": "less"
            },
            "econ_private_eff": {
                "val": 0.9,
                "type": "greater"
            },
            "econ_redistribution": {
                "val": -0.1,
                "type": "less"
            }
        },
        "boosts": {
            "econ_state_control": {
                "val": 0.9,
                "type": "greater",
                "bonus": 10
            },
            "reli_parties": {
                "val": -0.9,
                "type": "less",
                "bonus": 5
            },
            "pana_unity": {
                "val": 0.9,
                "type": "greater",
                "bonus": 20
            },
            "econ_subsidies": {
                "val": -0.9,
                "type": "less",
                "bonus": 15
            }
        }
    },
    {
        "id": "moncef_bey",
        "name": "Moncef Bey",
        "image": "images/moncef_bey.png",
        "vector": {
            "pana": 20,
            "coop": 0,
            "econ": 0,
            "reli": -20,
            "soci": -10,
            "demo": 25,
            "decent": -20
        },
        "populism": 30,
        "vetos": {
            "spec_monarchy": {
                "val": -0.1,
                "type": "less"
            }
        },
        "boosts": {
            "spec_monarchy": {
                "val": 0.4,
                "type": "greater",
                "bonus": 50
            }
        }
    },
    {
        "id": "abdelaziz_thaalbi",
        "name": "Abdelaziz Thâalbi",
        "image": "images/abdelaziz_thaalbi.png",
        "vector": {
            "pana": 60,
            "coop": -20,
            "econ": 0,
            "reli": -30,
            "soci": 0,
            "demo": -15,
            "decent": -20
        },
        "populism": 30,
        "vetos": {
            "reli_identity_primacy": {
                "val": -0.1,
                "type": "less"
            },
            "soci_family": {
                "val": -0.1,
                "type": "less"
            }
        },
        "boosts": {
            "reli_values": {
                "val": 0.9,
                "type": "greater",
                "bonus": 20
            }
        }
    },
    {
        "id": "habib_bourguiba",
        "name": "Habib Bourguiba",
        "image": "images/habib_bourguiba.png",
        "vector": {
            "pana": 80,
            "coop": -30,
            "econ": 20,
            "reli": 60,
            "soci": 70,
            "demo": 70,
            "decent": 70
        },
        "populism": 40,
        "vetos": {
            "spec_monarchy": {
                "val": 0.4,
                "type": "greater"
            },
            "demo_strong_leader": {
                "val": -0.1,
                "type": "less"
            },
            "spec_bourguiba": {
                "val": -0.1,
                "type": "less"
            }
        },
        "boosts": {
            "spec_bourguiba": {
                "val": 0.9,
                "type": "greater",
                "bonus": 40
            }
        }
    },
    {
        "id": "salah_ben_youssef",
        "name": "Salah Ben Youssef",
        "image": "images/salah_ben_youssef.png",
        "vector": {
            "pana": -30,
            "coop": 30,
            "econ": -20,
            "reli": 0,
            "soci": -10,
            "demo": 0,
            "decent": -10
        },
        "populism": 70,
        "vetos": {
            "pana_alliances": {
                "val": -0.9,
                "type": "less"
            },
            "pana_unity": {
                "val": 0.4,
                "type": "greater"
            }
        },
        "boosts": {
            "spec_bourguiba": {
                "val": -0.9,
                "type": "less",
                "bonus": 20
            }
        }
    },
    {
        "id": "ahmed_ben_salah",
        "name": "Ahmed Ben Salah",
        "image": "images/ahmed_ben_salah.png",
        "vector": {
            "pana": 10,
            "coop": 10,
            "econ": -80,
            "reli": 40,
            "soci": 60,
            "demo": 60,
            "decent": 80
        },
        "populism": 50,
        "vetos": {
            "econ_redistribution": {
                "val": -0.1,
                "type": "less"
            },
            "econ_services": {
                "val": -0.1,
                "type": "less"
            },
            "pana_culture": {
                "val": -0.1,
                "type": "less"
            }
        },
        "boosts": {}
    },
    {
        "id": "hedi_nouira",
        "name": "Hédi Nouira",
        "image": "images/hedi_nouira.png",
        "vector": {
            "pana": 60,
            "coop": -60,
            "econ": 60,
            "reli": 70,
            "soci": 50,
            "demo": 70,
            "decent": 80
        },
        "populism": 20,
        "vetos": {
            "econ_privatization": {
                "val": -0.1,
                "type": "less"
            },
            "coop_west_partners": {
                "val": -0.1,
                "type": "less"
            }
        },
        "boosts": {
            "ctx_imf": {
                "val": -0.9,
                "type": "less",
                "bonus": 20
            },
            "spec_bourguiba": {
                "val": 0.4,
                "type": "greater",
                "bonus": 5
            }
        }
    },
    {
        "id": "mohamed_mzali",
        "name": "Mohamed Mzali",
        "image": "images/mohamed_mzali.png",
        "vector": {
            "pana": -20,
            "coop": 0,
            "econ": 40,
            "reli": -20,
            "soci": -10,
            "demo": 50,
            "decent": 60
        },
        "populism": 24,
        "vetos": {
            "econ_subsidies": {
                "val": 0.4,
                "type": "greater"
            },
            "soci_tradition": {
                "val": -0.1,
                "type": "less"
            },
            "soci_derja": {
                "val": 0.4,
                "type": "greater"
            }
        },
        "boosts": {}
    },
    {
        "id": "ahmed_mestiri",
        "name": "Ahmed Mestiri",
        "image": "images/ahmed_mestiri.png",
        "vector": {
            "pana": 40,
            "coop": -30,
            "econ": -20,
            "reli": 60,
            "soci": 60,
            "demo": -60,
            "decent": 0
        },
        "populism": 20,
        "vetos": {},
        "boosts": {}
    },
    {
        "id": "ben_ali",
        "name": "Zine El Abidine Ben Ali",
        "image": "images/ben_ali.png",
        "vector": {
            "pana": 60,
            "coop": -40,
            "econ": 20,
            "reli": 60,
            "soci": 30,
            "demo": 90,
            "decent": 90
        },
        "populism": 40,
        "vetos": {
            "spec_2011": {
                "val": -0.1,
                "type": "less"
            },
            "ctx_ben": {
                "val": -0.1,
                "type": "less"
            }
        },
        "boosts": {
            "ctx_ben": {
                "val": 0.9,
                "type": "greater",
                "bonus": 30
            }
        }
    },
    {
        "id": "moncef_marzouki",
        "name": "Moncef Marzouki",
        "image": "images/moncef_marzouki.png",
        "vector": {
            "pana": 0,
            "coop": -60,
            "econ": -20,
            "reli": 40,
            "soci": 50,
            "demo": -90,
            "decent": -60
        },
        "populism": 50,
        "vetos": {
            "ctx_party": {
                "val": 0.4,
                "type": "greater"
            },
            "spec_2011": {
                "val": -0.1,
                "type": "less"
            }
        },
        "boosts": {
            "reli_parties": {
                "val": 0.4,
                "type": "greater",
                "bonus": 10
            }
        }
    },
    {
        "id": "beji_caid_essebsi",
        "name": "Béji Caïd Essebsi",
        "image": "images/beji_caid_essebsi.png",
        "vector": {
            "pana": 60,
            "coop": -60,
            "econ": 20,
            "reli": 70,
            "soci": 70,
            "demo": -60,
            "decent": 40
        },
        "populism": 20,
        "vetos": {
            "spec_bourguiba": {
                "val": -0.9,
                "type": "less"
            }
        },
        "boosts": {
            "spec_bourguiba": {
                "val": 0.9,
                "type": "greater",
                "bonus": 20
            }
        }
    },
    {
        "id": "youssef_chahed",
        "name": "Youssef Chahed",
        "image": "images/youssef_chahed.png",
        "vector": {
            "pana": 60,
            "coop": -80,
            "econ": 80,
            "reli": 60,
            "soci": 40,
            "demo": -30,
            "decent": 20
        },
        "populism": 30,
        "vetos": {
            "econ_competition": {
                "val": -0.9,
                "type": "less"
            }
        },
        "boosts": {
            "ctx_imf": {
                "val": -0.9,
                "type": "less",
                "bonus": 10
            },
            "coop_fdi": {
                "val": 0.9,
                "type": "greater",
                "bonus": 10
            }
        }
    },
    {
        "id": "elyes_fakhfakh",
        "name": "Elyes Fakhfakh",
        "image": "images/elyes_fakhfakh.png",
        "vector": {
            "pana": 40,
            "coop": -40,
            "econ": 10,
            "reli": 70,
            "soci": 90,
            "demo": -70,
            "decent": -20
        },
        "populism": 10,
        "vetos": {},
        "boosts": {
            "econ_redistribution": {
                "val": 0.9,
                "type": "greater",
                "bonus": 5
            },
            "soci_lgbt": {
                "val": 0.9,
                "type": "greater",
                "bonus": 10
            },
            "reli_separation": {
                "val": 0.9,
                "type": "greater",
                "bonus": 5
            }
        }
    },
    {
        "id": "nabil_karoui",
        "name": "Nabil Karoui",
        "image": "images/nabil_karoui.png",
        "vector": {
            "pana": 40,
            "coop": -40,
            "econ": 60,
            "reli": 40,
            "soci": 20,
            "demo": -20,
            "decent": -20
        },
        "populism": 85,
        "vetos": {
            "ctx_party": {
                "val": 0.4,
                "type": "greater"
            }
        },
        "boosts": {
            "demo_press_limit": {
                "val": -0.9,
                "type": "less",
                "bonus": 15
            },
            "econ_no_private": {
                "val": -0.9,
                "type": "less",
                "bonus": 5
            }
        }
    },
    {
        "id": "mongi_rahoui",
        "name": "Mongi Rahoui",
        "image": "images/mongi_rahoui.png",
        "vector": {
            "pana": -60,
            "coop": 80,
            "econ": -90,
            "reli": 90,
            "soci": 80,
            "demo": 40,
            "decent": -20
        },
        "populism": 70,
        "vetos": {
            "reli_parties": {
                "val": 0.4,
                "type": "greater"
            },
            "ctx_ben": {
                "val": 0.4,
                "type": "greater"
            }
        },
        "boosts": {}
    }
];
