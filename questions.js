const questions = [
    {
        "id": "pana_alliances",
        "question": "La Tunisie devrait prioriser les alliances avec les pays arabes plutôt qu’avec d’autres régions.",
        "effect": {
            "pana": 4,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Tunisia should prioritize alliances with Arab countries over other regions."
    },
    {
        "id": "pana_unity",
        "question": "L’unité politique et économique du monde arabe est un objectif prioritaire.",
        "effect": {
            "pana": 10,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "The political and economic unity of the Arab world is a priority objective."
    },
    {
        "id": "pana_culture",
        "question": "Des compétitions artistiques et culturelles à l'échelle du monde arabe devraient être développées.",
        "effect": {
            "pana": 2,
            "coop": 2,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Artistic and cultural competitions at the Arab world level should be developed."
    },
    {
        "id": "pana_identity",
        "question": "Les Tunisiens partagent principalement une identité arabe.",
        "effect": {
            "pana": 4,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Tunisians primarily share an Arab identity."
    },
    {
        "id": "pana_army",
        "question": "Une armée arabe commune serait bénéfique à la sécurité de la Tunisie.",
        "effect": {
            "pana": 10,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "A common Arab army would be beneficial to Tunisia's security."
    },
    {
        "id": "pana_conflict",
        "question": "La Tunisie devrait soutenir automatiquement ses voisins arabes en cas de conflit avec un pays non arabe.",
        "effect": {
            "pana": 8,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Tunisia should automatically support its Arab neighbors in conflicts with non-Arab countries."
    },
    {
        "id": "pana_afro",
        "question": "La Tunisie est plus arabe qu’africaine.",
        "effect": {
            "pana": 4,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Tunisia is more Arab than African."
    },
    {
        "id": "pana_national_interest",
        "question": "La Tunisie doit avant tout défendre ses intérêts nationaux, même contre des pays arabes.",
        "effect": {
            "pana": -8,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Tunisia must above all defend its national interests, even against Arab countries."
    },
    {
        "id": "pana_independent",
        "question": "Les politiques tunisiennes devraient être pensées indépendamment des priorités du monde arabe.",
        "effect": {
            "pana": -8,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Tunisian policies should be designed independently of Arab world priorities."
    },
    {
        "id": "pana_distinct_culture",
        "question": "La culture tunisienne est distincte et doit être protégée des influences extérieures, y compris du monde arabe.",
        "effect": {
            "pana": -6,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Tunisian culture is distinct and must be protected from external influences, including from the Arab world."
    },
    {
        "id": "pana_diplo",
        "question": "Les décisions diplomatiques de la Tunisie ne doivent pas être influencées par les causes arabes s'ils ne la concernent pas directement.",
        "effect": {
            "pana": -8,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Tunisia's diplomatic decisions should not be influenced by Arab causes that do not directly concern it."
    },
    {
        "id": "pana_no_arab",
        "question": "Le monde arabe n'existe pas.",
        "effect": {
            "pana": -10,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "The Arab world does not exist."
    },
    {
        "id": "coop_active",
        "question": "La Tunisie doit participer activement aux organisations internationales.",
        "effect": {
            "pana": 0,
            "coop": 4,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Tunisia must actively participate in international organizations."
    },
    {
        "id": "coop_treaties",
        "question": "Les traités internationaux sont nécessaires pour protéger les intérêts tunisiens.",
        "effect": {
            "pana": 0,
            "coop": 4,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "International treaties are necessary to protect Tunisian interests."
    },
    {
        "id": "coop_west_partners",
        "question": "La Tunisie devrait renforcer ses partenariats avec des puissances occidentales comme la France, l'Italie ou les États-Unis.",
        "effect": {
            "pana": 0,
            "coop": 2,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Tunisia should strengthen its partnerships with Western powers such as France, Italy, or the United States."
    },
    {
        "id": "coop_fdi",
        "question": "L’ouverture aux investissements étrangers est essentielle au développement du pays.",
        "effect": {
            "pana": 0,
            "coop": 4,
            "econ": -4,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Openness to foreign investment is essential for the country's development."
    },
    {
        "id": "coop_peacekeeping",
        "question": "La Tunisie devrait s’engager dans des missions humanitaires et de maintien de la paix à l’étranger.",
        "effect": {
            "pana": 0,
            "coop": 6,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Tunisia should engage in humanitarian and peacekeeping missions abroad."
    },
    {
        "id": "coop_sovereignty",
        "question": "La Tunisie doit rester maître de ses choix politiques, quitte à faire face à un isolement international.",
        "effect": {
            "pana": 0,
            "coop": -8,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "tags": [
            "is_populist"
        ],
        "_question_en": "Tunisia must remain in control of its own political choices, even at the cost of international isolation."
    },
    {
        "id": "coop_bad_institutions",
        "question": "Les institutions internationales ne respectent pas la souveraineté de la Tunisie et ne protègent pas ses intérêts fondamentaux.",
        "effect": {
            "pana": 0,
            "coop": -8,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "tags": [
            "is_populist"
        ],
        "_question_en": "International institutions do not respect Tunisia's sovereignty and do not protect its fundamental interests."
    },
    {
        "id": "coop_autonomy",
        "question": "La Tunisie devrait réduire sa dépendance envers les aides et partenariats étrangers.",
        "effect": {
            "pana": 0,
            "coop": -4,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Tunisia should reduce its dependence on foreign aid and partnerships."
    },
    {
        "id": "coop_neutrality",
        "question": "La Tunisie gagnerait à suivre la doctrine bourguibienne de neutralité et de non-ingérence dans les conflits extérieurs.",
        "effect": {
            "pana": 0,
            "coop": -4,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Tunisia would benefit from following the Bourguibist doctrine of neutrality and non-interference in external conflicts."
    },
    {
        "id": "econ_state_control",
        "question": "L'État tunisien doit contrôler les secteurs stratégiques de l'économie tels que l'énergie, les transports et les télécommunications.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 6,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "The Tunisian state must control strategic economic sectors such as energy, transport, and telecommunications."
    },
    {
        "id": "econ_services",
        "question": "Les services publics essentiels comme la santé et l'éducation doivent rester gratuits et accessibles à tous, même si cela nécessite une augmentation des impôts.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 4,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Essential public services such as health and education must remain free and accessible to all, even if this requires raising taxes."
    },
    {
        "id": "econ_no_private",
        "question": "Les entreprises privées doivent être abolies.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 10,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Private companies must be abolished."
    },
    {
        "id": "econ_regulation",
        "question": "Les grandes entreprises privées doivent être régulées pour éviter les abus.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 4,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Large private companies must be regulated to prevent abuses."
    },
    {
        "id": "econ_redistribution",
        "question": "La redistribution des richesses est essentielle pour réduire les inégalités.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 6,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Redistribution of wealth is essential to reduce inequalities."
    },
    {
        "id": "econ_competition",
        "question": "La concurrence libre stimule l’innovation et la croissance économique.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": -4,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Free competition stimulates innovation and economic growth."
    },
    {
        "id": "econ_tax_cuts",
        "question": "Les impôts sur les entreprises devraient être réduits pour encourager l’investissement.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": -8,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Corporate taxes should be reduced to encourage investment."
    },
    {
        "id": "econ_private_eff",
        "question": "Le secteur privé est plus efficace que l’État dans la gestion économique.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": -6,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "The private sector is more efficient than the state in economic management."
    },
    {
        "id": "econ_privatization",
        "question": "La privatisation de certaines entreprises publiques serait bénéfique.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": -6,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "The privatization of some state-owned companies would be beneficial."
    },
    {
        "id": "econ_inequality",
        "question": "Les inégalités sont inévitables dans une économie prospère.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": -10,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Inequalities are inevitable in a prosperous economy."
    },
    {
        "id": "econ_subsidies",
        "question": "L’État doit subventionner massivement le pain, l’essence et l’électricité.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 6,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "The state should massively subsidize bread, fuel and electricity."
    },
    {
        "id": "econ_phd_jobs",
        "question": "L'État tunisien devrait procéder à un recrutement exceptionnel des docteurs au chômage pour résoudre la crise de l'emploi dans le secteur de l'enseignement supérieur.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 8,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "The Tunisian state should exceptionally recruit unemployed PhD holders to resolve the employment crisis in higher education.",
        "category": "contextual"
    },
    {
        "id": "econ_corrupt_elite",
        "question": "Le modèle economique tunisien pourrait fonctionner, mais il est pris en otage par une élite corrompue qui s’enrichit pendant que le peuple s’appauvrit.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 10,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "tags": [
            "is_populist"
        ],
        "_question_en": "The Tunisian economic model could work, but it is held hostage by a corrupt elite that enriches itself while the people grow poorer."
    },
    {
        "id": "reli_sharia",
        "question": "La charia devrait inspirer la législation tunisienne.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 10,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Sharia should inspire Tunisian legislation."
    },
    {
        "id": "reli_politics",
        "question": "La religion doit jouer un rôle central dans la vie politique.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 8,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Religion must play a central role in political life."
    },
    {
        "id": "reli_values",
        "question": "Les valeurs islamiques sont indispensables pour guider la société.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 6,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Islamic values are indispensable to guide society."
    },
    {
        "id": "reli_state_support",
        "question": "L’État doit soutenir activement les institutions religieuses.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 4,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "The state must actively support religious institutions."
    },
    {
        "id": "reli_parties",
        "question": "Les partis politiques islamistes doivent être autorisés.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 2,
            "soci": 0,
            "demo": 2,
            "decent": 0
        },
        "_question_en": "Islamist political parties must be permitted."
    },
    {
        "id": "reli_separation",
        "question": "La religion et la politique doivent être totalement séparées.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": -8,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Religion and politics must be completely separated."
    },
    {
        "id": "reli_civil_law",
        "question": "Les lois doivent être basées uniquement sur des principes civils, pas religieux.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": -8,
            "soci": 0,
            "demo": 0,
            "decent": 0
        }
    },
    {
        "id": "reli_neutrality",
        "question": "Les institutions publiques doivent être neutres vis-à-vis de toutes les croyances.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": -8,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Public institutions must be neutral towards all beliefs."
    },
    {
        "id": "reli_freedom",
        "question": "La liberté de culte doit inclure la liberté de ne pas croire.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": -4,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Freedom of religion must include the freedom not to believe."
    },
    {
        "id": "reli_influence",
        "question": "Les discours religieux ne doivent pas influencer les décisions politiques.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": -4,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Religious discourse must not influence political decisions."
    },
    {
        "id": "reli_constitution",
        "question": "Il faut retirer toute mention de l’islam de la constitution.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": -10,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Any mention of Islam should be removed from the constitution."
    },
    {
        "id": "reli_education",
        "question": "Le système éducatif tunisien doit s’aligner davantage sur les principes de l’islam, fondement moral et identitaire de l'individu.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 6,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Tunisia's education system should align more closely with the principles of Islam as a moral and identity foundation."
    },
    {
        "id": "reli_identity_primacy",
        "question": "Mon identité religieuse prime sur mon appartenance nationale, je suis musulman avant d’être tunisien.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 4,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "My religious identity takes precedence over my national belonging — I am Muslim before I am Tunisian."
    },
    {
        "id": "soci_tradition",
        "question": "Les valeurs et coutumes traditionnelles tunisiennes doivent être préservées.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 4,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Traditional Tunisian values and customs must be preserved."
    },
    {
        "id": "soci_reforms",
        "question": "La société tunisienne requiert des réformes sociales rapides et significatives.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": -4,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Tunisian society requires rapid and significant social reforms."
    },
    {
        "id": "soci_family",
        "question": "Le rôle traditionnel de la famille doit être protégé.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 4,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "The traditional role of the family must be protected."
    },
    {
        "id": "soci_western_model",
        "question": "La Tunisie devrait prendre modèle sur les sociétés occidentales pour structurer la sienne.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": -10,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Tunisia should model itself on Western societies to structure its own."
    },
    {
        "id": "soci_gender",
        "question": "L’égalité totale entre hommes et femmes doit être garantie par la loi.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": -6,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Full equality between men and women must be guaranteed by law."
    },
    {
        "id": "soci_lgbt",
        "question": "Les minorités sexuelles doivent avoir les mêmes droits que les autres citoyens.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": -10,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Sexual minorities must have the same rights as other citizens."
    },
    {
        "id": "soci_derja",
        "question": "Le Derja devrait remplacer l’arabe en tant que langue officielle de la Tunisie.",
        "effect": {
            "pana": -6,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": -4,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Derja should replace Arabic as the official language of Tunisia."
    },
    {
        "id": "soci_liberty",
        "question": "Les traditions qui limitent les libertés individuelles doivent être abolies.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": -8,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "Traditions that limit individual freedoms must be abolished."
    },
    {
        "id": "soci_languages",
        "question": "Il est approprié que la Tunisie intègre des langues étrangères dans sa société.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": -8,
            "demo": 0,
            "decent": 0
        },
        "_question_en": "It is appropriate for Tunisia to integrate foreign languages into its society."
    },
    {
        "id": "demo_elections",
        "question": "Des élections libres et régulières sont indispensables.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 6,
            "decent": 0
        },
        "_question_en": "Free and regular elections are indispensable."
    },
    {
        "id": "demo_checks",
        "question": "Les contre-pouvoirs (justice, parlement, médias) doivent être protégés.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 6,
            "decent": 0
        },
        "_question_en": "Checks and balances (judiciary, parliament, media) must be protected."
    },
    {
        "id": "demo_protest",
        "question": "Les manifestations pacifiques sont un droit fondamental.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 4,
            "decent": 0
        },
        "_question_en": "Peaceful protest is a fundamental right."
    },
    {
        "id": "demo_pluralism",
        "question": "Le pluralisme politique est essentiel à la démocratie.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 6,
            "decent": 0
        },
        "_question_en": "Political pluralism is essential to democracy."
    },
    {
        "id": "demo_transparency",
        "question": "La transparence gouvernementale est une priorité.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 6,
            "decent": 0
        },
        "_question_en": "Government transparency is a priority."
    },
    {
        "id": "demo_strong_leader",
        "question": "Un leader fort est parfois nécessaire, même au détriment des libertés politiques.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": -6,
            "decent": 0
        },
        "tags": [
            "is_populist"
        ],
        "_question_en": "A strong leader is sometimes necessary, even at the expense of political freedoms."
    },
    {
        "id": "demo_press_limit",
        "question": "Dans certaines situations, il est acceptable de limiter la liberté de la presse.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": -6,
            "decent": 0
        },
        "tags": [
            "is_populist"
        ],
        "_question_en": "In certain situations, it is acceptable to limit press freedom."
    },
    {
        "id": "demo_opposition",
        "question": "Les opposants politiques menacent la stabilité du pays.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": -8,
            "decent": 0
        },
        "tags": [
            "is_populist"
        ],
        "_question_en": "Political opponents threaten the stability of the country."
    },
    {
        "id": "demo_authoritarian",
        "question": "Un gouvernement autoritaire est plus efficace qu’une démocratie libérale.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": -8,
            "decent": 0
        },
        "tags": [
            "is_populist"
        ],
        "_question_en": "An authoritarian government is more effective than a liberal democracy."
    },
    {
        "id": "demo_speed",
        "question": "Les décisions importantes doivent être prises rapidement, même sans débat public.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": -4,
            "decent": 0
        },
        "tags": [
            "is_populist"
        ],
        "_question_en": "Important decisions must be made quickly, even without public debate."
    },
    {
        "id": "decent_local",
        "question": "Les autorités locales comprennent mieux les besoins de leur population.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 6
        },
        "_question_en": "Local authorities better understand the needs of their population."
    },
    {
        "id": "decent_election_gov",
        "question": "Les gouverneurs devraient être élus localement.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 8
        },
        "_question_en": "Governors should be elected locally."
    },
    {
        "id": "decent_central_unity",
        "question": "Un pouvoir central fort est nécessaire pour éviter les divisions régionales.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": -4
        },
        "_question_en": "A strong central power is necessary to prevent regional divisions."
    },
    {
        "id": "decent_central_econ",
        "question": "Les décisions économiques doivent rester entre les mains du gouvernement central.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": -6
        },
        "_question_en": "Economic decisions must remain in the hands of the central government."
    },
    {
        "id": "decent_resources",
        "question": "La gestion des ressources naturelles doit rester sous contrôle du gouvernement central.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": -4
        },
        "_question_en": "Management of natural resources must remain under central government control."
    },
    {
        "id": "decent_council_regions",
        "question": "La création du Conseil national des régions et districts pour représenter les territoires et rationaliser le pouvoir parlementaire est une initiative fondamentalement positive.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 4,
            "decent": 4
        },
        "_question_en": "The creation of the National Council of Regions and Districts to represent territories and rationalize parliamentary power is a fundamentally positive initiative.",
        "category": "contextual"
    },
    {
        "id": "decent_uniform_laws",
        "question": "Les mêmes lois doivent s’appliquer uniformément sur tout le territoire.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": -6
        },
        "_question_en": "The same laws must apply uniformly across the entire territory."
    },
    {
        "id": "decent_post_rev",
        "question": "La décentralisation post-révolution est essentielle pour améliorer la gouvernance et rapprocher les décisions des citoyens.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 4,
            "decent": 6
        },
        "_question_en": "Post-revolution decentralization is essential to improve governance and bring decisions closer to citizens."
    },
    {
        "id": "spec_monarchy",
        "question": "Il serait préférable pour la Tunisie de restaurer une monarchie constitutionnelle.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 2,
            "demo": 0,
            "decent": 0
        },
        "special": "monarchie",
        "category": "contextual",
        "_question_en": "It would be preferable for Tunisia to restore a constitutional monarchy."
    },
    {
        "id": "spec_ugtt",
        "question": "L’UGTT a un rôle positif dans la vie politique et sociale tunisienne.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 2,
            "reli": 0,
            "soci": 0,
            "demo": 2,
            "decent": 0
        },
        "special": "ugtt",
        "category": "contextual",
        "_question_en": "The UGTT plays a positive role in Tunisian political and social life."
    },
    {
        "id": "spec_25jul",
        "question": "Les mesures prises par Kaïs Saïed le 25 juillet 2021 étaient nécessaires et justifier pour sauver le pays.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": -2,
            "decent": 0
        },
        "special": "25juillet",
        "category": "contextual",
        "_question_en": "The measures taken by Kais Saied on July 25, 2021 were necessary and justified to save the country."
    },
    {
        "id": "spec_ks",
        "question": "Kaïs Saïed est un bon président.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": -2,
            "decent": 0
        },
        "special": "ks",
        "tags": [
            "is_populist"
        ],
        "category": "contextual",
        "_question_en": "Kais Saied is a good president."
    },
    {
        "id": "spec_2011",
        "question": "La Tunisie aurait dû éviter le processus révolutionnaire de 2011.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": -4,
            "decent": 0
        },
        "special": "2011",
        "category": "contextual",
        "_question_en": "Tunisia should have avoided the revolutionary process of 2011."
    },
    {
        "id": "spec_maghreb",
        "question": "L’avenir de la Tunisie passe par un Maghreb uni, fondée sur nos liens historiques et culturels.",
        "effect": {
            "pana": 0,
            "coop": 4,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "special": "maghreb",
        "category": "contextual",
        "_question_en": "Tunisia's future lies in a united Maghreb, built on our historical and cultural ties."
    },
    {
        "id": "spec_africa",
        "question": "La Tunisie fait partie de l’Afrique et doit assumer un rôle moteur dans la construction d’une union africaine forte et souveraine.",
        "effect": {
            "pana": -2,
            "coop": 4,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "special": "afrique",
        "category": "contextual",
        "_question_en": "Tunisia is part of Africa and must play a leading role in building a strong and sovereign African union."
    },
    {
        "id": "ctx_normalisation",
        "question": "L'assemblée des représentants du peuple doit adopter une loi criminalisant formellement toute forme de normalisation avec l'entité sioniste.",
        "effect": {
            "pana": 2,
            "coop": -2,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "category": "contextual",
        "_question_en": "The Tunisian parliament must adopt a law criminalizing any form of normalization with the Zionist entity."
    },
    {
        "id": "spec_bourguiba",
        "question": "L'héritage politique de Habib Bourguiba est globalement positif.",
        "effect": {
            "pana": -4,
            "coop": 0,
            "econ": 0,
            "reli": -4,
            "soci": -2,
            "demo": -4,
            "decent": -2
        },
        "_question_en": "The political legacy of Habib Bourguiba is overall positive."
    },
    {
        "id": "ctx_gabes",
        "question": "Pour mettre fin au désastre écologique à Gabès, l'État doit ordonner l'arrêt immédiat des activités du Groupe Chimique.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 4,
            "decent": 4
        },
        "category": "contextual",
        "_question_en": "The state must immediately close or relocate the Chemical Group in Gabès for ecological reasons, even if it costs thousands of jobs."
    },
    {
        "id": "ctx_imf",
        "question": "La Tunisie doit refuser les diktats du Fonds Monétaire International pour préserver sa souveraineté.",
        "effect": {
            "pana": 0,
            "coop": -6,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "category": "contextual",
        "_question_en": "Tunisia must refuse the dictates of the International Monetary Fund in order to preserve its sovereignty."
    },
    {
        "id": "ctx_mig",
        "question": "L'État devrait imposer aux jeunes médecins et ingénieurs formés dans le public de travailler quelques années en Tunisie avant d'être autorisés à s'expatrier.",
        "effect": {
            "pana": 0,
            "coop": -4,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": -2,
            "decent": 0
        },
        "category": "contextual",
        "_question_en": "The state should require young doctors and engineers trained in the public system to work a few years in Tunisia before being allowed to emigrate."
    },
    {
        "id": "ctx_mor",
        "question": "La Tunisie devrait lever le moratoire sur la peine de mort et rétablir son application pour les crimes les plus graves.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 4,
            "demo": -2,
            "decent": 0
        },
        "category": "contextual",
        "_question_en": "Tunisia should lift the moratorium on the death penalty and restore its application for the most serious crimes."
    },
    {
        "id": "ctx_civ",
        "question": "Les associations et ONG tunisiennes financées par l'étranger devraient être strictement contrôlées, voire interdites, car elles servent des agendas étrangers.",
        "effect": {
            "pana": 0,
            "coop": -4,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "category": "contextual",
        "tags": [
            "is_populist"
        ],
        "_question_en": "Foreign-funded Tunisian associations and NGOs should be strictly regulated, or even banned, as they serve foreign agendas."
    },
    {
        "id": "ctx_ben",
        "question": "Zine el-Abidine Ben Ali est un président dont le bilan est positif pour la Tunisie.",
        "effect": {
            "pana": 0,
            "coop": -4,
            "econ": 0,
            "reli": 0,
            "soci": -2,
            "demo": -2,
            "decent": -2
        },
        "tags": [
            "is_populist"
        ],
        "category": "contextual",
        "_question_en": "Zine el-Abidine Ben Ali is a president whose record is positive for Tunisia."
    },
    {
        "id": "ctx_sub",
        "question": "L'immigration irrégulière d'origine subsaharienne constitue une menace démographique et sécuritaire pour la Tunisie.",
        "effect": {
            "pana": 0,
            "coop": -4,
            "econ": 0,
            "reli": 0,
            "soci": 2,
            "demo": 0,
            "decent": 0
        },
        "category": "contextual",
        "_question_en": "Irregular immigration from Sub-Saharan Africa constitutes a demographic and security threat to Tunisia."
    },
    {
        "id": "ctx_corp",
        "question": "Les entreprises communautaires promues par l’État constituent la meilleure solution pour développer les régions marginalisées et générer une véritable création de richesse locale.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 2,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 4
        },
        "category": "contextual",
        "_question_en": "State-promoted community enterprises are the best solution for developing marginalized regions and generating genuine local wealth creation."
    },
    {
        "id": "ctx_dl54",
        "question": "L'application du Décret 54 est une nécessité absolue pour assainir les réseaux sociaux des fausses informations et de la diffamation.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": -4,
            "decent": 0
        },
        "category": "contextual",
        "_question_en": "The enforcement of Decree 54 is an absolute necessity to cleanse social media of misinformation and defamation."
    },
    {
        "id": "ctx_gafsa",
        "question": "L'État a le droit d'utiliser la force pour interdire les sit-ins et les grèves qui bloquent la production et le transport du phosphate dans le bassin minier de Gafsa.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": -2,
            "decent": -4
        },
        "category": "contextual",
        "_question_en": "The state has the right to use the army to prohibit sit-ins and strikes that block the production and transport of phosphate in the Gafsa mining basin."
    },
    {
        "id": "ctx_amb",
        "question": "La Tunisie devrait expulser systématiquement tout ambassadeur étranger qui rencontre des opposants politiques ou des membres de la société civile sans l'accord préalable du ministère des Affaires étrangères.",
        "effect": {
            "pana": 0,
            "coop": -2,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "category": "contextual",
        "_question_en": "Tunisia should systematically expel any foreign ambassador who meets political opponents or members of civil society without prior approval from the Ministry of Foreign Affairs."
    },
    {
        "id": "ctx_infl",
        "question": "L'État fait bien de condamner à la prison les créateurs de contenu sur TikTok et Instagram qui portent atteinte aux \"bonnes mœurs\" et à la morale publique.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 4,
            "demo": -2,
            "decent": 0
        },
        "category": "contextual",
        "_question_en": "The state is right to imprison content creators on TikTok and Instagram who violate “public decency” and moral standards."
    },
    {
        "id": "ctx_nsf",
        "question": "L'autoproclamé \"Front de Salut National\" est une alliance contre-nature qui ne cherche qu'à ramener le pays aux dysfonctionnements d'avant le 25 juillet.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": 0,
            "decent": 0
        },
        "category": "contextual",
        "_question_en": "The self-proclaimed “National Salvation Front” is an unnatural alliance that only seeks to return the country to the dysfunctions that existed before July 25."
    },
    {
        "id": "ctx_ugtt",
        "question": "L'UGTT se comporte aujourd'hui comme un \"État dans l'État\" et représente le principal frein aux réformes économiques du pays.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": -2,
            "reli": 0,
            "soci": 0,
            "demo": -2,
            "decent": 0
        },
        "category": "contextual",
        "_question_en": "Today, the UGTT behaves like a “state within the state” and represents the main obstacle to the country’s economic reforms."
    },
    {
        "id": "ctx_party",
        "question": "Tous les partis politiques ayant participé au pouvoir durant la décennie 2011-2021 devraient être définitivement exclus de la vie politique tunisienne.",
        "effect": {
            "pana": 0,
            "coop": 0,
            "econ": 0,
            "reli": 0,
            "soci": 0,
            "demo": -2,
            "decent": 0
        },
        "category": "contextual",
        "_question_en": "All political parties that took part in governing during the 2011–2021 decade should be permanently excluded from Tunisian political life."
    }
];
