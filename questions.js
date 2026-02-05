const questions = [
    // --- PANARABISME ---
    {
        id: "pana_alliances",
        question: "La Tunisie devrait prioriser les alliances avec les pays arabes plutôt qu’avec d’autres régions.",
        effect: { pana: +4, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "pana_unity",
        question: "L’unité politique et économique du monde arabe est un objectif prioritaire.",
        effect: { pana: +8, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "pana_culture",
        question: "Des compétitions artistiques et culturelles à l'échelle du monde arabe devraient être développées.",
        effect: { pana: +4, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "pana_identity",
        question: "Les Tunisiens partagent principalement une identité arabe.",
        effect: { pana: +4, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "pana_army",
        question: "Une armée arabe commune serait bénéfique à la sécurité de la Tunisie.",
        effect: { pana: +8, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "pana_conflict",
        question: "La Tunisie devrait soutenir automatiquement ses voisins arabes en cas de conflit avec un pays non arabe.",
        effect: { pana: +8, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "pana_afro",
        question: "La Tunisie est plus arabe qu’africaine.",
        effect: { pana: +6, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "pana_national_interest",
        question: "La Tunisie doit avant tout défendre ses intérêts nationaux, même contre des pays arabes.",
        effect: { pana: -8, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "pana_independent",
        question: "Les politiques tunisiennes devraient être pensées indépendamment des priorités du monde arabe.",
        effect: { pana: -8, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "pana_distinct_culture",
        question: "La culture tunisienne est distincte et doit être protégée des influences extérieures, y compris du monde arabe.",
        effect: { pana: -6, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "pana_diplo",
        question: "Les décisions diplomatiques de la Tunisie ne doivent pas être influencées par les causes arabes s'ils ne la concernent pas directement.",
        effect: { pana: -6, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "pana_no_arab",
        question: "Le monde arabe n'existe pas.",
        effect: { pana: -8, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },

    // --- COOPERATION ---
    {
        id: "coop_active",
        question: "La Tunisie doit participer activement aux organisations internationales.",
        effect: { pana: 0, coop: +4, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "coop_treaties",
        question: "Les traités internationaux sont nécessaires pour protéger les intérêts tunisiens.",
        effect: { pana: 0, coop: +4, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "coop_west_partners",
        question: "La Tunisie devrait renforcer ses partenariats avec des puissances comme l’UE, les États-Unis ou la Chine.",
        effect: { pana: 0, coop: +6, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "coop_fdi",
        question: "L’ouverture aux investissements étrangers est essentielle au développement du pays.",
        effect: { pana: 0, coop: +4, econ: -4, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "coop_peacekeeping",
        question: "La Tunisie devrait s’engager dans des missions humanitaires et de maintien de la paix à l’étranger.",
        effect: { pana: 0, coop: +6, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "coop_sovereignty",
        question: "La Tunisie doit rester maître de ses choix politiques, quitte à faire face à un isolement international.",
        effect: { pana: 0, coop: -4, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 },
        tags: ["is_populist"]
    },
    {
        id: "coop_bad_institutions",
        question: "Les institutions internationales ne respectent pas la souveraineté de la Tunisie et ne protègent pas ses intérêts fondamentaux.",
        effect: { pana: 0, coop: -8, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 },
        tags: ["is_populist"]
    },
    {
        id: "coop_autonomy",
        question: "La Tunisie devrait réduire sa dépendance envers les aides et partenariats étrangers.",
        effect: { pana: 0, coop: -4, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "coop_neutrality",
        question: "La Tunisie gagnerait à suivre la doctrine bourguibienne de neutralité et de non-ingérence dans les conflits extérieurs.",
        effect: { pana: 0, coop: -4, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 }
    },

    // --- ECONOMIE ---
    {
        id: "econ_state_control",
        question: "L'État tunisien doit contrôler les secteurs stratégiques de l'économie tels que l'énergie, les transports et les télécommunications.",
        effect: { pana: 0, coop: 0, econ: +8, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_services",
        question: "Les services publics essentiels comme la santé et l'éducation doivent rester gratuits et accessibles à tous, même si cela nécessite une augmentation des impôts.",
        effect: { pana: 0, coop: 0, econ: +4, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_no_private",
        question: "Les entreprises privées doivent être abolies.",
        effect: { pana: 0, coop: 0, econ: +8, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_regulation",
        question: "Les grandes entreprises privées doivent être régulées pour éviter les abus.",
        effect: { pana: 0, coop: 0, econ: +6, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_redistribution",
        question: "La redistribution des richesses est essentielle pour réduire les inégalités.",
        effect: { pana: 0, coop: 0, econ: +6, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_competition",
        question: "La concurrence libre stimule l’innovation et la croissance économique.",
        effect: { pana: 0, coop: 0, econ: -4, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_tax_cuts",
        question: "Les impôts sur les entreprises devraient être réduits pour encourager l’investissement.",
        effect: { pana: 0, coop: 0, econ: -6, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_private_eff",
        question: "Le secteur privé est plus efficace que l’État dans la gestion économique.",
        effect: { pana: 0, coop: 0, econ: -8, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_privatization",
        question: "La privatisation de certaines entreprises publiques serait bénéfique.",
        effect: { pana: 0, coop: 0, econ: -4, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_inequality",
        question: "Les inégalités sont inévitables dans une économie prospère.",
        effect: { pana: 0, coop: 0, econ: -8, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_subsidies",
        question: "L’État doit subventionner massivement le pain, l’essence et l’électricité.",
        effect: { pana: 0, coop: 0, econ: +6, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_phd_jobs",
        question: "L'État tunisien devrait procéder à un recrutement exceptionnel des docteurs au chômage pour résoudre la crise de l'emploi dans le secteur de l'enseignement supérieur.",
        effect: { pana: 0, coop: 0, econ: +6, reli: 0, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "econ_corrupt_elite",
        question: "Le modèle economique tunisien pourrait fonctionner, mais il est pris en otage par une élite corrompue qui s’enrichit pendant que le peuple s’appauvrit.",
        effect: { pana: 0, coop: 0, econ: +8, reli: 0, soci: 0, demo: 0, decent: 0 },
        tags: ["is_populist"]
    },

    // --- RELIGION ---
    {
        id: "reli_sharia",
        question: "La charia devrait inspirer la législation tunisienne.",
        effect: { pana: 0, coop: 0, econ: 0, reli: +8, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "reli_politics",
        question: "La religion doit jouer un rôle central dans la vie politique.",
        effect: { pana: 0, coop: 0, econ: 0, reli: +6, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "reli_values",
        question: "Les valeurs islamiques sont indispensables pour guider la société.",
        effect: { pana: 0, coop: 0, econ: 0, reli: +6, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "reli_state_support",
        question: "L’État doit soutenir activement les institutions religieuses.",
        effect: { pana: 0, coop: 0, econ: 0, reli: +4, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "reli_parties",
        question: "Les partis politiques islamistes doivent être autorisés.",
        effect: { pana: 0, coop: 0, econ: 0, reli: +6, soci: 0, demo: +2, decent: 0 }
    },
    {
        id: "reli_separation",
        question: "La religion et la politique doivent être totalement séparées.",
        effect: { pana: 0, coop: 0, econ: 0, reli: -8, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "reli_civil_law",
        question: "Les lois doivent être basées uniquement sur des principes civils, pas religieux.",
        effect: { pana: 0, coop: 0, econ: 0, reli: -8, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "reli_neutrality",
        question: "Les institutions publiques doivent être neutres vis-à-vis de toutes les croyances.",
        effect: { pana: 0, coop: 0, econ: 0, reli: -6, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "reli_freedom",
        question: "La liberté de culte doit inclure la liberté de ne pas croire.",
        effect: { pana: 0, coop: 0, econ: 0, reli: -4, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "reli_influence",
        question: "Les discours religieux ne doivent pas influencer les décisions politiques.",
        effect: { pana: 0, coop: 0, econ: 0, reli: -4, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "reli_constitution",
        question: "Il faut retirer toute mention de l’islam de la constitution.",
        effect: { pana: 0, coop: 0, econ: 0, reli: -8, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "reli_education",
        question: "Le système éducatif tunisien doit s’aligner davantage sur les principes de l’islam, fondement moral et identitaire de l'individu.",
        effect: { pana: 0, coop: 0, econ: 0, reli: +6, soci: 0, demo: 0, decent: 0 }
    },
    {
        id: "reli_identity_primacy",
        question: "Mon identité religieuse prime sur mon appartenance nationale, je suis musulman avant d’être tunisien.",
        effect: { pana: 0, coop: 0, econ: 0, reli: +4, soci: 0, demo: 0, decent: 0 }
    },

    // --- SOCIÉTÉ ---
    {
        id: "soci_tradition",
        question: "Les valeurs et coutumes traditionnelles tunisiennes doivent être préservées.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: +4, demo: 0, decent: 0 }
    },
    {
        id: "soci_reforms",
        question: "La société tunisienne requiert des réformes sociales rapides et significatives.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: -4, demo: 0, decent: 0 }
    },
    {
        id: "soci_family",
        question: "Le rôle traditionnel de la famille doit être protégé.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: +4, demo: 0, decent: 0 }
    },
    {
        id: "soci_western_model",
        question: "La Tunisie devrait prendre modèle sur les sociétés occidentales pour structurer la sienne.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: -8, demo: 0, decent: 0 }
    },
    {
        id: "soci_gender",
        question: "L’égalité totale entre hommes et femmes doit être garantie par la loi.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: -6, demo: 0, decent: 0 }
    },
    {
        id: "soci_lgbt",
        question: "Les minorités sexuelles doivent avoir les mêmes droits que les autres citoyens.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: -8, demo: 0, decent: 0 }
    },
    {
        id: "soci_derja",
        question: "Le Derja devrait remplacer l’arabe en tant que langue officielle de la Tunisie.",
        effect: { pana: -6, coop: 0, econ: 0, reli: 0, soci: -4, demo: 0, decent: 0 }
    },
    {
        id: "soci_liberty",
        question: "Les traditions qui limitent les libertés individuelles doivent être abolies.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: -8, demo: 0, decent: 0 }
    },
    {
        id: "soci_languages",
        question: "Il est approprié que la Tunisie intègre des langues étrangères dans sa société.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: -8, demo: 0, decent: 0 }
    },

    // --- DÉMOCRATIE ---
    {
        id: "demo_elections",
        question: "Des élections libres et régulières sont indispensables.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: +6, decent: 0 }
    },
    {
        id: "demo_checks",
        question: "Les contre-pouvoirs (justice, parlement, médias) doivent être protégés.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: +6, decent: 0 }
    },
    {
        id: "demo_protest",
        question: "Les manifestations pacifiques sont un droit fondamental.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: +4, decent: 0 }
    },
    {
        id: "demo_pluralism",
        question: "Le pluralisme politique est essentiel à la démocratie.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: +6, decent: 0 }
    },
    {
        id: "demo_transparency",
        question: "La transparence gouvernementale est une priorité.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: +6, decent: 0 }
    },
    {
        id: "demo_strong_leader",
        question: "Un leader fort est parfois nécessaire, même au détriment des libertés politiques.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: -6, decent: 0 },
        tags: ["is_populist"]
    },
    {
        id: "demo_press_limit",
        question: "Dans certaines situations, il est acceptable de limiter la liberté de la presse.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: -6, decent: 0 },
        tags: ["is_populist"]
    },
    {
        id: "demo_opposition",
        question: "Les opposants politiques menacent la stabilité du pays.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: -8, decent: 0 },
        tags: ["is_populist"]
    },
    {
        id: "demo_authoritarian",
        question: "Un gouvernement autoritaire est plus efficace qu’une démocratie libérale.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: -8, decent: 0 },
        tags: ["is_populist"]
    },
    {
        id: "demo_speed",
        question: "Les décisions importantes doivent être prises rapidement, même sans débat public.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: -4, decent: 0 },
        tags: ["is_populist"]
    },

    // --- GOUVERNANCE ---
    {
        id: "decent_local",
        question: "Les autorités locales comprennent mieux les besoins de leur population.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: +6 }
    },
    {
        id: "decent_election_gov",
        question: "Les gouverneurs devraient être élus localement.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: +8 }
    },
    {
        id: "decent_central_unity",
        question: "Un pouvoir central fort est nécessaire pour éviter les divisions régionales.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: -4 }
    },
    {
        id: "decent_central_econ",
        question: "Les décisions économiques doivent rester entre les mains du gouvernement central.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: -6 }
    },
    {
        id: "decent_resources",
        question: "La gestion des ressources naturelles doit rester sous contrôle du gouvernement central.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: -4 }
    },
    {
        id: "decent_council_regions",
        question: "La création du Conseil national des régions et districts pour représenter les territoires et rationaliser le pouvoir parlementaire est une initiative fondamentalement positive.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: +4, decent: -6 },
    },
    {
        id: "decent_uniform_laws",
        question: "Les mêmes lois doivent s’appliquer uniformément sur tout le territoire.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: -6 }
    },
    {
        id: "decent_post_rev",
        question: "La décentralisation post-révolution est essentielle pour améliorer la gouvernance et rapprocher les décisions des citoyens.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: +4, decent: +6 }
    },

    // --- SPÉCIALES ---
    {
        id: "spec_monarchy",
        question: "Il serait préférable pour la Tunisie de restaurer une monarchie constitutionnelle.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 },
        special: "monarchie"
    },
    {
        id: "spec_ugtt",
        question: "L’UGTT a un rôle positif dans la vie politique et sociale tunisienne.",
        effect: { pana: 0, coop: 0, econ: +2, reli: 0, soci: 0, demo: +2, decent: 0 },
        special: "ugtt"
    },
    {
        id: "spec_25jul",
        question: "Les mesures prises par Kaïs Saïed le 25 juillet 2021 étaient nécessaires et justifier pour sauver le pays.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 },
        special: "25juillet",
    },
    {
        id: "spec_ks",
        question: "Kaïs Saïed est un bon président.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: -4, decent: 0 },
        special: "ks",
        tags: ["is_populist"]
    },
    {
        id: "spec_2011",
        question: "La Tunisie aurait dû éviter le processus révolutionnaire de 2011.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: -4, decent: 0 },
        special: "2011"
    },
    {
        id: "spec_maghreb",
        question: "L’avenir de la Tunisie passe par un Maghreb uni, fondée sur nos liens historiques et culturels.",
        effect: { pana: 0, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 },
        special: "maghreb"
    },
    {
        id: "spec_africa",
        question: "La Tunisie fait partie de l’Afrique et doit assumer un rôle moteur dans la construction d’une union africaine forte et souveraine.",
        effect: { pana: -2, coop: 0, econ: 0, reli: 0, soci: 0, demo: 0, decent: 0 },
        special: "afrique"
    },
];