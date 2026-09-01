window.TV = (function() {

    let _lang = localStorage.getItem('tv_lang') || 'fr';

    const t = {

        fr: {
            site_title: "TUNISIAN VALUES",
            site_subtitle: "TEST POLITIQUE TUNISIEN",

            hero_description: "Découvrez vos orientations politiques à travers un questionnaire adapté au contexte tunisien.",
            cta_start: "FAIRE LE TEST",
            card_what_title: "QU'EST-CE QUE TUNISIAN VALUES ?",
            card_what_meta: "73 questions (+ 25 optionnelles) • 7 axes politiques • ~10 minutes",
            card_what_body: "TunisianValues est un quiz politique adapté au contexte tunisien. Vous répondrez à 73 affirmations principales (+ 25 contextuelles optionnelles) selon votre niveau d'accord, de \"Tout à fait d'accord\" à \"Pas du tout d'accord.\"",
            card_axes_title: "7 AXES POLITIQUES",
            card_axes_meta: "Une analyse multidimensionnelle de vos valeurs",
            card_axes_body: "À la fin, vos réponses vous placeront sur 7 grands axes reflétant les différentes sensibilités politiques présentes en Tunisie : Panarabisme, Coopération internationale, Économie, Religion, Société, Démocratie et Gouvernance.",
            section_axes_title: "LES 7 AXES ANALYSÉS",
            section_axes_sub: "Votre position sur les grands enjeux de la politique tunisienne",
            footer_copy: "© 2026 TunisianValues.",

            instructions_title: "INSTRUCTIONS",
            instructions_body: "On vous présentera une série d'énoncés. Pour chacun, choisissez l'option qui correspond le mieux à votre opinion.",
            btn_start: "COMMENCER",
            btn_back_home: "Retour à l'accueil",

            quiz_loading: "Chargement...",
            quiz_question_of: "Question {n} sur {total}",
            ans_agree_strong: "Tout à fait d'accord",
            ans_agree: "Plutôt d'accord",
            ans_neutral: "Neutre / Partagé",
            ans_disagree: "Plutôt pas d'accord",
            ans_disagree_strong: "Pas du tout d'accord",
            btn_prev: "← Précédent",

            // --- TRADUCTIONS DE L'INTERMISSION ---
            quiz_intermission_title: "PARTIE PRINCIPALE TERMINÉE !",
            quiz_intermission_text: "Vous avez répondu à toutes les questions de base. Vous pouvez dès à présent voir vos résultats, ou continuer avec quelques questions contextuelles (optionnelles) sur des sujets spécifiques (Palestine, environnement, héritage historique...) pour affiner votre profil.",
            btn_results_now: "Voir mes résultats",
            btn_continue_context: "Affiner avec les questions contextuelles",

            results_title: "Vos Résultats",
            results_closest_party: "Parti le plus proche",
            results_closest_personality: "Personnalité la plus proche",
            results_no_personality: "Aucune figure proche",
            results_uncertain_title: "Résultat incertain",
            results_uncertain_body: "Vous avez répondu \"Neutre\" à une majorité de questions (>50%). Vous êtes probablement Indépendant.",
            results_populism: "Populisme",
            results_independent: "Indépendant / Sans Affiliation",
            results_compass_title: "Boussole Politique",
            results_compass_sub: "Votre position parmi les partis tunisiens",
            results_special_title: "Positions Spéciales",
            results_axes_title: "Axes politiques",
            results_refine_title: "Affiner votre profil et vos priorités",
            results_refine_body: "Attribuez une importance à chaque axe pour ajuster le calcul.",
            btn_recalculate: "Recalculer",
            results_ranking_title: "Voir le classement détaillé",
            results_intl_title: "Équivalents Internationaux",
            results_intl_sub: "Découvrez quel parti ou mouvement correspond le plus à vos valeurs en France, Belgique et au Québec.",
            results_intl_fr: "France",
            results_intl_be: "Belgique",
            results_intl_qc: "Québec",
            results_intl_no_match: "Pas d'équivalent direct dans ce pays (spécificité politique tunisienne)",
            btn_export: "Exporter mes résultats",
            btn_share: "Partager mes résultats",
            btn_redo: "Refaire le Quiz",
            legend_you: "Vous",
            legend_party: "Parti",
            compass_x_left: "SOCIALISME",
            compass_x_right: "LIBÉRALISME",
            compass_y_top: "DÉMOCRATIE",
            compass_y_bottom: "AUTORITARISME",
            result_incompatible: "Incompatible",
            neutral_pct: "Neutre",

            // --- PARTAGE ---
            share_modal_title: "Partager mes résultats",
            share_modal_sub: "Générez un lien compact avec votre nom pour le partager",
            share_name_label: "Votre prénom ou pseudo (optionnel) :",
            share_name_placeholder: "Ex: Sami, Yasmine...",
            share_link_label: "Lien de partage :",
            share_btn_copy: "Copier le lien",
            share_copied: "Lien copié !",
            share_shared_by: "Profil politique partagé par {name}",
            share_shared_by_anon: "Profil politique partagé",
            share_cta_take_test: "Faire le test à mon tour",
            results_no_data_title: "Aucun résultat trouvé",
            results_no_data_body: "Vous n'avez pas encore passé le test. Répondez au questionnaire pour découvrir votre positionnement.",
            results_no_data_cta: "Commencer le test",

            ax_pana: "Panarabisme",
            ax_coop: "Coopération",
            ax_econ: "Économie",
            ax_reli: "Religion",
            ax_soci: "Sociétal",
            ax_demo: "Démocratie",
            ax_decent: "Gouvernance",

            ax_pana_left: "Panarabisme",
            ax_pana_right: "Nationalisme",
            ax_coop_left: "Internationalisme",
            ax_coop_right: "Souverainisme",
            ax_econ_left: "Socialisme",
            ax_econ_right: "Libéralisme",
            ax_reli_left: "Islamisme",
            ax_reli_right: "Sécularisme",
            ax_soci_left: "Conservatisme",
            ax_soci_right: "Progressisme",
            ax_demo_left: "Démocratie",
            ax_demo_right: "Autoritarisme",
            ax_decent_left: "Décentralisation",
            ax_decent_right: "Centralisation",

            export_title: "Exporter mes résultats",
            export_sub: "Personnalisez votre image avant de la télécharger",
            export_sections: "Sections",
            export_opt_bars: "Barres politiques",
            export_opt_compass: "Boussole politique",
            export_opt_icons: "Positions spéciales",
            export_icons_label: "Icônes à afficher",
            export_preview_label: "Prévisualisation",
            btn_cancel: "Annuler",
            btn_download: "Télécharger",
            btn_generating: "Génération…",
            export_profile_label: "Profil le plus proche",
            export_date_label: "Mon profil politique",

            spec_25juillet: "Soutien au 25 Juillet",
            spec_maghreb: "Union du Maghreb",
            spec_monarchie: "Monarchiste",
            spec_ugtt: "Soutien à l'UGTT",
            spec_ks: "Pro-Kaïs Saïed",
            spec_2011: "Critique de 2011",
            spec_afrique: "Union Africaine",

            compass_x_select: "Axe Horizontal (X)",
            compass_y_select: "Axe Vertical (Y)",

            // History Tabs
            btn_read_history: "Aperçu historique",
            hist_ennahdha: "Issu du Mouvement de la Tendance Islamique, Ennahdha a souvent été décrit comme entretenant des affinités idéologiques et des liens historiques avec les Frères musulmans, bien que ces liens soient contestés et niés par le parti. Après 2011, il devient un acteur central du paysage politique tunisien, se présentant comme un parti musulman conservateur et démocrate. Son passage au pouvoir est marqué par des controverses, notamment des accusations de gestion financière opaque et des soupçons de liens avec des réseaux de recrutement djihadistes durant la période de transition. Sur la décennie suivante, son ambiguïté idéologique et sa gestion du pouvoir alimentent une méfiance croissante, et il est largement tenu pour responsable par ses opposants de la crise économique et du blocage institutionnel.",
            hist_pdl: "Créé en 2013 sous le nom de Mouvement Destourien, le parti a été rebaptisé en 2016 lors de l'élection d'Abir Moussi à sa présidence. Il se présente comme l'héritier du Néo-Destour de Habib Bourguiba et du Rassemblement Constitutionnel Démocratique (RCD) de Ben Ali. Le PDL base son programme sur l'opposition stricte à l'islam politique et rejette le processus de transition politique initié en 2011, défendant un retour à un État centralisé fort.",
            hist_echaab: "Légalisé en 2011, le Mouvement Echaâb est un parti nationaliste arabe d'idéologie nassérienne. Il intègre initialement le Front Populaire, une coalition de partis de gauche, avant de s'en retirer en 2013. Son orientation politique mêle nationalisme panarabe, souverainisme économique et rôle central de l'État. Il a formé un bloc parlementaire conjoint avec le Courant Démocrate entre 2019 et 2021, et s'est positionné en faveur des mesures de suspension du parlement prises en juillet 2021.",
            hist_afek: "Fondé en mars 2011, Afek Tounes est un parti d'orientation libérale sur le plan économique et sociétal. En 2012, il participe à la création du parti Al Joumhouri en fusionnant avec d'autres formations centristes, mais s'en retire en 2013 pour reprendre son indépendance. Le parti a participé au gouvernement entre 2015 et 2017 au sein d'une coalition gouvernementale, période durant laquelle il a soutenu des politiques de réformes économiques libérales.",
            hist_pt: "Fondé clandestinement en 1986 par Hamma Hammami sous le nom de Parti Communiste des Ouvriers de Tunisie (PCOT), il a constitué une opposition marxiste-léniniste au régime de Ben Ali. Légalisé en 2011, il supprime la référence communiste de son nom en 2012. Il est l'une des principales composantes fondatrices du Front Populaire, une large coalition de partis de gauche et nationalistes qui a exercé une opposition au gouvernement de la Troïka de 2011 à 2014.",
            hist_alkarama: "Coalition politique lancée en 2019 par Seifeddine Makhlouf, Al Karama s'est construite sur une ligne islamiste radicale et un discours populiste à la droite d'Ennahdha. Le mouvement a attiré l'attention par ses méthodes de communication conflictuelles, ciblant violemment ses opposants, la presse et les institutions syndicales. Plusieurs de ses cadres dirigeants ont été visés par des poursuites judiciaires.",
            hist_attayar: "Créé en 2013 par Mohamed Abbou après sa démission du gouvernement de la Troïka, le Courant Démocrate est un parti social-démocrate. Son programme est historiquement centré sur la lutte contre la corruption financière et administrative, l'application de la loi et le renforcement des institutions étatiques. Le parti a connu une progression électorale en 2019 et a participé au gouvernement d'Elyes Fakhfakh en 2020, avant de s'opposer aux mesures présidentielles de 2021.",
            hist_ettakatol: "Le Forum Démocratique pour le Travail et les Libertés (FDTL), ou Ettakatol, a été fondé en 1994 par Mustapha Ben Jaafar et reconnu légalement en 2002. Membre de l'Internationale Socialiste, il s'agissait d'un parti d'opposition toléré sous Ben Ali. Après la révolution de 2011, il participe à la coalition gouvernementale de la Troïka aux côtés d'Ennahdha et du CPR. Mustapha Ben Jaafar préside alors l'Assemblée constituante. Cette alliance a entraîné par la suite une forte baisse de son électorat.",
            hist_aljoumhouri: "Pour comprendre Al Joumhouri, il faut remonter au Parti Démocrate Progressiste (PDP). Fondé en 1983 par Ahmed Néjib Chebbi, le PDP a été le principal parti d'opposition légale sous le régime de Ben Ali. En 2012, dans le but d'unifier la famille politique centriste face au gouvernement de la Troïka, le PDP fusionne avec d'autres formations (dont Afek Tounes) pour créer Al Joumhouri. La fusion échoue rapidement : Afek Tounes et plusieurs cadres se retirent, laissant Al Joumhouri amoindri sur le plan électoral au cours de la décennie suivante.",
            hist_baath: "Le parti Baath représente la branche tunisienne officielle du mouvement politique panarabe historique du même nom, né au Moyen-Orient. Présent de façon clandestine en Tunisie à partir des années 1950, il a opéré en marge de la politique officielle avant d'être légalisé après 2011. Son idéologie repose sur le nationalisme arabe unificateur. Son poids sur la scène politique et électorale tunisienne contemporaine est resté très limité.",
            hist_25jul: "Le Mouvement du 25-Juillet est une formation apparue à la suite des décisions du président Kaïs Saïed du 25 juillet 2021 (gel du parlement, renvoi du chef du gouvernement). Ce regroupement est composé de partisans de ces décisions et de comités de soutien au Président. Leur ligne politique défend un changement radical du système de gouvernance mis en place par la Constitution de 2014 et s'oppose au système des partis politiques traditionnels.",
            hist_tnp: "Le Parti Nationaliste Tunisien (TNP) est une formation politique qui s'est fait connaître publiquement au début de l'année 2023. Son discours et ses activités politiques sont presque exclusivement focalisés sur le rejet de la présence des migrants originaires d'Afrique subsaharienne sur le territoire tunisien. Le parti prône une définition stricte de l'identité nationale tunisienne, rejetant les affiliations africaines au profit d'un nationalisme local exacerbé.",
            hist_upl: "L'Union Patriotique Libre (UPL) a été créée en 2011 par l'homme d'affaires Slim Riahi. Le parti s'est démarqué lors de ses débuts par l'utilisation de campagnes de communication à très gros budget. Lors des élections législatives de 2014, il a obtenu la troisième place, ce qui lui a permis de participer au gouvernement de coalition. Le parti a cependant disparu de la scène politique quelques années plus tard, parallèlement aux poursuites judiciaires ayant visé son fondateur.",
            hist_pl: "Le PLT est le micro-parti de Mounir Baatour. Le parti est principalement connu pour les positions polémiques de son chef, notamment son soutien à la normalisation avec Israël et son militantisme LGBT.",
            hist_watad: "Le Mouvement des Patriotes Démocrates (connu sous l'acronyme Watad) est un parti marxiste d'orientation panarabe. Avant 2011, il était très actif dans les milieux syndicaux et étudiants sous le régime de Ben Ali en tant qu'opposition non reconnue. Légalisé après la révolution, il devient une force influente de la gauche. L'histoire du parti a été marquée par l'assassinat en février 2013 de son secrétaire général, Chokri Belaïd, événement qui a déclenché une crise politique majeure en Tunisie."
        },

        en: {
            site_title: "TUNISIAN VALUES",
            site_subtitle: "TUNISIAN POLITICAL TEST",

            hero_description: "Discover your political orientations through a questionnaire adapted to the Tunisian context.",
            cta_start: "TAKE THE TEST",
            card_what_title: "WHAT IS TUNISIAN VALUES?",
            card_what_meta: "73 questions (+ 25 optional) • 7 political axes • ~10 minutes",
            card_what_body: "TunisianValues is a political quiz adapted to the Tunisian context. You will respond to 73 main statements (+ 25 optional contextual ones) according to your level of agreement, from \"Strongly Agree\" to \"Strongly Disagree.\"",
            card_axes_title: "7 POLITICAL AXES",
            card_axes_meta: "A multidimensional analysis of your values",
            card_axes_body: "At the end, your answers will place you on 7 major axes reflecting the different political sensibilities in Tunisia: Pan-Arabism, International Cooperation, Economy, Religion, Society, Democracy and Governance.",
            section_axes_title: "THE 7 AXES ANALYZED",
            section_axes_sub: "Your position on the major issues of Tunisian politics",
            footer_copy: "© 2026 TunisianValues.",

            instructions_title: "INSTRUCTIONS",
            instructions_body: "You will be presented with a series of statements. For each one, choose the option that best corresponds to your opinion.",
            btn_start: "START",
            btn_back_home: "Back to home",

            quiz_loading: "Loading...",
            quiz_question_of: "Question {n} of {total}",
            ans_agree_strong: "Strongly Agree",
            ans_agree: "Agree",
            ans_neutral: "Neutral",
            ans_disagree: "Disagree",
            ans_disagree_strong: "Strongly Disagree",
            btn_prev: "← Previous",

            quiz_intermission_title: "MAIN PART COMPLETED!",
            quiz_intermission_text: "You have answered all the basic questions. You can now view your results, or continue with a few optional contextual questions on specific topics (Palestine, environment, historical heritage...) to refine your profile.",
            btn_results_now: "View my results",
            btn_continue_context: "Refine with contextual questions",

            results_title: "Your Results",
            results_closest_party: "Closest Party",
            results_closest_personality: "Closest Personality",
            results_no_personality: "No close figure",
            results_uncertain_title: "Uncertain result",
            results_uncertain_body: "You answered \"Neutral\" to the majority of questions (>50%). You are likely Independent.",
            results_populism: "Populism",
            results_independent: "Independent / No Affiliation",
            results_compass_title: "Political Compass",
            results_compass_sub: "Your position among Tunisian parties",
            results_special_title: "Special Positions",
            results_axes_title: "Political axes",
            results_refine_title: "Refine your profile and priorities",
            results_refine_body: "Assign an importance to each axis to adjust the calculation.",
            btn_recalculate: "Recalculate",
            results_ranking_title: "View detailed rankings",
            results_intl_title: "International Equivalents",
            results_intl_sub: "Discover which party or movement matches your values in France, Belgium, and Quebec.",
            results_intl_fr: "France",
            results_intl_be: "Belgium",
            results_intl_qc: "Quebec",
            results_intl_no_match: "No direct equivalent in this country (specific to the Tunisian political landscape)",
            btn_export: "Export my results",
            btn_share: "Share my results",
            btn_redo: "Retake the Quiz",
            legend_you: "You",
            legend_party: "Party",
            compass_x_left: "SOCIALISM",
            compass_x_right: "LIBERALISM",
            compass_y_top: "DEMOCRACY",
            compass_y_bottom: "AUTHORITARIANISM",
            result_incompatible: "Incompatible",
            neutral_pct: "Neutral",

            // --- SHARING ---
            share_modal_title: "Share my results",
            share_modal_sub: "Generate a compact link with your name to share with friends",
            share_name_label: "Your name or nickname (optional):",
            share_name_placeholder: "E.g., Sami, Yasmine...",
            share_link_label: "Shareable link:",
            share_btn_copy: "Copy link",
            share_copied: "Link copied!",
            share_shared_by: "Political profile shared by {name}",
            share_shared_by_anon: "Shared political profile",
            share_cta_take_test: "Take the test yourself",
            results_no_data_title: "No results found",
            results_no_data_body: "You haven't taken the test yet. Answer the questionnaire to discover your political profile.",
            results_no_data_cta: "Start the test",

            ax_pana: "Pan-Arabism",
            ax_coop: "Cooperation",
            ax_econ: "Economy",
            ax_reli: "Religion",
            ax_soci: "Society",
            ax_demo: "Democracy",
            ax_decent: "Governance",

            ax_pana_left: "Pan-Arabism",
            ax_pana_right: "Nationalism",
            ax_coop_left: "Internationalism",
            ax_coop_right: "Sovereigntism",
            ax_econ_left: "Socialism",
            ax_econ_right: "Liberalism",
            ax_reli_left: "Islamism",
            ax_reli_right: "Secularism",
            ax_soci_left: "Conservatism",
            ax_soci_right: "Progressivism",
            ax_demo_left: "Democracy",
            ax_demo_right: "Authoritarianism",
            ax_decent_left: "Decentralization",
            ax_decent_right: "Centralization",

            export_title: "Export my results",
            export_sub: "Customize your image before downloading",
            export_sections: "Sections",
            export_opt_bars: "Political bars",
            export_opt_compass: "Political compass",
            export_opt_icons: "Special positions",
            export_icons_label: "Icons to display",
            export_preview_label: "Preview",
            btn_cancel: "Cancel",
            btn_download: "Download",
            btn_generating: "Generating…",
            export_profile_label: "Closest profile",
            export_date_label: "My political profile",

            spec_25juillet: "Support for July 25th",
            spec_maghreb: "Maghreb Union",
            spec_monarchie: "Monarchist",
            spec_ugtt: "Support for UGTT",
            spec_ks: "Pro-Kais Saied",
            spec_2011: "Critical of 2011",
            spec_afrique: "African Union",

            compass_x_select: "Horizontal Axis (X)",
            compass_y_select: "Vertical Axis (Y)",

            // History Tabs
            btn_read_history: "Historical overview",
            hist_ennahdha: "Originating from the Islamic Tendency Movement, Ennahdha has often been described as having ideological affinities and historical links with the Muslim Brotherhood, though these ties are contested and denied by the party itself. After 2011, it became a central actor in Tunisia’s political landscape, presenting itself as a conservative democratic Muslim party. Its time in power was marked by controversies, including accusations of opaque financial management and alleged links to jihadist recruitment networks during the early transition period. Over the following decade, its ideological ambiguity and governance record contributed to growing mistrust, and it was widely blamed by its critics for the economic crisis and institutional deadlock.",
            hist_pdl: "Created in 2013 as the Destourian Movement, the party was renamed in 2016 upon Abir Moussi's election to its presidency. It presents itself as the heir to Habib Bourguiba's Neo-Destour and Ben Ali's Democratic Constitutional Rally (RCD). The PDL bases its platform on strict opposition to political Islam and rejects the political transition process initiated in 2011, advocating for a return to a strong centralized state.",
            hist_echaab: "Legalized in 2011, the Echaab Movement is an Arab nationalist party of Nasserist ideology. It initially joined the Popular Front, a coalition of left-wing parties, before withdrawing in 2013. Its political orientation blends pan-Arab nationalism, economic sovereignty, and a central role for the state. It formed a joint parliamentary bloc with the Democratic Current between 2019 and 2021, and positioned itself in favor of the parliamentary suspension measures taken in July 2021.",
            hist_afek: "Founded in March 2011, Afek Tounes is a party with a liberal orientation both economically and societally. In 2012, it participated in creating the Al Joumhouri party by merging with other centrist formations, but withdrew in 2013 to regain its independence. The party participated in the government between 2015 and 2017 within a governing coalition, during which time it supported liberal economic reform policies.",
            hist_pt: "Founded clandestinely in 1986 by Hamma Hammami under the name Communist Workers' Party of Tunisia (PCOT), it formed a Marxist-Leninist opposition to Ben Ali's regime. Legalized in 2011, it dropped the communist reference from its name in 2012. It was one of the main founding components of the Popular Front, a broad coalition of left-wing and nationalist parties that opposed the Troika government from 2011 to 2014.",
            hist_alkarama: "Founded in 2019 by Seifeddine Makhlouf, the Al Karama Coalition established itself around a radical Islamist line and a populist discourse positioned to the right of Ennahdha. The movement drew attention for its confrontational communication methods, aggressively targeting its opponents, the press, and trade union institutions. Several of its senior leaders have been the subject of legal proceedings.",
            hist_attayar: "Created in 2013 by Mohamed Abbou following his resignation from the Troika government, the Democratic Current is a social-democratic party. Its program has historically focused on fighting financial and administrative corruption, applying the law, and strengthening state institutions. The party experienced electoral growth in 2019 and participated in Elyes Fakhfakh's government in 2020, before opposing the presidential measures of 2021.",
            hist_ettakatol: "The Democratic Forum for Labour and Liberties (FDTL), or Ettakatol, was founded in 1994 by Mustapha Ben Jaafar and legally recognized in 2002. A member of the Socialist International, it was an opposition party tolerated under Ben Ali. After the 2011 revolution, it participated in the Troika government coalition alongside Ennahdha and the CPR. Mustapha Ben Jaafar then presided over the Constituent Assembly. This alliance subsequently led to a sharp decline in its electorate.",
            hist_aljoumhouri: "To understand Al Joumhouri, one must trace back to the Progressive Democratic Party (PDP). Founded in 1983 by Ahmed Nejib Chebbi, the PDP was the main legal opposition party under Ben Ali's regime. In 2012, aiming to unify the centrist political family against the Troika government, the PDP merged with other formations (including Afek Tounes) to create Al Joumhouri. The merger quickly failed: Afek Tounes and several executives withdrew, leaving Al Joumhouri electorally diminished over the following decade.",
            hist_baath: "The Ba'ath party represents the official Tunisian branch of the historic pan-Arab political movement of the same name, which originated in the Middle East. Present clandestinely in Tunisia from the 1950s, it operated on the margins of official politics before being legalized after 2011. Its ideology is based on unifying Arab nationalism. Its weight on the contemporary Tunisian political and electoral scene has remained very limited.",
            hist_25jul: "The July 25 Movement is a formation that emerged following President Kais Saied's decisions on July 25, 2021 (freezing parliament, dismissing the head of government). This grouping consists of supporters of these decisions and presidential support committees. Their political line advocates a radical change to the governance system established by the 2014 Constitution and opposes the traditional political party system.",
            hist_tnp: "The Tunisian Nationalist Party (TNP) is a political formation that became publicly known in early 2023. Its discourse and political activities are almost exclusively focused on rejecting the presence of migrants from Sub-Saharan Africa on Tunisian territory. The party advocates a strict definition of Tunisian national identity, rejecting African affiliations in favor of heightened local nationalism.",
            hist_upl: "The Free Patriotic Union (UPL) was created in 2011 by businessman Slim Riahi. The party stood out in its early days by using very high-budget communication campaigns. In the 2014 legislative elections, it secured third place, which allowed it to participate in the coalition government. However, the party disappeared from the political scene a few years later, parallel to the legal proceedings targeting its founder.",
            hist_pl: "The PLT is the micro-party of Mounir Baatour. The party is mainly known for the controversial positions of its leader, particularly his support for normalization with Israel and his LGBT activism.",
            hist_watad: "The Movement of Democratic Patriots (known by the acronym Watad) is a Marxist party with a pan-Arab orientation. Before 2011, it was highly active in union and student circles under the Ben Ali regime as an unrecognized opposition. Legalized after the revolution, it became an influential force on the left. The party's history was marked by the February 2013 assassination of its secretary general, Chokri Belaid, an event that triggered a major political crisis in Tunisia."
        }
    };

    const questionsEN = {
        "pana_alliances": "Tunisia should prioritize alliances with Arab countries over other regions.",
        "pana_unity": "The political and economic unity of the Arab world is a priority objective.",
        "pana_culture": "Artistic and cultural competitions at the Arab world level should be developed.",
        "pana_identity": "Tunisians primarily share an Arab identity.",
        "pana_army": "A common Arab army would be beneficial to Tunisia's security.",
        "pana_conflict": "Tunisia should automatically support its Arab neighbors in conflicts with non-Arab countries.",
        "pana_afro": "Tunisia is more Arab than African.",
        "pana_national_interest": "Tunisia must above all defend its national interests, even against Arab countries.",
        "pana_independent": "Tunisian policies should be designed independently of Arab world priorities.",
        "pana_distinct_culture": "Tunisian culture is distinct and must be protected from external influences, including from the Arab world.",
        "pana_diplo": "Tunisia's diplomatic decisions should not be influenced by Arab causes that do not directly concern it.",
        "pana_no_arab": "The Arab world does not exist.",
        "coop_active": "Tunisia must actively participate in international organizations.",
        "coop_treaties": "International treaties are necessary to protect Tunisian interests.",
        "coop_west_partners": "Tunisia should strengthen its partnerships with Western powers such as France, Italy, or the United States.",
        "coop_fdi": "Openness to foreign investment is essential for the country's development.",
        "coop_peacekeeping": "Tunisia should engage in humanitarian and peacekeeping missions abroad.",
        "coop_sovereignty": "Tunisia must remain in control of its own political choices, even at the cost of international isolation.",
        "coop_bad_institutions": "International institutions do not respect Tunisia's sovereignty and do not protect its fundamental interests.",
        "coop_autonomy": "Tunisia should reduce its dependence on foreign aid and partnerships.",
        "coop_neutrality": "Tunisia would benefit from following the Bourguibist doctrine of neutrality and non-interference in external conflicts.",
        "econ_state_control": "The Tunisian state must control strategic economic sectors such as energy, transport, and telecommunications.",
        "econ_services": "Essential public services such as health and education must remain free and accessible to all, even if this requires raising taxes.",
        "econ_no_private": "Private companies must be abolished.",
        "econ_regulation": "Large private companies must be regulated to prevent abuses.",
        "econ_redistribution": "Redistribution of wealth is essential to reduce inequalities.",
        "econ_competition": "Free competition stimulates innovation and economic growth.",
        "econ_tax_cuts": "Corporate taxes should be reduced to encourage investment.",
        "econ_private_eff": "The private sector is more efficient than the state in economic management.",
        "econ_privatization": "The privatization of some state-owned companies would be beneficial.",
        "econ_inequality": "Inequalities are inevitable in a prosperous economy.",
        "econ_subsidies": "The state should massively subsidize bread, fuel and electricity.",
        "econ_phd_jobs": "The Tunisian state should exceptionally recruit unemployed PhD holders to resolve the employment crisis in higher education.",
        "econ_corrupt_elite": "The Tunisian economic model could work, but it is held hostage by a corrupt elite that enriches itself while the people grow poorer.",
        "reli_sharia": "Sharia should inspire Tunisian legislation.",
        "reli_politics": "Religion must play a central role in political life.",
        "reli_values": "Islamic values are indispensable to guide society.",
        "reli_state_support": "The state must actively support religious institutions.",
        "reli_parties": "Islamist political parties must be permitted.",
        "reli_separation": "Religion and politics must be completely separated.",
        "reli_neutrality": "Public institutions must be neutral towards all beliefs.",
        "reli_freedom": "Freedom of religion must include the freedom not to believe.",
        "reli_influence": "Religious discourse must not influence political decisions.",
        "reli_constitution": "Any mention of Islam should be removed from the constitution.",
        "reli_education": "Tunisia's education system should align more closely with the principles of Islam as a moral and identity foundation.",
        "reli_identity_primacy": "My religious identity takes precedence over my national belonging — I am Muslim before I am Tunisian.",
        "soci_tradition": "Traditional Tunisian values and customs must be preserved.",
        "soci_reforms": "Tunisian society requires rapid and significant social reforms.",
        "soci_family": "The traditional role of the family must be protected.",
        "soci_western_model": "Tunisia should model itself on Western societies to structure its own.",
        "soci_gender": "Full equality between men and women must be guaranteed by law.",
        "soci_lgbt": "Sexual minorities must have the same rights as other citizens.",
        "soci_derja": "Derja should replace Arabic as the official language of Tunisia.",
        "soci_liberty": "Traditions that limit individual freedoms must be abolished.",
        "soci_languages": "It is appropriate for Tunisia to integrate foreign languages into its society.",
        "demo_elections": "Free and regular elections are indispensable.",
        "demo_checks": "Checks and balances (judiciary, parliament, media) must be protected.",
        "demo_protest": "Peaceful protest is a fundamental right.",
        "demo_pluralism": "Political pluralism is essential to democracy.",
        "demo_transparency": "Government transparency is a priority.",
        "demo_strong_leader": "A strong leader is sometimes necessary, even at the expense of political freedoms.",
        "demo_press_limit": "In certain situations, it is acceptable to limit press freedom.",
        "demo_opposition": "Political opponents threaten the stability of the country.",
        "demo_authoritarian": "An authoritarian government is more effective than a liberal democracy.",
        "demo_speed": "Important decisions must be made quickly, even without public debate.",
        "decent_local": "Local authorities better understand the needs of their population.",
        "decent_election_gov": "Governors should be elected locally.",
        "decent_central_unity": "A strong central power is necessary to prevent regional divisions.",
        "decent_central_econ": "Economic decisions must remain in the hands of the central government.",
        "decent_resources": "Management of natural resources must remain under central government control.",
        "decent_council_regions": "The creation of the National Council of Regions and Districts to represent territories and rationalize parliamentary power is a fundamentally positive initiative.",
        "decent_uniform_laws": "The same laws must apply uniformly across the entire territory.",
        "decent_post_rev": "Post-revolution decentralization is essential to improve governance and bring decisions closer to citizens.",
        "spec_monarchy": "It would be preferable for Tunisia to restore a constitutional monarchy.",
        "spec_ugtt": "The UGTT plays a positive role in Tunisian political and social life.",
        "spec_25jul": "The measures taken by Kais Saied on July 25, 2021 were necessary and justified to save the country.",
        "spec_ks": "Kais Saied is a good president.",
        "spec_2011": "Tunisia should have avoided the revolutionary process of 2011.",
        "spec_maghreb": "Tunisia's future lies in a united Maghreb, built on our historical and cultural ties.",
        "spec_africa": "Tunisia is part of Africa and must play a leading role in building a strong and sovereign African union.",
        "ctx_normalisation": "The Tunisian parliament must adopt a law criminalizing any form of normalization with the Zionist entity.",
        "spec_bourguiba": "The political legacy of Habib Bourguiba is overall positive.",
        "ctx_gabes": "The state must immediately close or relocate the Chemical Group in Gabès for ecological reasons, even if it costs thousands of jobs.",
        "ctx_imf": "Tunisia must refuse the dictates of the International Monetary Fund in order to preserve its sovereignty.",
        "ctx_mig": "The state should require young doctors and engineers trained in the public system to work a few years in Tunisia before being allowed to emigrate.",
        "ctx_mor": "Tunisia should lift the moratorium on the death penalty and restore its application for the most serious crimes.",
        "ctx_civ": "Foreign-funded Tunisian associations and NGOs should be strictly regulated, or even banned, as they serve foreign agendas.",
        "ctx_ben": "Zine el-Abidine Ben Ali is a president whose record is positive for Tunisia.",
        "ctx_sub": "Irregular immigration from Sub-Saharan Africa constitutes a demographic and security threat to Tunisia.",
        "ctx_corp": "State-promoted community enterprises are the best solution for developing marginalized regions and generating genuine local wealth creation.",
        "ctx_dl54": "The enforcement of Decree 54 is an absolute necessity to cleanse social media of misinformation and defamation.",
        "ctx_gafsa": "The state has the right to use the army to prohibit sit-ins and strikes that block the production and transport of phosphate in the Gafsa mining basin.",
        "ctx_amb": "Tunisia should systematically expel any foreign ambassador who meets political opponents or members of civil society without prior approval from the Ministry of Foreign Affairs.",
        "ctx_infl": "The state is right to imprison content creators on TikTok and Instagram who violate “public decency” and moral standards.",
        "ctx_nsf": "The self-proclaimed “National Salvation Front” is an unnatural alliance that only seeks to return the country to the dysfunctions that existed before July 25.",
        "ctx_ugtt": "Today, the UGTT behaves like a “state within the state” and represents the main obstacle to the country’s economic reforms.",
        "ctx_party": "All political parties that took part in governing during the 2011–2021 decade should be permanently excluded from Tunisian political life."
};

    function tr(key) {
        const s = t[_lang];
        return (s && s[key] !== undefined) ? s[key] : (t['fr'][key] || key);
    }

    function getQuestion(id) {
        if (_lang === 'en' && questionsEN[id]) return questionsEN[id];
        return null;
    }

    function getLang() { return _lang; }

    function setLang(lang) {
        if (!t[lang]) return;
        _lang = lang;
        localStorage.setItem('tv_lang', lang);
        applyTranslations();
        if (typeof questions !== 'undefined' && lang === 'en') {
            questions.forEach(q => {
                if (questionsEN[q.id]) q._question_en = questionsEN[q.id];
            });
        }
        document.dispatchEvent(new CustomEvent('tv:langchange', { detail: { lang } }));
    }

    function applyTranslations() {
        document.querySelectorAll('[data-tv]').forEach(el => {
            const key = el.getAttribute('data-tv');
            const raw = tr(key);
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = raw;
            } else {
                el.textContent = raw;
            }
        });
        document.querySelectorAll('[data-tv-html]').forEach(el => {
            el.innerHTML = tr(el.getAttribute('data-tv-html'));
        });
        document.documentElement.lang = _lang;
        updateToggleButtons();
    }

    function updateToggleButtons() {
        document.querySelectorAll('.tv-lang-toggle').forEach(btn => {
            btn.setAttribute('aria-label', _lang === 'fr' ? 'Switch to English' : 'Passer en français');
            document.querySelectorAll('[data-tv-lang]').forEach(b => {
                b.classList.toggle('tv-lang-active', b.getAttribute('data-tv-lang') === _lang);
            });
        });
    }

    function injectSwitcher() {
        const headers = document.querySelectorAll('header .container > div, header .container');
        const target = headers[0];
        if (!target) return;
        if (document.getElementById('tv-lang-switcher')) return;

        const sw = document.createElement('div');
        sw.id = 'tv-lang-switcher';
        sw.style.cssText = 'display:flex;align-items:center;gap:6px;';
        sw.innerHTML = `
            <button data-tv-lang="fr"
                style="font-family:Oswald,sans-serif;font-size:0.75rem;font-weight:700;letter-spacing:.06em;
                       padding:5px 12px;border-radius:6px;border:2px solid transparent;cursor:pointer;
                       background:rgba(255,255,255,0.15);color:#fff;transition:all .15s;"
                onclick="window.TV.setLang('fr')">FR</button>
            <button data-tv-lang="en"
                style="font-family:Oswald,sans-serif;font-size:0.75rem;font-weight:700;letter-spacing:.06em;
                       padding:5px 12px;border-radius:6px;border:2px solid transparent;cursor:pointer;
                       background:rgba(255,255,255,0.15);color:#fff;transition:all .15s;"
                onclick="window.TV.setLang('en')">EN</button>
            <style>
                [data-tv-lang].tv-lang-active { background: #fff !important; color: #dc2626 !important; border-color: #fff !important; }
            </style>`;

        const flex = target.querySelector('.flex');
        if (flex) flex.appendChild(sw);
        else target.appendChild(sw);
        updateToggleButtons();
    }

    document.addEventListener('DOMContentLoaded', function() {
        injectSwitcher();
        if (_lang !== 'fr') applyTranslations();
        else updateToggleButtons();
    });

    return { tr, getQuestion, getLang, setLang };

})();