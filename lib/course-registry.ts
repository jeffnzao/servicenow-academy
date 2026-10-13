import { Course } from '@/types/course';
import { Exercise } from '@/types/exercise';

export const COURSES_TECHNIQUE: Course[] = [
    // --- Dans COURSES_TECHNIQUE ---
{
  id: 'script-include-stats',
  slug: 'script-includes-glide-aggregate',
  title: 'Script Includes : Optimiser avec GlideAggregate & Try-Catch',
  category: 'Architecture',
  level: 'Intermédiaire',
  duration: '30 min',
  description: 'Créer des classes réutilisables, isoler la logique métier, structurer les retours JSON et sécuriser avec try...catch...finally.',
  objectives: [
    'Utiliser Class.create() pour structurer un Script Include orienté objet',
    'Exploiter GlideAggregate pour compter et moyenner sans saturer la mémoire',
    'Gérer les erreurs de manière robuste avec le pattern en 7 étapes'
  ],
  sections: [
    {
      title: '1. Pourquoi utiliser GlideAggregate ?',
      content: 'Contrairement à GlideRecord qui charge tous les enregistrements en mémoire, GlideAggregate délègue le calcul mathématique (COUNT, AVG, SUM) directement au moteur SQL de la base de données.',
      bestPractices: ['Toujours convertir le résultat brut en entier avec parseInt(..., 10) ou parseFloat(...).']
    }
  ],
  relatedExerciseId: 'ex-script-include-stats',
  officialLinks: [
    { title: 'ServiceNow Developer : GlideAggregate', url: 'https://developer.servicenow.com/' }
  ]
},
  {
    id: 'client-script-network',
    slug: 'client-scripts-fundamentals',
    title: 'Client Scripts : Rendre un champ obligatoire sur événement',
    category: 'Client',
    level: 'Débutant',
    duration: '20 min',
    description: 'Comprendre l’exécution dans le navigateur, l’utilisation de g_form et la gestion des événements onChange.',
    objectives: [
      'Maîtriser les contextes d’exécution client vs serveur',
      'Utiliser g_form.setMandatory et g_form.showFieldMsg',
      'Respecter les gardes de sécurité (isLoading, newValue === "")'
    ],
    sections: [
      {
        title: '1. Définition et Contexte d’Exécution',
        content: 'Un Client Script s’exécute exclusivement dans le navigateur de l’utilisateur final. Il permet d’améliorer l’ergonomie du formulaire en temps réel sans recharger la page.',
        bestPractices: ['Toujours vérifier isLoading au début d’un onChange pour éviter les déclenchements intempestifs.']
      },
      {
        title: '2. Cas d’usage métier',
        content: 'Sur le formulaire Incident, si la catégorie sélectionnée est "network", le champ de l’élément de configuration (cmdb_ci) devient obligatoire pour obliger le technicien à renseigner la source de la panne.'
      }
    ],
    relatedExerciseId: 'ex-client-script-network',
    officialLinks: [
      { title: 'ServiceNow Docs : Client Scripts', url: 'https://www.servicenow.com/docs/' }
    ]
  },
  {
    id: 'scripted-rest-api',
    slug: 'scripted-rest-apis-inbound',
    title: 'Scripted REST APIs : Exposer et sécuriser des endpoints',
    category: 'Intégration',
    level: 'Senior',
    duration: '40 min',
    description: 'Concevoir des points d’entrée HTTP personnalisés, valider les query parameters et structurer les réponses JSON avec un bloc try...catch...finally.',
    objectives: [
      'Créer une ressource Scripted REST API personnalisée',
      'Extraire et valider les paramètres de requête (queryParams)',
      'Gérer les codes de statut HTTP (200, 400, 500) et journaliser dans syslog'
    ],
    sections: [
      {
        title: '1. Architecture d’une Scripted REST API',
        content: 'Une Scripted REST API permet à un système tiers (Postman, application externe) d’interroger ServiceNow via des méthodes HTTP (GET, POST). Le script de la ressource doit isoler la logique métier et renvoyer un objet JSON normalisé.',
        bestPractices: [
          'Toujours valider les paramètres d’entrée et lever une exception explicite (throw new Error) en cas d’anomalie.',
          'Utiliser un point de retour unique dans le bloc finally (response.setBody(result)).'
        ]
      },
      {
        title: '2. Le Pattern en 7 étapes',
        content: '1. Initialisation de la réponse -> 2. Validation d’entrée -> 3. Traitement principal (appel Outbound ou GlideRecord) -> 4. Succès (setStatus 200/201) -> 5. Log syslog -> 6. Capture d’erreur -> 7. Retour unique.'
      }
    ],
    relatedExerciseId: 'ex-scripted-rest-api',
    officialLinks: [
      { title: 'ServiceNow Developer : Inbound REST', url: 'https://developer.servicenow.com/' }
    ]
  },
  // --- Arbitrage entre Client Script, Business Rule et Flow Designer ---
{
  id: 'architecture-best-practices',
  slug: 'architecture-decisions-and-governance',
  title: 'Architecture ServiceNow : Arbitrage entre Automatismes et Performance',
  category: 'Architecture',
  level: 'Senior',
  duration: '45 min',
  description: 'Savoir choisir entre Client Script, Business Rule, Flow Designer ou Script Include pour garantir la maintenabilité et les performances.',
  objectives: [
    'Comprendre l’impact des boucles infinies GlideRecord et des requêtes synchrones',
    'Arbitrer entre code scripté et solutions low-code (Flow Designer)',
    'Respecter les règles de gouvernance d’un scope applicatif'
  ],
  sections: [
    {
      title: '1. Règle d’or de l’Architecture ServiceNow',
      content: 'Privilégiez toujours la configuration standard (Flow Designer, UI Policies) avant le code personnalisé (Client Scripts, Business Rules). Le code non documenté engendre de la dette technique.',
      bestPractices: [
        'Interdire l’utilisation de current.update() dans une Business Rule de type "before" (risque de boucle infinie critique).',
        'Utiliser des Script Includes pour mutualiser la logique métier complexe.'
      ],
      pitfalls: [
        'Exécuter des requêtes GlideRecord dans une boucle (Anti-pattern N+1).'
      ]
    }
  ],
  relatedExerciseId: 'ex-architecture-audit',
  officialLinks: [
    { title: 'ServiceNow Documentation : Best Practices', url: 'https://www.servicenow.com/docs/' }
  ]
},
{
  id: 'outbound-rest-v2',
  slug: 'outbound-rest-message-v2',
  title: 'Outbound REST : Consommer des API tierces avec RESTMessageV2',
  category: 'Intégration',
  level: 'Senior',
  duration: '45 min',
  description: 'Appeler des services Web externes, configurer les en-têtes HTTP, analyser le corps JSON et gérer les erreurs réseau (timeouts, 401, 500).',
  objectives: [
    'Instancier et exécuter sn_ws.RESTMessageV2()',
    'Extraire le code de statut HTTP et parser le payload JSON',
    'Gérer les exceptions réseau et consigner les logs dans gs.error()'
  ],
  sections: [
    {
      title: '1. Architecture d’un appel Outbound REST',
      content: 'Lorsqu’un événement se produit dans ServiceNow (ex: création d’un incident P1), la plateforme peut notifier un outil externe via une requête HTTP sortante.',
      bestPractices: [
        'Utiliser des appels asynchrones (executeAsync) pour les traitements lourds afin de ne pas bloquer la transaction utilisateur.',
        'Toujours isoler l’appel dans un bloc try...catch pour capturer les échecs de connexion ou de parsing JSON.'
      ]
    }
  ],
  relatedExerciseId: 'ex-outbound-rest-v2',
  officialLinks: [
    { title: 'ServiceNow Developer : Outbound REST Integrations', url: 'https://developer.servicenow.com/' }
  ]
},
{
  id: 'integration-decision-matrix',
  slug: 'integration-architecture-decision-matrix',
  title: 'Matrice de Décision d’Architecture : Choisir la Bonne Technologie d’Intégration',
  category: 'Architecture',
  level: 'Senior',
  duration: '35 min',
  description: 'Savoir quand utiliser une API standard (Table API), une Scripted REST API, Import Sets, RESTMessageV2 ou IntegrationHub/Flow Designer.',
  objectives: [
    'Évaluer la complexité du besoin d’intégration (synchrone vs asynchrone)',
    'Choisir entre la simplicité de la Table API et le contrôle d’une Scripted REST API',
    'Arbitrer entre développement orienté code (RESTMessageV2) et no-code/low-code (IntegrationHub Spoke)'
  ],
  sections: [
    {
      title: '1. Matrice d’Arbitrage Technique',
      content: 'Le choix de la technologie d’intégration conditionne la maintenabilité, les performances et la gouvernance de la plateforme.',
      bestPractices: [
        'Préférer Import Sets + Transform Maps pour la création ou mise à jour volumineuse de données en masse.',
        'Utiliser Table API uniquement pour du CRUD direct sans logique métier complexe.',
        'Préférer Scripted REST API dès qu’il faut agréger plusieurs tables, valider un contrat d’API strict ou personnaliser les codes HTTP.',
        'Utiliser IntegrationHub pour réutiliser des Spokes certifiés et faciliter la maintenance no-code par les équipes fonctionnelles.'
      ]
    }
  ],
  relatedExerciseId: 'ex-integration-decision-matrix',
  officialLinks: [
    { title: 'ServiceNow Developer : Integration Hub vs Scripted REST', url: 'https://developer.servicenow.com/' }
  ]
},
{
  id: 'flow-designer-actions',
  slug: 'flow-designer-custom-actions',
  title: 'Flow Designer & Custom Actions : Automatiser sans bloquer le serveur',
  category: 'Architecture',
  level: 'Intermédiaire',
  duration: '40 min',
  description: 'Concevoir des flux robustes, utiliser des déclencheurs basés sur des conditions, et écrire des Actions personnalisées en JavaScript (Script Step).',
  objectives: [
    'Maîtriser les déclencheurs (Triggers) et la gestion asynchrone des Flows',
    'Créer des Action Inputs et Action Outputs réutilisables',
    'Isoler la logique complexe dans une Script Step avec gestion des erreurs'
  ],
  sections: [
    {
      title: '1. Pourquoi remplacer les Workflows par Flow Designer ?',
      content: 'Flow Designer offre une interface graphique intuitive, une meilleure traçabilité des exécutions (Execution Details) et un découplage natif des scripts grâce aux Spokes et aux Actions réutilisables.',
      bestPractices: [
        'Préférer les conditions d’attente (Wait For Condition) ou les boucles natives plutôt que d’écrire de lourdes boucles while en script.',
        'Toujours valider les entrées (Inputs) d’une Custom Action avant de manipuler des enregistrements.'
      ]
    }
  ],
  relatedExerciseId: 'ex-flow-designer-action',
  officialLinks: [
    { title: 'ServiceNow Developer : Flow Designer', url: 'https://developer.servicenow.com/' }
  ]
}
,
{
  id: 'security-acls-fundamentals',
  slug: 'security-acls-and-evaluation-order',
  title: 'Sécurité ServiceNow : Maîtriser l’Ordre d’Évaluation des ACLs',
  category: 'Architecture',
  level: 'Senior',
  duration: '40 min',
  description: 'Comprendre comment le moteur de sécurité évalue les règles d’accès (Table.*, Table.Field), l’utilisation de current et answer, et l’optimisation des performances.',
  objectives: [
    'Maîtriser l’ordre de priorité d’évaluation des ACLs (Match le plus spécifique en premier)',
    'Utiliser les objets de contexte current et answer dans les scripts de sécurité',
    'Éviter les anti-patterns de performance liés aux requêtes GlideRecord non filtrées dans les ACLs'
  ],
  sections: [
    {
      title: '1. Ordre d’évaluation d’une ACL',
      content: 'Lorsqu’un utilisateur tente d’accéder à un champ, ServiceNow évalue d’abord l’ACL du champ au niveau de la table (ex: incident.*), puis l’ACL spécifique du champ (ex: incident.urgency). L’accès est accordé uniquement si toutes les conditions de la hiérarchie sont satisfaites.',
      bestPractices: [
        'Ne jamais utiliser de GlideRecord lourd dans une ACL de type "read" sur des listes volumineuses sous peine de détruire les performances de la base de données.',
        'Préférer l’utilisation des rôles ou des conditions basées sur les attributs de l’enregistrement (current) plutôt que des scripts complexes.'
      ]
    }
  ],
  relatedExerciseId: 'ex-security-acl-script',
  officialLinks: [
    { title: 'ServiceNow Developer : Access Control Lists', url: 'https://developer.servicenow.com/' }
  ]
},
{
  id: 'update-sets-best-practices',
  slug: 'update-sets-management-and-migration',
  title: 'Update Sets : Gouvernance, Suivi et Bonnes Pratiques de Déploiement',
  category: 'Architecture',
  level: 'Intermédiaire',
  duration: '35 min',
  description: 'Apprendre à structurer les Update Sets par application ou fonctionnalité, éviter les écrasements de code et gérer les Customer Updates en cas de conflit.',
  objectives: [
    'Structurer une nomenclature claire pour les Update Sets (ex: PROJET - TICKET - NOM)',
    'Identifier les composants capturés et non capturés par défaut (Data vs Configuration)',
    'Résoudre les collisions de modifications (Customer Updates)'
  ],
  sections: [
    {
      title: '1. Règle d’or des Update Sets',
      content: 'Un Update Set capture les modifications de configuration (sys_metadata). Il ne capture pas les données transactionnelles (incidents, utilisateurs) qui doivent passer par des Update Sets de données ou des XML Exports si nécessaire.',
      bestPractices: [
        'Ne jamais travailler directement dans le Default Update Set.',
        'Clôturer (Complete) et tester l’Update Set avant de l’importer sur l’instance cible.'
      ]
    }
  ],
  relatedExerciseId: 'ex-update-set-audit',
  officialLinks: [
    { title: 'ServiceNow Developer : System Update Sets', url: 'https://developer.servicenow.com/' }
  ]
},
{
  id: 'performance-slow-queries-tuning',
  slug: 'performance-tuning-and-slow-queries',
  title: 'Performance & Diagnostics : Optimiser les Requêtes et les Transactions',
  category: 'Architecture',
  level: 'Senior',
  duration: '40 min',
  description: 'Analyser les logs de transactions, identifier les requêtes lentes (Slow Queries), utiliser getRowCount() avec modération et exploiter les index de base de données.',
  objectives: [
    'Interpréter les indicateurs des Transaction Logs (Response Time, CPU Time, DB Time)',
    'Éviter l’utilisation abusive de getRowCount() et privilégier .hasNext() ou .getRowCount() optimisé',
    'Identifier l’absence d’index sur les tables personnalisées'
  ],
  sections: [
    {
      title: '1. Comprendre le temps de réponse (DB Time vs CPU Time)',
      content: 'Le temps de transaction global d’une page ou d’un script se décompose entre le temps passé en base de données (DB Time) et le temps de traitement serveur (CPU/Script Time). Une proportion élevée de DB Time révèle souvent des requêtes non indexées ou des boucles GlideRecord mal construites.',
      bestPractices: [
        'Ne jamais utiliser gr.getRowCount() sur des tables volumineuses (> 100 000 lignes) juste pour vérifier l’existence d’enregistrements (préférer .hasNext()).',
        'Créer des index sur les champs fréquemment utilisés dans les clauses addQuery.'
      ]
    }
  ],
  relatedExerciseId: 'ex-performance-audit',
  officialLinks: [
    { title: 'ServiceNow Developer : Performance Best Practices', url: 'https://developer.servicenow.com/' }
  ]
},
{
  id: 'domain-separation-architecture',
  slug: 'domain-separation-and-tenant-governance',
  title: 'Domain Separation : Architecture, Visibilité et Bonnes Pratiques',
  category: 'Architecture',
  level: 'Senior',
  duration: '50 min',
  description: 'Concevoir et administrer une instance multi-tenant, maîtriser la hiérarchie des domaines, les règles de visibilité (Domain Scope) et l’héritage des données.',
  objectives: [
    'Comprendre la structure hiérarchique des domaines (Top / Parent / Child)',
    'Maîtriser les modes de visibilité (FX - Framework, R - Restricted, V - View)',
    'Éviter les pièges de performance liés aux requêtes globales dans un contexte cloisonné'
  ],
  sections: [
    {
      title: '1. Principes de base de la Séparation par Domaine',
      content: 'La séparation par domaine permet d’isoler les données, les processus et l’interface utilisateur pour plusieurs entités ou clients sur une seule et même instance physique ServiceNow.',
      bestPractices: [
        'Toujours concevoir la hiérarchie des domaines de manière simple et alignée sur l’organigramme métier (éviter une profondeur excessive > 4 niveaux).',
        'Faire attention aux scripts globaux (Business Rules, Script Includes) qui s’exécutent hors contexte de domaine si l’isolation ne’est pas explicitement gérée.'
      ]
    }
  ],
  relatedExerciseId: 'ex-domain-separation-script',
  officialLinks: [
    { title: 'ServiceNow Developer : Domain Separation', url: 'https://developer.servicenow.com/' }
  ]
},
{
  id: 'service-portal-widgets',
  slug: 'service-portal-custom-widgets-development',
  title: 'Service Portal : Développement de Widgets Avancés (AngularJS & Server Script)',
  category: 'Client',
  level: 'Senior',
  duration: '45 min',
  description: 'Maîtriser l’architecture des widgets Service Portal, le dialogue bidirectionnel entre le Client Script et le Server Script, et l’utilisation des directives Bootstrap/Angular.',
  objectives: [
    'Structurer un widget Service Portal (HTML Template, CSS, Client Controller, Server Script)',
    'Transmettre des données du serveur vers le client via l’objet data et input',
    'Optimiser les performances d’affichage et la réactivité de l’interface utilisateur'
  ],
  sections: [
    {
      title: '1. Architecture d’un Widget Service Portal',
      content: 'Un widget Service Portal découple la logique de rendu (HTML/CSS), la logique d’affichage et d’événements (Client Controller en AngularJS) et la logique d’accès aux données de la base (Server Script en JavaScript Rhino).',
      bestPractices: [
        'Limiter les requêtes GlideRecord dans le Server Script initial du widget et privilégier la pagination ou le chargement à la demande via data.',
        'Utiliser $scope.server.update() pour synchroniser les actions utilisateur du client vers le serveur de manière propre.'
      ]
    }
  ],
  relatedExerciseId: 'ex-service-portal-widget',
  officialLinks: [
    { title: 'ServiceNow Developer : Service Portal Widgets', url: 'https://developer.servicenow.com/' }
  ]
},
{
  id: 'oauth-api-security',
  slug: 'oauth-2.0-and-api-security-integration',
  title: 'Sécurité & OAuth 2.0 : Authentification et Connexion aux API Externes',
  category: 'Intégration',
  level: 'Senior',
  duration: '45 min',
  description: 'Configurer des fournisseurs de tokens OAuth 2.0, gérer les flux d’authentification (Client Credentials & Authorization Code) et sécuriser les Scripted REST APIs.',
  objectives: [
    'Comprendre le fonctionnement des profils de tokens OAuth (OAuth Entity Profiles)',
    'Automatiser l’injection de jetons d’accès dans les requêtes RESTMessageV2',
    'Sécuriser l’accès à une Scripted REST API via des rôles et des critères d’authentification stricts'
  ],
  sections: [
    {
      title: '1. Architecture d’un flux OAuth 2.0 dans ServiceNow',
      content: 'ServiceNow peut agir en tant que client OAuth (pour consommer des API tierces sécurisées) ou en tant que serveur d’autorisation. Le flux Client Credentials est privilégié pour les intégrations de type serveur à serveur (M2M).',
      bestPractices: [
        'Ne jamais stocker de secrets client ou de mots de passe en clair dans les scripts : utiliser les tables de certificats et d’identifiants (OAuth Credentials / sys_auth_profile).',
        'Vérifier l’expiration des tokens et gérer le rafraîchissement automatique (Refresh Token) via l’infrastructure native ServiceNow.'
      ]
    }
  ],
  relatedExerciseId: 'ex-oauth-token-request',
  officialLinks: [
    { title: 'ServiceNow Developer : OAuth Setup and Configuration', url: 'https://developer.servicenow.com/' }
  ]
},
{
  id: 'cmdb-csdm-architecture',
  slug: 'cmdb-and-csdm-foundations',
  title: 'CMDB & CSDM : Structurer les Actifs et l’Alignement Métier',
  category: 'Architecture',
  level: 'Senior',
  duration: '50 min',
  description: 'Maîtriser les fondations de la CMDB, la hiérarchie des classes de Configuration Items (CI), les relations parent-enfant et les frameworks de modélisation CSDM.',
  objectives: [
    'Comprendre les domaines fondamentaux du CSDM (Design, Foundational, Sell/Consume, Manage Technical Services)',
    'Éviter la pollution de la CMDB en qualifiant les relations et les sources de découverte (Discovery / IRE)',
    'Écrire des scripts d’audit pour identifier les Configuration Items orphelins ou mal rattachés'
  ],
  sections: [
    {
      title: '1. Qu’est-ce que le CSDM ?',
      content: 'Le Common Service Data Model (CSDM) est un standard prescriptif qui fournit des directives de modélisation de données pour la CMDB ServiceNow, garantissant que les données techniques supportent efficacement les services métier.',
      bestPractices: [
        'Ne jamais créer de tables de CI personnalisées sans vérifier si une classe standard de la CMDB (basée sur cmdb_ci) correspond au besoin.',
        'Utiliser l’Identification and Reconciliation Engine (IRE) pour toute injection de données externe afin d’éviter les doublons.'
      ]
    }
  ],
  relatedExerciseId: 'ex-cmdb-ci-audit',
  officialLinks: [
    { title: 'ServiceNow Developer : CSDM and CMDB Guides', url: 'https://developer.servicenow.com/' }
  ]
},
{
  id: 'service-catalog-advanced',
  slug: 'service-catalog-and-variable-management',
  title: 'Service Catalog : Catalog Client Scripts & Dynamisme des Formulaires',
  category: 'Client',
  level: 'Intermédiaire',
  duration: '40 min',
  description: 'Maîtriser l’utilisation de g_form sur les formulaires de commande du catalogue, la gestion des jeux de variables (Variable Sets) et l’interactivité en temps réel.',
  objectives: [
    'Comprendre les spécificités des Catalog Client Scripts par rapport aux Client Scripts classiques',
    'Manipuler les variables du catalogue avec g_form.setValue() et g_form.setMandatory()',
    'Optimiser l’expérience utilisateur sur le Service Portal lors de la soumission de demandes'
  ],
  sections: [
    {
      title: '1. Particularités des Catalog Client Scripts',
      content: 'Contrairement aux formulaires de tables standards (comme incident ou change_request), les formulaires du catalogue reposent sur des variables. Les méthodes d’accès et de modification ciblent explicitement ces variables à travers l’API g_form.',
      bestPractices: [
        'Utiliser des Catalog UI Policies pour le masquage simple de champs avant d’écrire du code JavaScript lourd.',
        'S’assurer que les scripts de catalogue gèrent correctement le chargement initial (OnLoad) et les modifications de champs spécifiques (OnChange).'
      ]
    }
  ],
  relatedExerciseId: 'ex-catalog-client-script',
  officialLinks: [
    { title: 'ServiceNow Developer : Service Catalog Scripts', url: 'https://developer.servicenow.com/' }
  ]
},
{
  id: 'performance-analytics-advanced',
  slug: 'performance-analytics-and-indicators',
  title: 'Performance Analytics : Indicateurs de Tendance et Pilotage de la Valeur',
  category: 'Architecture',
  level: 'Senior',
  duration: '45 min',
  description: 'Concevoir des indicateurs automatisés (Automated Indicators), des sources de ventilation (Breakdown Sources) et analyser les tendances temporelles.',
  objectives: [
    'Distinguer le Reporting opérationnel (temps réel) de Performance Analytics (analyse temporelle et tendances)',
    'Configurer des indicateurs de formule (Formula Indicators) pour calculer des taux de résolution ou des délais moyens',
    'Optimiser les jobs de collecte de données (Data Collection Jobs) pour éviter la surcharge nocturne'
  ],
  sections: [
    {
      title: '1. Pourquoi utiliser Performance Analytics ?',
      content: 'Le reporting standard ne conserve pas l’historique des données modifiées ou supprimées. Performance Analytics réalise des captures périodiques (Snapshots) pour stocker les scores et analyser l’évolution des performances dans le temps.',
      bestPractices: [
        'Limiter la fréquence des Data Collection Jobs aux périodes creuses de la nuit.',
        'Privilégier les Breakdown Sources partagées pour éviter la multiplication inutile des cubes de données.'
      ]
    }
  ],
  relatedExerciseId: 'ex-pa-formula-script',
  officialLinks: [
    { title: 'ServiceNow Developer : Performance Analytics Guide', url: 'https://developer.servicenow.com/' }
  ]
},
{
  id: 'integrationhub-custom-spokes',
  slug: 'integrationhub-and-custom-spokes-development',
  title: 'IntegrationHub : Conception de Spokes et Actions Réutilisables',
  category: 'Intégration',
  level: 'Senior',
  duration: '45 min',
  description: 'Créer des Custom Spokes, configurer les connexions et identifiants (Connection & Credential Aliases), et encapsuler des scripts REST dans des actions Flow Designer.',
  objectives: [
    'Utiliser les alias de connexion et d’identifiants pour découpler les environnements (DEV vs PROD)',
    'Structurer les entrées (Inputs) et sorties (Outputs) d’une Action IntegrationHub',
    'Gérer les codes d’erreur HTTP et les exceptions de flux de manière élégante'
  ],
  sections: [
    {
      title: '1. Pourquoi créer des Custom Spokes ?',
      content: 'Les Spokes certifiés ServiceNow couvrent les grands éditeurs (Microsoft, Jira, AWS), mais les applications internes ou métiers spécifiques nécessitent la création de Spokes sur-mesure pour uniformiser les intégrations.',
      bestPractices: [
        'Toujours associer une Action IntegrationHub à un Alias de Connexion (Connection Alias) pour éviter de coder en dur les URLs et les clés d’API.',
        'Documenter clairement chaque Input et Output pour faciliter leur utilisation par les équipes fonctionnelles dans Flow Designer.'
      ]
    }
  ],
  relatedExerciseId: 'ex-integrationhub-action',
  officialLinks: [
    { title: 'ServiceNow Developer : IntegrationHub Spokes', url: 'https://developer.servicenow.com/' }
  ]
},
{
  id: 'instance-upgrade-governance',
  slug: 'instance-upgrades-and-sanity-checks',
  title: 'Gouvernance des Upgrades : Préparation, Tests et Résolution des Conflits',
  category: 'Architecture',
  level: 'Senior',
  duration: '45 min',
  description: 'Anticiper les mises à jour majeures, utiliser l’Upgrade Center, gérer les objets ignorés ou modifiés (Skipped Changes) et valider la non-régression.',
  objectives: [
    'Maîtriser les étapes de préparation via l’Upgrade Center',
    'Traiter efficacement les fichiers ignorés (Skipped Changes) après une mise à jour',
    'Mettre en place une stratégie de tests automatisés (ATF) post-upgrade'
  ],
  sections: [
    {
      title: '1. Le cycle de vie d’un Upgrade ServiceNow',
      content: 'Chaque mise à jour majeure modifie des milliers de fichiers système (sys_metadata). Si un objet a été personnalisé par l’équipe de développement et modifié par ServiceNow dans la nouvelle version, le système le place en "Skipped Changes" pour écraser ou préserver la personnalisation selon les règles.',
      bestPractices: [
        'Toujours effectuer l’upgrade sur une instance de sous-production (Sub-prod) clone récente avant la production.',
        'Nettoyer les objets obsolètes et désactiver les scripts inactifs pour réduire la surface de conflit.'
      ]
    }
  ],
  relatedExerciseId: 'ex-upgrade-skipped-audit',
  officialLinks: [
    { title: 'ServiceNow Developer : Upgrade Center Best Practices', url: 'https://developer.servicenow.com/' }
  ]
},
{
  id: 'advanced-data-encryption',
  slug: 'column-level-encryption-and-data-security',
  title: 'Sécurité Avancée : Chiffrement par Colonne (CLE) et Protection des Données PII',
  category: 'Architecture',
  level: 'Senior',
  duration: '45 min',
  description: 'Mettre en place le chiffrement au niveau des colonnes (Column Level Encryption), gérer les clés cryptographiques et restreindre l’accès aux données hautement sensibles.',
  objectives: [
    'Distinguer le chiffrement natif en base de données, Edge Encryption et Column Level Encryption (CLE)',
    'Configurer des politiques de chiffrement basées sur les rôles et les contextes de sécurité',
    'Identifier les impacts de performance et de recherche (Search) sur les champs chiffrés'
  ],
  sections: [
    {
      title: '1. Stratégie de Chiffrement dans ServiceNow',
      content: 'Le chiffrement au niveau des colonnes (CLE) permet de chiffrer des données spécifiques (ex: numéros de sécurité sociale, salaires) directement avant leur stockage en base. Seuls les utilisateurs disposant du rôle de déchiffrement adéquat peuvent en visualiser le contenu en clair.',
      bestPractices: [
        'Ne jamais chiffrer les champs utilisés dans des clauses de jointure ou de recherche globale intensive (Global Search) pour éviter la dégradation des performances.',
        'Assurer une gouvernance stricte des clés cryptographiques (Key Management Framework).'
      ]
    }
  ],
  relatedExerciseId: 'ex-cle-audit',
  officialLinks: [
    { title: 'ServiceNow Developer : Column Level Encryption', url: 'https://developer.servicenow.com/' }
  ]
},
{
  id: 'error-handling-logging',
  slug: 'advanced-error-handling-and-system-logging',
  title: 'Architecture & Résilience : Gestion des Erreurs et Bonnes Pratiques de Logging',
  category: 'Architecture',
  level: 'Senior',
  duration: '40 min',
  description: 'Maîtriser les niveaux de log (gs.info, gs.warn, gs.error, gs.debug), structurer les blocs try...catch et centraliser la gestion des exceptions dans les applications custom.',
  objectives: [
    'Choisir le bon niveau de journalisation selon la criticité des événements',
    'Éviter le "Log Spam" qui sature la table des logs système (syslog)',
    'Implémenter un mécanisme de rattrapage et de journalisation structurée des erreurs dans les Script Includes'
  ],
  sections: [
    {
      title: '1. Stratégie de Logging dans ServiceNow',
      content: 'Une mauvaise gestion des logs (comme l’utilisation excessive de gs.info dans des boucles) peut dégrader fortement les performances de la base de données en saturant la table syslog. Il est impératif d’utiliser des conditions de debug et de centraliser les erreurs critiques avec gs.error().',
      bestPractices: [
        'Toujours enrober les appels d’intégration (REST/SOAP) ou les traitements complexes dans des blocs try...catch.',
        'Inclure le nom de la classe ou du Script Include dans le message pour faciliter le filtrage dans System Logs.'
      ]
    }
  ],
  relatedExerciseId: 'ex-error-handling-script',
  officialLinks: [
    { title: 'ServiceNow Developer : Logging and Error Handling Best Practices', url: 'https://developer.servicenow.com/' }
  ]
},
{
  id: 'source-control-git-workflow',
  slug: 'source-control-and-git-integration',
  title: 'DevOps & Source Control : Intégration Git et Gestion des Branches',
  category: 'Architecture',
  level: 'Senior',
  duration: '45 min',
  description: 'Lier une application Scope à un dépôt Git distant, gérer les branches, appliquer des stratégies de commit et automatiser les déploiements hors Update Sets.',
  objectives: [
    'Comprendre le fonctionnement du Scope Applicatif par rapport au Source Control Git',
    'Gérer les opérations de Commit, Stash, Branching et Merge directement depuis l’instance ServiceNow',
    'Éviter les conflits de fusion (Merge Conflicts) lors du travail collaboratif multi-développeur'
  ],
  sections: [
    {
      title: '1. Pourquoi utiliser le Source Control Git dans ServiceNow ?',
      content: 'Contrairement aux Update Sets traditionnels qui capturent des modifications de manière séquentielle, l’intégration Source Control (Git) permet un versionnage orienté application (Scoped App), offrant une traçabilité granulaire de chaque fichier de code et facilitant l’intégration continue (CI/CD).',
      bestPractices: [
        'Toujours travailler dans une application Scoped dédiée (jamais en Global) pour activer l’intégration Git.',
        'Effectuer des commits atomiques et fréquents avec des messages clairs suivant les conventions de nommage des commits.'
      ]
    }
  ],
  relatedExerciseId: 'ex-git-workflow-audit',
  officialLinks: [
    { title: 'ServiceNow Developer : Application Customization & Source Control', url: 'https://developer.servicenow.com/' }
  ]
},
{
  id: 'inbound-webhooks-events',
  slug: 'scripted-webhooks-and-event-registry',
  title: 'Architecture & Intégration : Webhooks Entrants et Gestion des Événements',
  category: 'Intégration',
  level: 'Senior',
  duration: '45 min',
  description: 'Concevoir des points de terminaison pour recevoir des webhooks tiers, valider les signatures de sécurité (HMAC), et déclencher des traitements asynchrones via l’Event Registry.',
  objectives: [
    'Configurer un Scripted REST API ou un Scripted Webhook pour capter des payloads HTTP entrants',
    'Vérifier l’authenticité des requêtes webhooks pour prévenir les attaques de falsification',
    'Utiliser gs.eventQueue() pour découpler la réception immédiate et le traitement lourd en arrière-plan'
  ],
  sections: [
    {
      title: '1. Architecture d’un Webhook Entrant',
      content: 'Un webhook permet à un système tiers d’avertir ServiceNow en temps réel d’un événement (ex: paiement validé, pull request fusionnée). Pour éviter de bloquer l’appel HTTP par un traitement trop long, il est crucial de valider le payload, de consigner l’événement dans l’Event Registry (sysevent) et de répondre immédiatement avec un statut 200 OK.',
      bestPractices: [
        'Toujours répondre rapidement au serveur distant (moins de 2 à 3 secondes) en déléguant la logique métier à un Script Action asynchrone.',
        'Valider systématiquement les en-têtes de signature cryptographique (comme les signatures HMAC SHA-256) pour garantir la sécurité du point de terminaison.'
      ]
    }
  ],
  relatedExerciseId: 'ex-webhook-processor',
  officialLinks: [
    { title: 'ServiceNow Developer : Scripted REST APIs and Events', url: 'https://developer.servicenow.com/' }
  ]
},
{
  id: 'atf-automated-testing',
  slug: 'automated-test-framework-and-quality-assurance',
  title: 'Qualité & DevOps : Automated Test Framework (ATF) et Tests de Non-Régression',
  category: 'Architecture',
  level: 'Senior',
  duration: '45 min',
  description: 'Concevoir des suites de tests automatisés robustes, simuler des actions utilisateur côté client et serveur, et intégrer l’ATF dans les pipelines de déploiement.',
  objectives: [
    'Structurer des tests unitaires et d’intégration avec l’Automated Test Framework',
    'Utiliser des étapes serveur personnalisées (Server-side Script Step) pour valider des états complexes en base',
    'Gérer le nettoyage des données créées pendant les tests (Test Cleanup)'
  ],
  sections: [
    {
      title: '1. Pourquoi automatiser les tests dans ServiceNow ?',
      content: 'Les tests manuels sur ServiceNow sont coûteux et chronophages lors des montées de version ou des livraisons mensuelles. L’ATF permet d’exécuter des scénarios de bout en bout (formulaire, catalogue, flux d’intégration) de manière automatisée et reproductible.',
      bestPractices: [
        'Toujours concevoir des tests autonomes capables de nettoyer leurs propres données en fin d’exécution (Clean-up data).',
        'Privilégier les étapes serveur pour valider la logique métier complexe lorsque l’interface graphique n’est pas strictement nécessaire.'
      ]
    }
  ],
  relatedExerciseId: 'ex-atf-server-validation',
  officialLinks: [
    { title: 'ServiceNow Developer : Automated Test Framework (ATF)', url: 'https://developer.servicenow.com/' }
  ]
}];

