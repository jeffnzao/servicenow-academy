import { Course } from '@/types/course';

export const TECHNICAL_COURSES_DATA: Course[] = [
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
  }
];