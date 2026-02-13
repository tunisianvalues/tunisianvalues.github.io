const questions = [
    // --- PAN-ARABISM ---
    {
        id: "pana_alliances",
        question: "Tunisia should prioritize alliances with Arab countries rather than with other regions.",
        effect: { pana: +4, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "pana_unity",
        question: "The political and economic unity of the Arab world is a priority goal.",
        effect: { pana: +8, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "pana_culture",
        question: "Artistic and cultural competitions on an Arab world scale should be developed.",
        effect: { pana: +4, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "pana_identity",
        question: "Tunisians primarily share an Arab identity.",
        effect: { pana: +4, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "pana_army",
        question: "A joint Arab army would be beneficial for Tunisia's security.",
        effect: { pana: +8, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "pana_conflict",
        question: "Tunisia should automatically support its Arab neighbors in the event of a conflict with a non-Arab country.",
        effect: { pana: +8, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "pana_afro",
        question: "Tunisia is more Arab than African.",
        effect: { pana: +6, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "pana_national_interest",
        question: "Tunisia must defend its national interests above all else, even against Arab countries.",
        effect: { pana: -8, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "pana_independent",
        question: "Tunisian policies should be designed independently of the Arab world's priorities.",
        effect: { pana: -8, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "pana_distinct_culture",
        question: "Tunisian culture is distinct and must be protected from external influences, including from the Arab world.",
        effect: { pana: -6, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "pana_diplo",
        question: "Tunisia's diplomatic decisions should not be influenced by Arab causes if they do not directly concern the country.",
        effect: { pana: -6, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "pana_no_arab",
        question: "The Arab world does not exist.",
        effect: { pana: -8, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },

    // --- COOPERATION ---
    {
        id: "coop_active",
        question: "Tunisia must actively participate in international organizations.",
        effect: { pana: 0, coop: +4, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "coop_treaties",
        question: "International treaties are necessary to protect Tunisian interests.",
        effect: { pana: 0, coop: +4, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "coop_west_partners",
        question: "Tunisia should strengthen its partnerships with powers like the EU, the USA, or China.",
        effect: { pana: 0, coop: +6, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "coop_fdi",
        question: "Opening up to foreign investment is essential for the country's development.",
        effect: { pana: 0, coop: +4, econ: -4, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "coop_peacekeeping",
        question: "Tunisia should engage in humanitarian and peacekeeping missions abroad.",
        effect: { pana: 0, coop: +6, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "coop_sovereignty",
        question: "Tunisia must remain master of its political choices, even if it means facing international isolation.",
        effect: { pana: 0, coop: -4, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 },
        tags: ["is_populist"]
    },
    {
        id: "coop_bad_institutions",
        question: "International institutions do not respect Tunisia's sovereignty and do not protect its fundamental interests.",
        effect: { pana: 0, coop: -8, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 },
        tags: ["is_populist"]
    },
    {
        id: "coop_autonomy",
        question: "Tunisia should reduce its dependence on foreign aid and partnerships.",
        effect: { pana: 0, coop: -4, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "coop_neutrality",
        question: "Tunisia would benefit from following the Bourguibian doctrine of neutrality and non-interference in external conflicts.",
        effect: { pana: 0, coop: -4, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },

    // --- ECONOMY ---
    {
        id: "econ_state_control",
        question: "The Tunisian state must control strategic economic sectors such as energy, transport, and telecommunications.",
        effect: { pana: 0, coop: 0, econ: +8, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_services",
        question: "Essential public services like health and education must remain free and accessible to all, even if it requires raising taxes.",
        effect: { pana: 0, coop: 0, econ: +4, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_no_private",
        question: "Private companies should be abolished.",
        effect: { pana: 0, coop: 0, econ: +8, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_regulation",
        question: "Large private companies must be regulated to prevent abuse.",
        effect: { pana: 0, coop: 0, econ: +6, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_redistribution",
        question: "Wealth redistribution is essential to reduce inequality.",
        effect: { pana: 0, coop: 0, econ: +6, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_competition",
        question: "Free competition stimulates innovation and economic growth.",
        effect: { pana: 0, coop: 0, econ: -4, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_tax_cuts",
        question: "Corporate taxes should be reduced to encourage investment.",
        effect: { pana: 0, coop: 0, econ: -6, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_private_eff",
        question: "The private sector is more efficient than the State in economic management.",
        effect: { pana: 0, coop: 0, econ: -8, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_privatization",
        question: "The privatization of certain public companies would be beneficial.",
        effect: { pana: 0, coop: 0, econ: -4, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_inequality",
        question: "Inequality is inevitable in a prosperous economy.",
        effect: { pana: 0, coop: 0, econ: -8, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_subsidies",
        question: "The State must heavily subsidize bread, fuel, and electricity.",
        effect: { pana: 0, coop: 0, econ: +6, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_phd_jobs",
        question: "The Tunisian state should implement an exceptional recruitment of unemployed PhD holders to solve the employment crisis in higher education.",
        effect: { pana: 0, coop: 0, econ: +6, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_corrupt_elite",
        question: "The Tunisian economic model could work, but it is held hostage by a corrupt elite that enriches itself while the people get poorer.",
        effect: { pana: 0, coop: 0, econ: +8, reli: 0, soci: 0, demo: 0, decent: 0 },
        tags: ["is_populist"]
    },

    // --- RELIGION ---
    {
        id: "reli_sharia",
        question: "Sharia law should inspire Tunisian legislation.",
        effect: { pana: 0, coop: 0, econ: 0, reli: +8, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "reli_politics",
        question: "Religion must play a central role in political life.",
        effect: { pana: 0, coop: 0, econ: 0, reli: +6, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "reli_values",
        question: "Islamic values are indispensable for guiding society.",
        effect: { pana: 0, coop: 0, econ: 0, reli: +6, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "reli_state_support",
        question: "The State must actively support religious institutions.",
        effect: { pana: 0, coop: 0, econ: 0, reli: +4, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "reli_parties",
        question: "Islamist political parties must be allowed.",
        effect: { pana: 0, coop: 0, econ: 0, reli: +6, soci: 0, demo: +2, decent: 0 }
    },
    {
        id: "reli_separation",
        question: "Religion and politics must be totally separated.",
        effect: { pana: 0, coop: 0, econ: 0, reli: -8, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "reli_civil_law",
        question: "Laws must be based solely on civil principles, not religious ones.",
        effect: { pana: 0, coop: 0, econ: 0, reli: -8, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "reli_neutrality",
        question: "Public institutions must be neutral regarding all beliefs.",
        effect: { pana: 0, coop: 0, econ: 0, reli: -6, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "reli_freedom",
        question: "Freedom of worship must include the freedom not to believe.",
        effect: { pana: 0, coop: 0, econ: 0, reli: -4, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "reli_influence",
        question: "Religious discourse should not influence political decisions.",
        effect: { pana: 0, coop: 0, econ: 0, reli: -4, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "reli_constitution",
        question: "All mentions of Islam should be removed from the constitution.",
        effect: { pana: 0, coop: 0, econ: 0, reli: -8, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "reli_education",
        question: "The Tunisian education system should align more with the principles of Islam, the moral and identity foundation of the individual.",
        effect: { pana: 0, coop: 0, econ: 0, reli: +6, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "reli_identity_primacy",
        question: "My religious identity takes precedence over my national affiliation; I am Muslim before being Tunisian.",
        effect: { pana: 0, coop: 0, econ: 0, reli: +4, soci: 0, demo: 0, decent: 0 }
    },

    // --- SOCIETY ---
    {
        id: "soci_tradition",
        question: "Traditional Tunisian values and customs must be preserved.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: +4, demo: 0, decent: 0 }
    },
    {
        id: "soci_reforms",
        question: "Tunisian society requires rapid and significant social reforms.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: -4, demo: 0, decent: 0 }
    },
    {
        id: "soci_family",
        question: "The traditional role of the family must be protected.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: +4, demo: 0, decent: 0 }
    },
    {
        id: "soci_western_model",
        question: "Tunisia should model itself on Western societies to structure its own.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: -8, demo: 0, decent: 0 }
    },
    {
        id: "soci_gender",
        question: "Total equality between men and women must be guaranteed by law.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: -6, demo: 0, decent: 0 }
    },
    {
        id: "soci_lgbt",
        question: "Sexual minorities must have the same rights as other citizens.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: -8, demo: 0, decent: 0 }
    },
    {
        id: "soci_derja",
        question: "Derja should replace Arabic as the official language of Tunisia.",
        effect: { pana: -6, coop: 0, econ: 0, reli: 0, soci: -4, demo: 0, decent: 0 }
    },
    {
        id: "soci_liberty",
        question: "Traditions that limit individual liberties must be abolished.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: -8, demo: 0, decent: 0 }
    },
    {
        id: "soci_languages",
        question: "It is appropriate for Tunisia to integrate foreign languages into its society.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: -8, demo: 0, decent: 0 }
    },

    // --- DEMOCRACY ---
    {
        id: "demo_elections",
        question: "Free and regular elections are indispensable.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: +6, decent: 0 }
    },
    {
        id: "demo_checks",
        question: "Checks and balances (judiciary, parliament, media) must be protected.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: +6, decent: 0 }
    },
    {
        id: "demo_protest",
        question: "Peaceful protests are a fundamental right.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: +4, decent: 0 }
    },
    {
        id: "demo_pluralism",
        question: "Political pluralism is essential for democracy.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: +6, decent: 0 }
    },
    {
        id: "demo_transparency",
        question: "Government transparency is a priority.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: +6, decent: 0 }
    },
    {
        id: "demo_strong_leader",
        question: "A strong leader is sometimes necessary, even at the expense of political freedoms.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: -6, decent: 0 },
        tags: ["is_populist"]
    },
    {
        id: "demo_press_limit",
        question: "In certain situations, it is acceptable to limit freedom of the press.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: -6, decent: 0 },
        tags: ["is_populist"]
    },
    {
        id: "demo_opposition",
        question: "Political opponents threaten the country's stability.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: -8, decent: 0 },
        tags: ["is_populist"]
    },
    {
        id: "demo_authoritarian",
        question: "An authoritarian government is more efficient than a liberal democracy.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: -8, decent: 0 },
        tags: ["is_populist"]
    },
    {
        id: "demo_speed",
        question: "Important decisions must be taken quickly, even without public debate.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: -4, decent: 0 },
        tags: ["is_populist"]
    },

    // --- GOVERNANCE ---
    {
        id: "decent_local",
        question: "Local authorities understand the needs of their population better.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: +6 }
    },
    {
        id: "decent_election_gov",
        question: "Governors should be elected locally.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: +8 }
    },
    {
        id: "decent_central_unity",
        question: "A strong central power is necessary to prevent regional divisions.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: -4 }
    },
    {
        id: "decent_central_econ",
        question: "Economic decisions must remain in the hands of the central government.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: -6 }
    },
    {
        id: "decent_resources",
        question: "Natural resource management must remain under central government control.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: -4 }
    },
    {
        id: "decent_council_regions",
        question: "The creation of the National Council of Regions and Districts to represent territories and rationalize parliamentary power is a fundamentally positive initiative.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: +4, decent: -6 },
    },
    {
        id: "decent_uniform_laws",
        question: "The same laws must apply uniformly across the entire territory.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: -6 }
    },
    {
        id: "decent_post_rev",
        question: "Post-revolution decentralization is essential for improving governance and bringing decisions closer to citizens.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: +4, decent: +6 }
    },

    // --- SPECIALS ---
    {
        id: "spec_monarchy",
        question: "It would be preferable for Tunisia to restore a constitutional monarchy.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 },
        special: "monarchie"
    },
    {
        id: "spec_ugtt",
        question: "The UGTT plays a positive role in Tunisian political and social life.",
        effect: { pana: 0, coop: 0, econ: +2, reli: 0, soci: 0, demo: +2, decent: 0 },
        special: "ugtt"
    },
    {
        id: "spec_25jul",
        question: "The measures taken by Kaïs Saïed on July 25, 2021, were necessary and justified to save the country.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 },
        special: "25juillet",
    },
    {
        id: "spec_ks",
        question: "Kaïs Saïed is a good president.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: -4, decent: 0 },
        special: "ks",
        tags: ["is_populist"]
    },
    {
        id: "spec_2011",
        question: "Tunisia should have avoided the revolutionary process of 2011.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: -4, decent: 0 },
        special: "2011"
    },
    {
        id: "spec_maghreb",
        question: "Tunisia's future lies in a united Maghreb, founded on our historical and cultural ties.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 },
        special: "maghreb"
    },
    {
        id: "spec_africa",
        question: "Tunisia is part of Africa and must take a leading role in building a strong and sovereign African Union.",
        effect: { pana: -2, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 },
        special: "afrique"
    },
];