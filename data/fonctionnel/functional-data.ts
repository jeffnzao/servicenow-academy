export interface FunctionalModule {
  id: string;
  slug: string;
  title: string;
  category: string;
  level: string;
  duration: string;
  description: string;
  businessNeed: string;
  pdiSteps: string[];
}

export const FUNCTIONAL_MODULES_DATA: FunctionalModule[] = [
  {
    id: 'create-reports',
    slug: 'create-my-own-reports',
    title: 'Create My Own Reports & Dashboards',
    category: 'Reporting',
    level: 'Débutant',
    duration: '25 min',
    description: 'Apprenez à structurer des rapports, choisir les types de visualisations et partager des tableaux de bord exécutifs.',
    businessNeed: 'Permettre aux managers du Support IT de suivre en temps réel les volumes d’incidents ouverts par criticité et par département.',
    pdiSteps: [
      'Accéder au module Reports > View / Run.',
      'Créer un nouveau rapport sur la table Incident.',
      'Choisir une visualisation en camembert (Pie) groupée par priorité.',
      'Partager le rapport avec le rôle itil.'
    ]
  },
  {
    id: 'knowledge-base',
    slug: 'manage-knowledge-base',
    title: 'Manage Knowledge Base and Create Articles',
    category: 'Knowledge',
    level: 'Intermédiaire',
    duration: '35 min',
    description: 'Gestion des rôles, intégration de documents Word, validation, publication et application des critères utilisateurs (User Criteria).',
    businessNeed: 'Permettre aux coordinateurs RH de publier une base de documents sécurisée accessible uniquement aux employés internes.',
    pdiSteps: [
      'Créer une nouvelle Knowledge Base Human Resources.',
      'Attribuer les rôles d’auteur et d’approbateur au groupe RH.',
      'Définir un User Criteria pour restreindre l’accès aux employés actifs.'
    ]
  }
];