export const EXERCISES_DATA: Exercise[] = [
    

// --- Dans EXERCISES_DATA ---
{
  id: 'ex-script-include-stats',
  courseId: 'script-include-stats',
  title: 'Développer la classe IncidentStats',
  level: 'Intermédiaire',
  scenario: 'Créer un Script Include orienté objet pour calculer les statistiques d’incidents actifs par groupe d’assignation.',
  prerequisites: ['Connaissance de Class.create()', 'Maîtrise de GlideAggregate'],
  instructions: [
    'Initialiser le groupe dans initialize(groupId) en l’attachant à this.groupId.',
    'Créer une méthode publique countOpen() utilisant GlideAggregate et _addCommonConditions().',
    'Créer une méthode isOverloaded(threshold) renvoyant un booléen.'
  ],
  pdiSteps: [
    'Aller dans System Definition > Script Includes > New.',
    'Nommer la classe IncidentStats et cocher Client callable (ou décocher selon l’usage).',
    'Implémenter la structure de classe avec les méthodes publiques et privées.'
  ],
  initialCode: `var IncidentStats = Class.create();
IncidentStats.prototype = {
  initialize: function(groupId) {
    this.groupId = groupId;
  },
  countOpen: function() {
    // Écris ton agrégation ici
  },
  type: 'IncidentStats'
};`,
  solutionCode: `var IncidentStats = Class.create();
IncidentStats.prototype = {
  initialize: function(groupId) {
    this.groupId = groupId;
  },
  countOpen: function() {
    var ga = new GlideAggregate('incident');
    this._addCommonConditions(ga);
    ga.addAggregate('COUNT');
    ga.query();
    if (ga.next()) {
      return parseInt(ga.getAggregate('COUNT'), 10) || 0;
    }
    return 0;
  },
  isOverloaded: function(threshold) {
    return this.countOpen() > threshold;
  },
  _addCommonConditions: function(query) {
    query.addActiveQuery();
    query.addQuery('assignment_group', this.groupId);
  },
  type: 'IncidentStats'
};`,
  validationType: 'static_code',
  successCriteria: [
    'Utilisation de GlideAggregate avec addAggregate("COUNT")',
    'Présence de la méthode privée préfectée par un underscore',
    'Retour d’un entier converti proprement'
  ],
  hints: ['Pensez à utiliser this.groupId pour filtrer sur le groupe mémorisé']
},
  {
    id: 'ex-client-script-network',
    courseId: 'client-script-network',
    title: 'Rendre le CI obligatoire pour un incident réseau',
    level: 'Débutant',
    scenario: 'Le support technique exige que tout incident lié au réseau soit rattaché à un CI précis.',
    prerequisites: ['Disposer d’une PDI ServiceNow', 'Accès au module System Definition > Client Scripts'],
    instructions: [
      'Créer un Client Script onChange sur la table incident et le champ category.',
      'Si newValue vaut "network", rendre cmdb_ci obligatoire et afficher un message informatif.',
      'Sinon, rendre cmdb_ci facultatif et masquer le message.'
    ],
    pdiSteps: [
      'Connecte-toi à ta PDI.',
      'Va dans Client Scripts > New.',
      'Sélectionne la table Incident, Type onChange, Field Name category.'
    ],
    initialCode: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if (isLoading || newValue === '') {
    return;
  }
  // Écris ta logique ici
}`,
    solutionCode: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if (isLoading || newValue === '') {
    return;
  }
  if (newValue === 'network') {
    g_form.setMandatory('cmdb_ci', true);
    g_form.showFieldMsg('cmdb_ci', 'Le CI est obligatoire pour les incidents réseau.', 'info');
  } else {
    g_form.setMandatory('cmdb_ci', false);
    g_form.hideFieldMsg('cmdb_ci');
  }
}`,
    validationType: 'static_code',
    successCriteria: [
      'Présence de la garde isLoading',
      'Utilisation correcte de g_form.setMandatory',
      'Gestion du bloc else pour réinitialiser l’état'
    ],
    hints: ['Vérifie l’orthographe de la valeur "network"', 'Pense à masquer le message avec hideFieldMsg']
  },
  {
    id: 'ex-scripted-rest-api',
    courseId: 'scripted-rest-api',
    title: 'Développer une ressource Scripted REST API sécurisée',
    level: 'Senior',
    scenario: 'Exposer un endpoint GET qui récupère une tâche externe via RESTMessageV2 en validant le paramètre todoId.',
    prerequisites: ['Module Scripted Web Services actif sur la PDI', 'Notions de gestion des exceptions'],
    instructions: [
      'Extraire le query parameter todoId depuis request.queryParams.',
      'Valider que todoId est présent (sinon throw new Error).',
      'Consommer l’APItypicode avec sn_ws.RESTMessageV2.',
      'Gérer les statuts HTTP et retourner l’objet JSON formaté.'
    ],
    pdiSteps: [
      'Aller dans System Web Services > Scripted REST APIs.',
      'Créer une ressource avec la méthode GET et le chemin /get_task.',
      'Tester la requête dans le REST API Explorer avec le paramètre todoId=1.'
    ],
    initialCode: `(function process(request, response) {
  var result = { success: false, data: null, error: null };
  try {
    // 1. Extraire et valider le paramètre todoId
    var todoId = request.queryParams.todoId ? request.queryParams.todoId[0] : null;
    if (!todoId) {
      throw new Error("Le paramètre 'todoId' est obligatoire.");
    }
    // 2. Traitement principal RESTMessageV2
    // ...
  } catch (err) {
    result.error = err.message;
    response.setStatus(400);
  } finally {
    response.setBody(result);
  }
})(request, response);`,
    solutionCode: `(function process(request, response) {
  var result = { success: false, data: null, error: null };
  try {
    var todoId = request.queryParams.todoId ? request.queryParams.todoId[0] : null;
    if (!todoId) {
      throw new Error("Le paramètre 'todoId' est obligatoire.");
    }
    var restReq = new sn_ws.RESTMessageV2();
    restReq.setEndpoint('https://jsonplaceholder.typicode.com/todos/' + todoId);
    restReq.setHttpMethod('GET');
    var restRes = restReq.execute();
    var statusCode = restRes.getStatusCode();
    if (statusCode !== 200) {
      throw new Error("L'API distante a répondu avec le statut : " + statusCode);
    }
    var parseBody = JSON.parse(restRes.getBody());
    result.success = true;
    result.data = { id: parseBody.id, title: parseBody.title, completed: parseBody.completed };
    response.setStatus(200);
  } catch (err) {
    gs.error("Erreur Scripted REST API: {0}", [err.message]);
    result.success = false;
    result.error = err.message;
    response.setStatus(400);
  } finally {
    response.setBody(result);
  }
})(request, response);`,
    validationType: 'static_code',
    successCriteria: [
      'Extraction sécurisée de request.queryParams.todoId',
      'Utilisation correcte de sn_ws.RESTMessageV2',
      'Bloc try...catch...finally avec response.setBody'
    ],
    hints: ['Attention à la casse du paramètre dans l’URL du REST API Explorer', 'Vérifiez le code statut HTTP renvoyé']
  },
  // --- À ajouter dans le tableau EXERCISES_DATA de lib/course-registry.ts ---
{
  id: 'ex-architecture-audit',
  courseId: 'architecture-best-practices',
  title: 'Audit de code et refactoring d’une Business Rule bloquante',
  level: 'Senior',
  scenario: 'Un script de Business Rule provoque des lenteurs critiques et des boucles infinies sur la table incident. Vous devez le refactoriser.',
  prerequisites: ['Maîtrise des Business Rules (before/after)', 'Connaissance des anti-patterns GlideRecord'],
  instructions: [
    'Identifier l’appel redondant current.update() à l’intérieur d’un hook before.',
    'Remplacer par une affectation directe des champs (ex: current.setValue()).',
    'Optimiser les requêtes GlideRecord avec des filtres stricts.'
  ],
  pdiSteps: [
    'Accéder à System Definition > Business Rules.',
    'Analyser le code legacy de la règle défectueuse.',
    'Appliquer le refactoring et tester l’impact des transactions.'
  ],
  initialCode: `(function executeRule(current, previous /*null when async*/) {
  // Code legacy non optimisé avec risque de boucle
  var gr = new GlideRecord('incident');
  gr.query();
  while(gr.next()) {
    gr.short_description = 'Mise à jour globale';
    gr.update(); // ⚠️ Anti-pattern critique
  }
})(current, previous);`,
  solutionCode: `(function executeRule(current, previous /*null when async*/) {
  // Solution optimisée : utilisation d'une approche ciblée sans current.update() en boucle
  if (current.isNewRecord() || current.priority.changes()) {
    current.work_notes = 'Mise à jour validée par l’architecture de gouvernance.';
  }
})(current, previous);`,
  validationType: 'static_code',
  successCriteria: [
    'Absence de l’appel gr.update() ou current.update() en boucle',
    'Vérification des conditions de modification (changes())',
    'Respect des bonnes pratiques de performance serveur'
  ],
  hints: ['Ne jamais appeler .update() dans une Business Rule de type Before', 'Utiliser les méthodes natives de manipulation du contexte current']
},
{
  id: 'ex-outbound-rest-v2',
  courseId: 'outbound-rest-v2',
  title: 'Consommer une API météo externe pour enrichir un incident',
  level: 'Senior',
  scenario: 'Développer un script serveur qui interroge un service REST externe pour récupérer la météo d’un site distant et l’ajouter dans les Work Notes de l’incident.',
  prerequisites: ['Connaissance de RESTMessageV2', 'Parsing JSON en JavaScript'],
  instructions: [
    'Instancier sn_ws.RESTMessageV2().',
    'Définir l’endpoint vers l’API externe et la méthode GET.',
    'Exécuter la requête, vérifier que le statut vaut 200 et parser le corps JSON.',
    'Capturer toute erreur dans un bloc try...catch.'
  ],
  pdiSteps: [
    'Aller dans System Definition > Fix Scripts.',
    'Créer un script de test avec RESTMessageV2.',
    'Exécuter le script et vérifier le retour dans le journal d’exécution.'
  ],
  initialCode: `(function executeOutboundCall() {
  try {
    var request = new sn_ws.RESTMessageV2();
    // Écris la configuration de ton appel sortant ici
    
  } catch (ex) {
    gs.error("Erreur d'intégration sortante : " + ex.message);
  }
})();`,
  solutionCode: `(function executeOutboundCall() {
  try {
    var request = new sn_ws.RESTMessageV2();
    request.setEndpoint('https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&current_weather=true');
    request.setHttpMethod('GET');
    request.setRequestHeader('Accept', 'application/json');

    var response = request.execute();
    var statusCode = response.getStatusCode();

    if (statusCode === 200) {
      var responseBody = JSON.parse(response.getBody());
      var temp = responseBody.current_weather.temperature;
      gs.info("Température récupérée avec succès : " + temp + "°C");
    } else {
      gs.warn("L'API distante a répondu avec le statut : " + statusCode);
    }
  } catch (ex) {
    gs.error("Erreur d'intégration sortante : " + ex.message);
  }
})();`,
  validationType: 'static_code',
  successCriteria: [
    'Instanciation correcte de sn_ws.RESTMessageV2()',
    'Utilisation de setEndpoint() et setHttpMethod()',
    'Gestion du code de statut HTTP avec getStatusCode()',
    'Présence de la structure try...catch'
  ],
  hints: ['N’oubliez pas d’appeler .execute() pour déclencher la requête HTTP']
},
{
  id: 'ex-integration-decision-matrix',
  courseId: 'integration-decision-matrix',
  title: 'Analyse d’architecture et choix du pattern d’intégration',
  level: 'Senior',
  scenario: 'Un système RH tiers doit envoyer chaque nuit 5 000 nouveaux collaborateurs vers ServiceNow avec transformation de données. Quel pattern choisir ?',
  prerequisites: ['Notions d’Import Sets', 'Comparatif REST APIs vs IntegrationHub'],
  instructions: [
    'Analyser les contraintes : volumétrie élevée (5 000 enregistrements), périodicité nocturne, règles de transformation.',
    'Rédiger une justification d’architecture orientée Import Set API + Staging Table + Transform Map.',
    'Valider le choix de l’asynchronisme pour éviter de bloquer les threads HTTP de l’instance.'
  ],
  pdiSteps: [
    'Accéder à System Import Sets > Load Data.',
    'Créer une table d’import (Staging Table) u_hr_import_staging.',
    'Créer une Transform Map avec gestion des Coalesce pour éviter les doublons.'
  ],
  initialCode: `// Justification d'architecture
function selectIntegrationPattern() {
  return {
    patternSelected: "Import Set API + Transform Map",
    reasoning: "Traiter 5000 enregistrements en synchrone via Table API bloquerait les sémaphores HTTP. L'Import Set garantit le staging et le traitement asynchrone."
  };
}`,
  solutionCode: `(function validateArchitecture() {
  // Pattern recommandé : Import Set API & Staging Table
  var pattern = {
    technology: "Import Set API",
    mode: "Asynchrone",
    stagingTable: "u_hr_user_staging",
    transformMap: "HR User Inbound Map",
    benefits: [
      "Isolation des données brutes dans la table de staging",
      "Découplage de la logique de transformation (Coalesce)",
      "Préservation des performances de la plateforme"
    ]
  };
  return pattern;
})();`,
  validationType: 'static_code',
  successCriteria: [
    'Sélection du pattern Import Set API / Transform Map pour la volumétrie',
    'Justification par l’asynchronisme et la protection des ressources',
    'Identification des clés Coalesce pour le dédoublonnage'
  ],
  hints: ['Pensez à l’impact volumétrique sur les sémaphores HTTP de ServiceNow']
},
{
  id: 'ex-flow-designer-action',
  courseId: 'flow-designer-actions',
  title: 'Développer une Script Step pour calculer un délai de SLA dynamique',
  level: 'Intermédiaire',
  scenario: 'Dans une Custom Action Flow Designer, vous devez écrire un script de calcul qui détermine la criticité d’une échéance en fonction de la priorité de l’incident.',
  prerequisites: ['Notions de variables d’entrée/sortie dans Flow Designer', 'Bases de JavaScript serveur'],
  instructions: [
    'Récupérer l’input priority depuis inputs.priority.',
    'Appliquer une condition pour renvoyer un délai en heures (ex: P1 = 2h, P2 = 8h, P3 = 24h).',
    'Assigner le résultat à outputs.slaHours.'
  ],
  pdiSteps: [
    'Aller dans Process Automation > Flow Designer.',
    'Créer une nouvelle Action personnalisée.',
    'Ajouter une étape de type "Script Step" et y intégrer la logique de calcul.'
  ],
  initialCode: `(function execute(inputs, outputs) {
  // Écris ton calcul basé sur inputs.priority ici
  
})(inputs, outputs);`,
  solutionCode: `(function execute(inputs, outputs) {
  var priority = parseInt(inputs.priority, 10);
  var hours = 24; // Valeur par défaut (P4)

  switch (priority) {
    case 1:
      hours = 2;
      break;
    case 2:
      hours = 8;
      break;
    case 3:
      hours = 16;
      break;
    default:
      hours = 24;
      break;
  }

  outputs.slaHours = hours;
})(inputs, outputs);`,
  validationType: 'static_code',
  successCriteria: [
    'Utilisation correcte de inputs.priority et outputs.slaHours',
    'Mise en place d’une structure conditionnelle (switch ou if/else)',
    'Conversion propre de la priorité en entier'
  ],
  hints: ['Assurez-vous de bien déclarer les variables inputs et outputs dans les paramètres de la Script Step']
},
{
  id: 'ex-security-acl-script',
  courseId: 'security-acls-fundamentals',
  title: 'Sécuriser la modification d’un champ sensible via Script ACL',
  level: 'Senior',
  scenario: 'Vous devez restreindre la modification du champ "salary" sur la table employé uniquement aux membres du groupe "HR Security" ou si l’utilisateur est le manager direct.',
  prerequisites: ['Maîtrise des rôles et groupes ServiceNow', 'Connaissance de gs.getUser()'],
  instructions: [
    'Vérifier si l’utilisateur connecté appartient au groupe "HR Security" via gs.getUser().isMemberOf().',
    'Vérifier si l’utilisateur correspond au manager de la fiche (current.manager).',
    'Affecter le résultat booléen à la variable answer.'
  ],
  pdiSteps: [
    'Aller dans System Security > Access Control (ACL).',
    'Créer une ACL de type record et d’opération write sur la table employé et le champ salary.',
    'Activer l’option Advanced et rédiger le script de validation.'
  ],
  initialCode: `(function executeRule(current, previous) {
  // Écris ta logique de sécurité pour renvoyer answer = true ou false
  
})(current, previous);`,
  solutionCode: `(function executeRule(current, previous) {
  var answer = false;
  
  // 1. Vérification de l'appartenance au groupe RH sécurisé
  if (gs.getUser().isMemberOf('HR Security')) {
    answer = true;
  } 
  // 2. Vérification si l'utilisateur est le manager direct
  else if (current.manager == gs.getUserID()) {
    answer = true;
  }
  
  return answer;
})(current, previous);`,
  validationType: 'static_code',
  successCriteria: [
    'Utilisation de gs.getUser().isMemberOf() pour le contrôle par groupe',
    'Comparaison sécurisée avec current.manager et gs.getUserID()',
    'Affectation et retour explicites de la variable answer'
  ],
  hints: ['Rappelez-vous que dans une ACL scriptée, la variable answer détermine si l’accès est accordé (true) ou refusé (false)']
},
{
  id: 'ex-atf-test-script',
  courseId: 'atf-automated-testing',
  title: 'Développer une étape de test personnalisée Server-side dans ATF',
  level: 'Senior',
  scenario: 'Vous devez écrire un test server-side personnalisé dans ATF qui vérifie qu’aucun incident critique n’est resté sans groupe d’assignation depuis plus de 24 heures.',
  prerequisites: ['Maîtrise de GlideRecord', 'Connaissance de l’API sn_atf.TestCase'],
  instructions: [
    'Utiliser GlideRecord pour interroger la table incident sur les incidents actifs et prioritaires (1 - Critical).',
    'Vérifier si le champ assignment_group est vide.',
    'Renvoyer un échec (outputs.success = false) si un tel incident est trouvé.'
  ],
  pdiSteps: [
    'Aller dans Automated Test Framework (ATF) > Tests > New.',
    'Ajouter une étape personnalisée de type "Run Server Side Script".',
    'Implémenter la logique de vérification et exécuter la suite de tests.'
  ],
  initialCode: `(function(outputs, steps, stepResult, assertEqual) {
  // Écris ton test server-side ATF ici
  
})(outputs, steps, stepResult, assertEqual);`,
  solutionCode: `(function(outputs, steps, stepResult, assertEqual) {
  var gr = new GlideRecord('incident');
  gr.addActiveQuery();
  gr.addQuery('priority', '1');
  gr.addNullQuery('assignment_group');
  gr.query();

  if (gr.getRowCount() > 0) {
    stepResult.setOutputMessage("Échec : " + gr.getRowCount() + " incident(s) critique(s) sans groupe d'assignation.");
    stepResult.setFailed();
    return false;
  } else {
    stepResult.setOutputMessage("Succès : Tous les incidents critiques ont un groupe assigné.");
    stepResult.setSuccess();
    return true;
  }
})(outputs, steps, stepResult, assertEqual);`,
  validationType: 'static_code',
  successCriteria: [
    'Utilisation de GlideRecord avec addNullQuery pour détecter les champs vides',
    'Utilisation correcte de stepResult.setFailed() et stepResult.setSuccess()',
    'Gestion propre des messages de sortie'
  ],
  hints: ['Utilisez addNullQuery("assignment_group") pour isoler rapidement les enregistrements non assignés']
},
{
  id: 'ex-update-set-audit',
  courseId: 'update-sets-best-practices',
  title: 'Audit et vérification d’un Update Set avant migration',
  level: 'Intermédiaire',
  scenario: 'Vous devez analyser la liste des Customer Updates incluses dans un Update Set en cours pour vous assurer qu’aucun fichier système sensible ou obsolète n’a été capturé par erreur.',
  prerequisites: ['Connaissance de la table sys_update_xml', 'Gestion des états d’Update Set'],
  instructions: [
    'Interroger la table sys_update_xml liée à l’Update Set en cours.',
    'Filtrer pour détecter les suppressions ou les modifications multiples sur un même objet.',
    'Renvoyer un rapport de validation sous forme d’objet JSON.'
  ],
  pdiSteps: [
    'Aller dans System Update Sets > Local Update Sets.',
    'Ouvrir l’onglet Customer Updates pour inspecter les éléments capturés.',
    'Vérifier l’absence d’erreurs de pré-ré quisit avant le commit.'
  ],
  initialCode: `function auditUpdateSet(updateSetSysId) {
  var updates = new GlideRecord('sys_update_xml');
  // Écris ta requête d'audit ici
  
  return { status: "Pending" };
}`,
  solutionCode: `function auditUpdateSet(updateSetSysId) {
  var gr = new GlideRecord('sys_update_xml');
  gr.addQuery('update_set', updateSetSysId);
  gr.query();
  
  var count = 0;
  var modifiedTables = [];

  while (gr.next()) {
    count++;
    modifiedTables.push(gr.getValue('name'));
  }

  return {
    totalUpdates: count,
    tablesImpacted: modifiedTables,
    auditStatus: count > 0 ? "Ready for Preview" : "Empty Update Set"
  };
}`,
  validationType: 'static_code',
  successCriteria: [
    'Utilisation de la table sys_update_xml pour auditer le contenu',
    'Filtrage par identifiant d’Update Set (update_set)',
    'Comptage et retour structuré des métadonnées'
  ],
  hints: ['La table sys_update_xml contient l’ensemble des lignes de code et configurations capturées par un Update Set']
},
{
  id: 'ex-performance-audit',
  courseId: 'performance-slow-queries-tuning',
  title: 'Refactoriser un script GlideRecord lourd et non optimisé',
  level: 'Senior',
  scenario: 'Un script de nettoyage nocturne parcourt la table des incidents avec un getRowCount() et charge tous les champs sans limitation, provoquant un pic de charge critique sur la base de données.',
  prerequisites: ['Maîtrise de GlideRecord', 'Connaissance des méthodes d’optimisation (setLimit, chooseWindow, fields selection)'],
  instructions: [
    'Remplacer l’appel coûteux gr.getRowCount() par une vérification de la présence d’enregistrements.',
    'Restreindre les champs chargés en mémoire avec gr.initialize() ou gr.addNullQuery si nécessaire.',
    'Ajouter une limite de traitement par lot (batch limit) avec gr.setLimit().'
  ],
  pdiSteps: [
    'Aller dans System Diagnostics > Stats > Slow Queries.',
    'Analyser les requêtes consommant le plus de ressources CPU.',
    'Appliquer les corrections sur le script de batch.'
  ],
  initialCode: `function auditAndCleanIncidents() {
  var gr = new GlideRecord('incident');
  gr.addQuery('state', '6'); // Resolved
  gr.query();
  
  var total = gr.getRowCount(); // ⚠️ Coûteux en performance
  while(gr.next()) {
    // Traitement lourd de nettoyage
  }
}`,
  solutionCode: `function auditAndCleanIncidents() {
  var gr = new GlideRecord('incident');
  gr.addQuery('state', '6'); // Resolved
  gr.setLimit(500); // Protection par lot (Batch limit)
  gr.query();
  
  while(gr.next()) {
    // Traitement optimisé par lot sans charger toute la table
    gr.work_notes = 'Archivage automatique par lot de performance.';
    gr.update();
  }
}`,
  validationType: 'static_code',
  successCriteria: [
    'Suppression ou évitement de getRowCount() sur de grands volumes',
    'Utilisation de setLimit() pour contrôler la taille des lots',
    'Maintien d’une requête filtrée et ciblée'
  ],
  hints: ['Utilisez toujours setLimit() lors du traitement de scripts massifs pour protéger les sémaphores de l’instance']
},
{
  id: 'ex-domain-separation-script',
  courseId: 'domain-separation-architecture',
  title: 'Forcer le contexte de domaine dans un Script Include global',
  level: 'Senior',
  scenario: 'Vous écrivez un Script Include utilitaire global qui s’exécute pour plusieurs clients. Vous devez vous assurer que les requêtes GlideRecord respectent explicitement le domaine de l’enregistrement en cours.',
  prerequisites: ['Maîtrise de GlideRecord', 'Connaissance de sys_domain et de GlideScopedEvaluator'],
  instructions: [
    'Utiliser gr.adorNullQuery() ou s’assurer que le contexte de domaine est pris en compte.',
    'Restreindre explicitement la requête au sys_domain passé en paramètre si nécessaire.',
    'Gérer la visibilité inter-domaines de manière sécurisée.'
  ],
  pdiSteps: [
    'Vérifier si le plugin Domain Separation est actif sur votre instance.',
    'Créer ou inspecter un Script Include exécuté en mode global.',
    'Tester l’isolation des données entre deux domaines enfants.'
  ],
  initialCode: `function getDomainSpecificIncidents(domainSysId) {
  var gr = new GlideRecord('incident');
  // Écris ta requête avec prise en compte du domaine ici
  
  gr.query();
  return gr.getRowCount();
}`,
  solutionCode: `function getDomainSpecificIncidents(domainSysId) {
  var gr = new GlideRecord('incident');
  // Forcer l'application du domaine spécifique dans la requête
  if (domainSysId) {
    gr.addQuery('sys_domain', domainSysId);
  }
  gr.addActiveQuery();
  gr.query();
  
  return gr.getRowCount();
}`,
  validationType: 'static_code',
  successCriteria: [
    'Filtrage explicite sur le champ sys_domain',
    'Vérification de la validité du paramètre domainSysId',
    'Utilisation correcte de GlideRecord pour le comptage'
  ],
  hints: ['Dans un environnement multi-tenant, le champ sys_domain pilote l’appartenance de l’enregistrement']
},
{
  id: 'ex-service-portal-widget',
  courseId: 'service-portal-widgets',
  title: 'Développer le Server Script d’un widget de résumé d’incidents',
  level: 'Senior',
  scenario: 'Vous concevez un widget de tableau de bord pour le portail utilisateur. Le Server Script doit récupérer les 5 derniers incidents ouverts de l’utilisateur connecté et les structurer dans l’objet data.',
  prerequisites: ['Maîtrise de GlideRecord', 'Connaissance de gs.getUserID() et de l’objet data'],
  instructions: [
    'Récupérer l’identifiant de l’utilisateur connecté avec gs.getUserID().',
    'Interroger la table incident avec GlideRecord pour filtrer sur l’appelant (caller_id) et les états actifs.',
    'Stocker les résultats dans un tableau assigné à data.incidents.'
  ],
  pdiSteps: [
    'Aller dans Service Portal > Widget Editor.',
    'Créer un nouveau widget personnalisé.',
    'Implémenter la logique de récupération des données dans l’onglet Server Script.'
  ],
  initialCode: `(function() {
  data.incidents = [];
  var userId = gs.getUserID();
  // Écris ta requête GlideRecord pour alimenter data.incidents ici
  
})();`,
  solutionCode: `(function() {
  data.incidents = [];
  var userId = gs.getUserID();
  
  var gr = new GlideRecord('incident');
  gr.addQuery('caller_id', userId);
  gr.addActiveQuery();
  gr.orderByDesc('sys_created_on');
  gr.setLimit(5);
  gr.query();
  
  while(gr.next()) {
    data.incidents.push({
      sys_id: gr.getUniqueValue(),
      number: gr.getValue('number'),
      short_description: gr.getValue('short_description'),
      priority: gr.getDisplayValue('priority'),
      state: gr.getDisplayValue('state')
    });
  }
})();`,
  validationType: 'static_code',
  successCriteria: [
    'Utilisation de gs.getUserID() pour filtrer par utilisateur',
    'Requête GlideRecord sur la table incident avec addActiveQuery()',
    'Alimentation correcte du tableau data.incidents avec push()'
  ],
  hints: ['Utilisez gr.getDisplayValue() pour récupérer les libellés lisibles des choix comme la priorité ou l’état']
},
{
  id: 'ex-oauth-token-request',
  courseId: 'oauth-api-security',
  title: 'Générer et injecter dynamiquement un token OAuth dans un script d’intégration',
  level: 'Senior',
  scenario: 'Vous devez développer un script utilitaire serveur qui récupère un jeton d’accès OAuth 2.0 via l’API native avant d’exécuter une requête HTTP vers un système tiers sécurisé.',
  prerequisites: ['Connaissance de sn_auth.OAuthClient', 'Maîtrise de RESTMessageV2'],
  instructions: [
    'Utiliser le gestionnaire d’authentification pour demander un token valide à partir d’un profil configuré.',
    'Récupérer la chaîne du jeton d’accès (Access Token).',
    'Injecter le token dans l’en-tête Authorization (Bearer Token) d’une requête RESTMessageV2.'
  ],
  pdiSteps: [
    'Aller dans System OAuth > Application Registry pour créer un profil de connexion.',
    'Configurer le fournisseur d’identité (OAuth Provider).',
    'Tester l’obtention du token via un script de test (Fix Script).'
  ],
  initialCode: `(function executeOAuthIntegration() {
  try {
    // Écris ton code d'authentification et d'injection de token ici
    
  } catch (ex) {
    gs.error("Erreur d'authentification OAuth : " + ex.message);
  }
})();`,
  solutionCode: `(function executeOAuthIntegration() {
  try {
    // Récupération du token via le profil d'authentification OAuth enregistré
    var sm = new sn_ws.RESTMessageV2();
    sm.setEndpoint('https://api.external-system.com/v1/secure-data');
    sm.setHttpMethod('GET');
    
    // Injection automatique ou manuelle du profil OAuth
    sm.setAuthenticationProfile('oauth2', 'sys_id_du_profil_oauth');
    
    var response = sm.execute();
    var statusCode = response.getStatusCode();
    
    if (statusCode === 200) {
      gs.info("Appel sécurisé OAuth réussi : " + response.getBody());
    } else {
      gs.warn("Échec de l'appel sécurisé, statut : " + statusCode);
    }
  } catch (ex) {
    gs.error("Erreur d'authentification OAuth : " + ex.message);
  }
})();`,
  validationType: 'static_code',
  successCriteria: [
    'Utilisation de RESTMessageV2 combiné à un profil d’authentification',
    'Gestion propre des blocs try...catch pour la sécurité',
    'Vérification du code de statut HTTP après exécution'
  ],
  hints: ['Utilisez la méthode setAuthenticationProfile pour lier directement un profil OAuth enregistré à votre message REST']
},
{
  id: 'ex-cmdb-ci-audit',
  courseId: 'cmdb-csdm-architecture',
  title: 'Développer un script d’audit pour détecter les serveurs sans relation applicative',
  level: 'Senior',
  scenario: 'Dans le cadre de la gouvernance CSDM, vous devez écrire un script serveur qui parcourt les serveurs actifs (cmdb_ci_server) et identifie ceux qui ne sont rattachés à aucune application métier.',
  prerequisites: ['Maîtrise des tables de la CMDB', 'Connaissance des tables de relation (cmdb_rel_ci)'],
  instructions: [
    'Interroger la table cmdb_ci_server pour récupérer les serveurs actifs.',
    'Vérifier dans la table des relations (cmdb_rel_ci) si un enregistrement lie le serveur à une application.',
    'Consigner les anomalies dans un rapport ou un tableau de résultats.'
  ],
  pdiSteps: [
    'Aller dans Configuration > CI Class Manager pour inspecter la hiérarchie des serveurs.',
    'Vérifier les relations existantes dans la table cmdb_rel_ci.',
    'Exécuter un script de test pour valider l’intégrité des données.'
  ],
  initialCode: `function auditOrphanServers() {
  var orphanServers = [];
  var grServer = new GlideRecord('cmdb_ci_server');
  grServer.addActiveQuery();
  grServer.query();
  
  while(grServer.next()) {
    // Écris ta logique de vérification de relation ici
    
  }
  return orphanServers;
}`,
  solutionCode: `function auditOrphanServers() {
  var orphanServers = [];
  var grServer = new GlideRecord('cmdb_ci_server');
  grServer.addActiveQuery();
  grServer.setLimit(100); // Protection par lot
  grServer.query();
  
  while(grServer.next()) {
    var serverSysId = grServer.getUniqueValue();
    
    // Vérification de l'existence d'une relation sortante ou entrante vers une application
    var grRel = new GlideRecord('cmdb_rel_ci');
    grRel.addQuery('parent', serverSysId).addOrCondition('child', serverSysId);
    grRel.query();
    
    if (!grRel.hasNext()) {
      orphanServers.push({
        sys_id: serverSysId,
        name: grServer.getValue('name'),
        ip_address: grServer.getValue('ip_address')
      });
    }
  }
  return orphanServers;
}`,
  validationType: 'static_code',
  successCriteria: [
    'Interrogation de la table cmdb_ci_server avec filtre actif',
    'Vérification croisée dans la table de relation cmdb_rel_ci',
    'Utilisation de hasNext() pour détecter l’absence de liens'
  ],
  hints: ['La table cmdb_rel_ci gère les liens parent/enfant à double sens à travers les champs parent et child']
},
{
  id: 'ex-catalog-client-script',
  courseId: 'service-catalog-advanced',
  title: 'Développer un Catalog Client Script OnChange pour filtrer les options',
  level: 'Intermédiaire',
  scenario: 'Sur un formulaire de commande de matériel, lorsqu’un utilisateur sélectionne le type "Ordinateur Portable", vous devez rendre le champ de justification obligatoire et afficher un message d’information.',
  prerequisites: ['Connaissance de g_form', 'Maîtrise des Catalog Client Scripts de type OnChange'],
  instructions: [
    'Vérifier si la variable modifiée correspond à "hardware_type".',
    'Si la valeur sélectionnée est "laptop", rendre le champ "justification" obligatoire avec g_form.setMandatory().',
    'Afficher un message d’information avec g_form.showFieldMsg().'
  ],
  pdiSteps: [
    'Aller dans Service Catalog > Maintain Items et ouvrir un article de catalogue.',
    'Créer un nouveau Catalog Client Script de type OnChange.',
    'Implémenter la logique de contrôle conditionnel des variables.'
  ],
  initialCode: `function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading || newValue === '') {
    return;
  }
  
  // Écris ta logique de contrôle g_form ici
  
}`,
  solutionCode: `function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading || newValue === '') {
    return;
  }

  // Vérification de la sélection du type matériel
  if (newValue == 'laptop') {
    g_form.setMandatory('justification', true);
    g_form.showFieldMsg('justification', 'Une justification détaillée est requise pour toute commande de portable.', 'info');
  } else {
    g_form.setMandatory('justification', false);
    g_form.hideFieldMsg('justification');
  }
}`,
  validationType: 'static_code',
  successCriteria: [
    'Vérification de l’état isLoading et des valeurs vides',
    'Utilisation de g_form.setMandatory() pour dynamiser les champs obligatoires',
    'Utilisation correcte de g_form.showFieldMsg() pour guider l’utilisateur'
  ],
  hints: ['N’oubliez jamais de vérifier si isLoading est vrai pour éviter l’exécution prématurée du script au chargement du formulaire']
},
{
  id: 'ex-pa-formula-script',
  courseId: 'performance-analytics-advanced',
  title: 'Développer une formule d’indicateur analytique pour le taux de réouverture',
  level: 'Senior',
  scenario: 'Vous devez concevoir la logique mathématique d’un indicateur de formule (Formula Indicator) mesurant le pourcentage d’incidents réouverts par rapport aux incidents résolus.',
  prerequisites: ['Maîtrise des scores Performance Analytics', 'Bases de calcul de ratios en PA'],
  instructions: [
    'Identifier l’indicateur numérateur (Nombre d’incidents réouverts).',
    'Identifier l’indicateur dénominateur (Nombre d’incidents résolus).',
    'Rédiger l’expression de la formule PA en gérant le risque de division par zéro.'
  ],
  pdiSteps: [
    'Aller dans Performance Analytics > Indicators > Formula Indicators.',
    'Créer un nouvel indicateur de formule.',
    'Tester l’évaluation de la formule sur les scores de la période précédente.'
  ],
  initialCode: `function calculateReopenRateIndicator(reopenedCount, resolvedCount) {
  // Écris la logique de calcul sécurisée de la formule PA ici
  
  return 0;
}`,
  solutionCode: `function calculateReopenRateIndicator(reopenedCount, resolvedCount) {
  // Sécurisation contre la division par zéro
  if (!resolvedCount || resolvedCount === 0) {
    return 0.00;
  }
  
  var ratio = (reopenedCount / resolvedCount) * 100;
  
  // Arrondi à deux décimales pour les graphiques de score
  return parseFloat(ratio.toFixed(2));
}`,
  validationType: 'static_code',
  successCriteria: [
    'Vérification de la validité du dénominateur (anti-division par zéro)',
    'Calcul correct du ratio en pourcentage',
    'Formatage propre du résultat numérique'
  ],
  hints: ['Dans Performance Analytics, les formules gèrent nativement les indicateurs sous forme de variables entre crochets ex: [[Incidents Reopened]] / [[Incidents Resolved]]']
},
{
  id: 'ex-integrationhub-action',
  courseId: 'integrationhub-custom-spokes',
  title: 'Structurer l’appel REST d’une Custom Action IntegrationHub',
  level: 'Senior',
  scenario: 'Vous développez une Action personnalisée dans IntegrationHub pour notifier un système tiers de la clôture d’un incident critique. Vous devez configurer l’appel REST en récupérant l’endpoint depuis un Alias de Connexion.',
  prerequisites: ['Maîtrise de Flow Designer', 'Connaissance des Alias de Connexion et d’Identifiants'],
  instructions: [
    'Récupérer l’identifiant de l’incident et le message depuis les variables d’entrée (inputs).',
    'Configurer l’appel REST en s’appuyant sur l’alias de connexion.',
    'Renvoyer le code de statut et le message de confirmation dans les variables de sortie (outputs).'
  ],
  pdiSteps: [
    'Aller dans Process Automation > Flow Designer > Actions > New.',
    'Définir les entrées (incidentNumber, description) et sorties (statusCode, successMessage).',
    'Ajouter une étape REST et lier l’instance à un Alias de Connexion.'
  ],
  initialCode: `(function execute(inputs, outputs) {
  try {
    // Écris ta logique d'appel REST intégrée à IntegrationHub ici
    
  } catch (ex) {
    outputs.statusCode = 500;
    outputs.successMessage = "Erreur : " + ex.message;
  }
})(inputs, outputs);`,
  solutionCode: `(function execute(inputs, outputs) {
  try {
    var rm = new sn_ws.RESTMessageV2();
    // Utilisation d'un alias de connexion pour l'endpoint
    rm.setEndpoint(connection + '/api/v1/notifications');
    rm.setHttpMethod('POST');
    rm.setRequestHeader('Content-Type', 'application/json');
    
    var payload = {
      number: inputs.incidentNumber,
      message: inputs.description
    };
    
    rm.setRequestBody(JSON.stringify(payload));
    
    var response = rm.execute();
    outputs.statusCode = response.getStatusCode();
    outputs.successMessage = outputs.statusCode === 200 ? "Notification envoyée avec succès" : "Échec de l'envoi distant";
    
  } catch (ex) {
    outputs.statusCode = 500;
    outputs.successMessage = "Erreur critique : " + ex.message;
  }
})(inputs, outputs);`,
  validationType: 'static_code',
  successCriteria: [
    'Utilisation de RESTMessageV2 avec les variables inputs et outputs',
    'Sérialisation correcte du corps JSON avec JSON.stringify()',
    'Gestion robuste des erreurs avec le bloc try...catch'
  ],
  hints: ['Dans IntegrationHub, l’utilisation d’alias de connexion garantit la portabilité de votre Custom Action entre les environnements DEV, TEST et PROD']
},
{
  id: 'ex-upgrade-skipped-audit',
  courseId: 'instance-upgrade-governance',
  title: 'Développer un script d’audit pour recenser les Skipped Changes post-upgrade',
  level: 'Senior',
  scenario: 'Suite à une mise à jour majeure de l’instance, vous devez automatiser le recensement des enregistrements de la table des modifications ignorées (sys_upgrade_history_log ou sys_update_version) nécessitant une revue manuelle.',
  prerequisites: ['Maîtrise de GlideRecord', 'Connaissance de la gestion des versions système'],
  instructions: [
    'Interroger la table des éléments ignorés ou modifiés lors de l’upgrade.',
    'Filtrer sur les éléments dont l’état nécessite une attention (ex: Skipped).',
    'Retourner un tableau récapitulatif des composants impactés.'
  ],
  pdiSteps: [
    'Aller dans System Diagnostics > Upgrade History.',
    'Sélectionner la dernière mise à jour et inspecter l’onglet Skipped Changes.',
    'Traiter les conflits un par un ou par lots.'
  ],
  initialCode: `function auditSkippedChanges() {
  var skippedItems = [];
  // Écris ta requête GlideRecord pour auditer les skipped changes ici
  
  return skippedItems;
}`,
  solutionCode: `function auditSkippedChanges() {
  var skippedItems = [];
  var gr = new GlideRecord('sys_upgrade_history_log');
  gr.addQuery('type', 'skipped');
  gr.setLimit(50);
  gr.query();
  
  while(gr.next()) {
    skippedItems.push({
      sys_id: gr.getUniqueValue(),
      name: gr.getValue('name'),
      unov: gr.getValue('upgrade_version'),
      reason: gr.getValue('reason') || 'Personnalisation détectée'
    });
  }
  
  return skippedItems;
}`,
  validationType: 'static_code',
  successCriteria: [
    'Interrogation de la table de suivi des upgrades',
    'Filtrage sur les éléments ignorés (skipped)',
    'Construction d’un tableau de restitution structuré'
  ],
  hints: ['La table sys_upgrade_history_log permet de suivre précisément les conflits de fusion lors des montées de version']
},
{
  id: 'ex-cle-audit',
  courseId: 'advanced-data-encryption',
  title: 'Audit des champs sensibles et vérification de la configuration CLE',
  level: 'Senior',
  scenario: 'Dans le cadre d’un audit de conformité RGPD, vous devez développer un script d’inspection qui liste les configurations de sécurité appliquées sur les dictionnaires de données pour identifier les colonnes potentiellement exposées.',
  prerequisites: ['Maîtrise de la table sys_dictionary', 'Connaissance des attributs de sécurité'],
  instructions: [
    'Interroger la table sys_dictionary pour repérer les champs contenant des informations personnelles (ex: email, phone, salary).',
    'Vérifier si les attributs de chiffrement ou de masquage sont présents.',
    'Renvoyer un rapport d’audit structuré.'
  ],
  pdiSteps: [
    'Aller dans System Security > Column Level Encryption.',
    'Configurer un module de chiffrement sur une table personnalisée.',
    'Tester l’affichage du champ pour un utilisateur non autorisé.'
  ],
  initialCode: `function auditSensitiveColumns() {
  var sensitiveFields = [];
  // Écris ta requête GlideRecord pour auditer le dictionnaire ici
  
  return sensitiveFields;
}`,
  solutionCode: `function auditSensitiveColumns() {
  var sensitiveFields = [];
  var gr = new GlideRecord('sys_dictionary');
  gr.addQuery('element', 'IN', 'email,phone,salary,ssn');
  gr.setLimit(50);
  gr.query();
  
  while(gr.next()) {
    sensitiveFields.push({
      table: gr.getValue('name'),
      column: gr.getValue('element'),
      type: gr.getValue('internal_type'),
      label: gr.getValue('column_label')
    });
  }
  
  return sensitiveFields;
}`,
  validationType: 'static_code',
  successCriteria: [
    'Interrogation de la table sys_dictionary',
    'Filtrage ciblé sur les éléments de colonnes sensibles',
    'Construction d’un tableau de restitution lisible'
  ],
  hints: ['La table sys_dictionary référence l’ensemble des métadonnées et attributs de chaque champ de la plateforme']
},
{
  id: 'ex-error-handling-script',
  courseId: 'error-handling-logging',
  title: 'Développer un gestionnaire d’erreurs centralisé dans un Script Include',
  level: 'Senior',
  scenario: 'Vous écrivez un Script Include utilitaire qui manipule des données critiques. Vous devez concevoir une méthode d’encapsulation qui intercepte toute exception, consigne l’erreur avec le contexte complet dans gs.error() et renvoie un objet de statut propre.',
  prerequisites: ['Maîtrise des blocs try...catch', 'Connaissance de la structure des Script Includes orientés objet'],
  instructions: [
    'Créer une méthode d’exécution sécurisée prenant une fonction de callback en paramètre.',
    'Isoler l’exécution dans un bloc try...catch.',
    'En cas d’erreur, journaliser proprement le message via gs.error() et retourner un statut d’échec.'
  ],
  pdiSteps: [
    'Aller dans System Definition > Script Includes > New.',
    'Créer une classe utilitaire avec une méthode de gestion d’erreur.',
    'Tester l’appel de la méthode dans un script de test (Fix Script).'
  ],
  initialCode: `var SafeExecutor = Class.create();
SafeExecutor.prototype = {
    initialize: function() {},

    executeSecurely: function(actionFunction) {
        try {
            // Écris ton exécution sécurisée et la gestion du try...catch ici
            
        } catch (ex) {
            
        }
    },

    type: 'SafeExecutor'
};`,
  solutionCode: `var SafeExecutor = Class.create();
SafeExecutor.prototype = {
    initialize: function() {},

    executeSecurely: function(actionFunction) {
        try {
            var result = actionFunction();
            return {
                success: true,
                data: result,
                errorMessage: null
            };
        } catch (ex) {
            var errorMsg = "Erreur critique interceptée : " + (ex.message || ex);
            gs.error("[SafeExecutor] " + errorMsg);
            
            return {
                success: false,
                data: null,
                errorMessage: errorMsg
            };
        }
    },

    type: 'SafeExecutor'
};`,
  validationType: 'static_code',
  successCriteria: [
    'Présence d’une structure try...catch robuste',
    'Utilisation de gs.error() pour la traçabilité dans le journal système',
    'Retour d’un objet de statut explicite (success / errorMessage)'
  ],
  hints: ['L’utilisation d’un wrapper try...catch centralisé évite la duplication de code de gestion d’erreur dans vos Script Includes']
},
{
  id: 'ex-git-workflow-audit',
  courseId: 'source-control-git-workflow',
  title: 'Audit des applications Scoped liées au Source Control',
  level: 'Senior',
  scenario: 'Vous devez développer un script utilitaire serveur qui inspecte les applications scoped installées sur l’instance pour vérifier lesquelles sont correctement reliées à un dépôt Git distant et identifier leur branche active.',
  prerequisites: ['Maîtrise des tables sys_app', 'Connaissance du versionnage d’applications'],
  instructions: [
    'Interroger la table sys_app pour lister les applications personnalisées.',
    'Vérifier les champs liés au dépôt distant (source control status / repository URL).',
    'Renvoyer un rapport d’état pour chaque application.'
  ],
  pdiSteps: [
    'Aller dans System Applications > Applications.',
    'Lier une application personnalisée à un dépôt GitHub via l’assistant Source Control.',
    'Tester un commit et un push depuis l’interface studio.'
  ],
  initialCode: `function auditSourceControlApps() {
  var appStatusList = [];
  // Écris ta requête GlideRecord pour auditer les applications scoped ici
  
  return appStatusList;
}`,
  solutionCode: `function auditSourceControlApps() {
  var appStatusList = [];
  var gr = new GlideRecord('sys_app');
  gr.addQuery('vendor', ''); // Exclure les apps store tierces si nécessaire
  gr.query();
  
  while(gr.next()) {
    appStatusList.push({
      appName: gr.getValue('name'),
      scope: gr.getValue('scope'),
      version: gr.getValue('version'),
      sourceControlEnabled: gr.getValue('source_control_enabled') == '1' ? 'Connecté' : 'Non connecté'
    });
  }
  
  return appStatusList;
}`,
  validationType: 'static_code',
  successCriteria: [
    'Interrogation correcte de la table sys_app',
    'Récupération du scope et du nom de l’application',
    'Vérification de l’état de liaison au contrôle de source'
  ],
  hints: ['La table sys_app stocke l’ensemble des métadonnées des applications Scope présentes sur l’instance']
},
{
  id: 'ex-webhook-processor',
  courseId: 'inbound-webhooks-events',
  title: 'Développer un processeur de webhook entrant sécurisé avec l’Event Registry',
  level: 'Senior',
  scenario: 'Vous devez développer un Scripted REST API ou un script de traitement qui intercepte un webhook externe, vérifie que le payload contient un identifiant valide, et déclenche un événement asynchrone via gs.eventQueue().',
  prerequisites: ['Maîtrise de gs.eventQueue()', 'Connaissance de la manipulation des objets JSONRequest'],
  instructions: [
    'Extraire le corps de la requête HTTP entrante et parser le JSON.',
    'Vérifier la présence de la propriété critique "event_id".',
    'Déclencher un événement système via gs.eventQueue() pour un traitement asynchrone en arrière-plan.'
  ],
  pdiSteps: [
    'Aller dans System Policy > Events > Registry pour créer un nom d’événement personnalisé (ex: external.webhook.received).',
    'Créer un Scripted REST API pour recevoir le flux HTTP posté.',
    'Tester l’appel à l’aide d’un outil de test d’API (Postman ou script interne).'
  ],
  initialCode: `function processIncomingWebhook(requestBody) {
  try {
    // Écris ton analyse de payload et le déclenchement de l'événement ici
    
  } catch (ex) {
    gs.error("Erreur de traitement du webhook : " + ex.message);
  }
}`,
  solutionCode: `function processIncomingWebhook(requestBody) {
  try {
    var data = typeof requestBody === 'string' ? JSON.parse(requestBody) : requestBody;
    
    if (!data || !data.event_id) {
      gs.warn("Webhook rejeté : Payload invalide ou manquant de l'identifiant d'événement.");
      return { status: 400, message: "Invalid payload: missing event_id" };
    }
    
    // Déclenchement asynchrone via l'Event Registry pour protéger les performances
    gs.eventQueue(
      'external.webhook.received',
      null,
      data.event_id,
      JSON.stringify(data)
    );
    
    return { status: 200, message: "Webhook accepted and queued for processing" };
  } catch (ex) {
    gs.error("Erreur critique dans le processeur de webhook : " + ex.message);
    return { status: 500, message: "Internal server error" };
  }
}`,
  validationType: 'static_code',
  successCriteria: [
    'Parsing sécurisé du corps de la requête JSON',
    'Validation de la présence de la propriété de contrôle (event_id)',
    'Utilisation correcte de gs.eventQueue() pour le traitement asynchrone'
  ],
  hints: ['L’utilisation de l’Event Registry (gs.eventQueue) permet de découpler la réception réseau de l’exécution du code métier']
},
{
  id: 'ex-atf-server-validation',
  courseId: 'atf-automated-testing',
  title: 'Développer un script de validation personnalisé pour une étape ATF serveur',
  level: 'Senior',
  scenario: 'Vous écrivez une étape de test serveur personnalisée (Server-side Script Step) dans l’ATF pour vérifier qu’un incident créé lors d’une étape précédente possède bien la priorité critique et un groupe assigné valide.',
  prerequisites: ['Maîtrise de l’API ATF (outputs / stepResult)', 'Connaissance de la structure des tests automatisés'],
  instructions: [
    'Récupérer l’identifiant de l’enregistrement testé transmis par l’étape précédente.',
    'Interroger la table incident pour vérifier l’état des champs.',
    'Définir le résultat du test (success = true/false) à l’aide de stepResult.'
  ],
  pdiSteps: [
    'Aller dans Automated Test Framework (ATF) > Tests > New.',
    'Ajouter une étape "Run Server Script" à votre suite de test.',
    'Implémenter la logique d’assertion et exécuter le test.'
  ],
  initialCode: `(function(outputs, steps, stepResult, assertEqual) {
  try {
    // Écris ta logique de validation serveur ATF ici
    
    stepResult.setOutputMessage("Validation réussie.");
    return true;
  } catch (ex) {
    stepResult.setOutputMessage("Échec du test : " + ex.message);
    return false;
  }
})(outputs, steps, stepResult, assertEqual);`,
  solutionCode: `(function(outputs, steps, stepResult, assertEqual) {
  try {
    // Récupération de l'ID de l'incident créé à l'étape précédente (ex: step 1)
    var incidentSysId = steps[1].record_id;
    
    if (!incidentSysId) {
      stepResult.setOutputMessage("Erreur : Aucun ID d'enregistrement trouvé dans l'étape précédente.");
      return false;
    }
    
    var gr = new GlideRecord('incident');
    if (gr.get(incidentSysId)) {
      var priority = gr.getValue('priority');
      var assignmentGroup = gr.getValue('assignment_group');
      
      // Assertion de validation
      if (priority === '1' && assignmentGroup) {
        stepResult.setOutputMessage("Validation réussie : Incident critique avec groupe assigné.");
        return true;
      } else {
        stepResult.setOutputMessage("Échec de l'assertion : Priorité ou groupe invalide.");
        return false;
      }
    } else {
      stepResult.setOutputMessage("Erreur : L'incident est introuvable en base.");
      return false;
    }
  } catch (ex) {
    stepResult.setOutputMessage("Exception critique dans le script ATF : " + ex.message);
    return false;
  }
})(outputs, steps, stepResult, assertEqual);`,
  validationType: 'static_code',
  successCriteria: [
    'Récupération sécurisée de l’ID de l’étape précédente via l’objet steps',
    'Interrogation de la table incident avec GlideRecord',
    'Utilisation de stepResult.setOutputMessage() pour tracer le résultat'
  ],
  hints: ['L’objet steps dans l’ATF permet de transporter les données et les identifiants d’une étape de test à la suivante']
}
];