import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  BookOpen,
  Search,
  ArrowRight,
  FileText,
  Star,
  Clock,
  ChevronRight,
  Download,
  Filter,
  Bookmark,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

const Knowledge: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tout' },
    { id: 'fiscal', label: 'Fiscal' },
    { id: 'social', label: 'Social' },
    { id: 'juridique', label: 'Juridique' },
    { id: 'comptable', label: 'Comptable' }
  ];

  return (
    <div className="animate-slide-in-up">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">Centre de Connaissances</h2>
            <p className="text-gray-500 mt-1">Accédez à notre base de connaissances</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher dans la base de connaissances..."
                className="form-input py-2 pl-10 pr-4 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <Button 
              variant="accent" 
              icon={<Filter size={16} />}
            >
              Filtres avancés
            </Button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Articles */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Articles recommandés</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-primary to-primary-light text-white">
            <div className="flex items-start">
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <Star size={16} className="mr-1" />
                  <span className="text-sm">Recommandé</span>
                </div>
                <h4 className="font-medium mb-2">Guide complet TVA 2023</h4>
                <p className="text-sm text-white/80 mb-4">
                  Tout ce que vous devez savoir sur les changements de TVA en 2023
                </p>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-white/10 hover:bg-white/20 border-white/20"
                >
                  Lire l'article
                </Button>
              </div>
              <FileText size={48} className="ml-4 opacity-20" />
            </div>
          </Card>

          <Card>
            <div className="flex items-start">
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <TrendingUp size={16} className="text-success mr-1" />
                  <span className="text-sm text-success">Populaire</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Optimisation fiscale PME</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Les meilleures pratiques pour optimiser votre fiscalité
                </p>
                <Button variant="text" size="sm">
                  Lire l'article
                </Button>
              </div>
              <FileText size={48} className="ml-4 text-gray-200" />
            </div>
          </Card>

          <Card>
            <div className="flex items-start">
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <AlertTriangle size={16} className="text-warning mr-1" />
                  <span className="text-sm text-warning">Important</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Nouvelles obligations 2023</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Les changements réglementaires à connaître
                </p>
                <Button variant="text" size="sm">
                  Lire l'article
                </Button>
              </div>
              <FileText size={48} className="ml-4 text-gray-200" />
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Articles */}
      <div className="mb-8">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Articles récents</h3>
            <Button 
              variant="text" 
              size="sm" 
              icon={<ArrowRight size={16} />} 
              iconPosition="right"
            >
              Voir tout
            </Button>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="badge badge-primary mr-2">Fiscal</span>
                    <span className="text-xs text-gray-500">Publié le 28/06/2023</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Comment préparer sa déclaration TVA trimestrielle ?
                  </h4>
                  <p className="text-sm text-gray-500 mb-3">
                    Guide étape par étape pour préparer et soumettre votre déclaration TVA
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button variant="text" size="sm" icon={<BookOpen size={16} />}>
                        Lire
                      </Button>
                      <Button variant="text" size="sm" icon={<Bookmark size={16} />}>
                        Sauvegarder
                      </Button>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>10 min de lecture</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="badge badge-primary mr-2">Social</span>
                    <span className="text-xs text-gray-500">Publié le 25/06/2023</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Les nouveautés de la DSN 2023
                  </h4>
                  <p className="text-sm text-gray-500 mb-3">
                    Découvrez les changements majeurs de la DSN pour l'année 2023
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button variant="text" size="sm" icon={<BookOpen size={16} />}>
                        Lire
                      </Button>
                      <Button variant="text" size="sm" icon={<Bookmark size={16} />}>
                        Sauvegarder
                      </Button>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>8 min de lecture</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="badge badge-primary mr-2">Juridique</span>
                    <span className="text-xs text-gray-500">Publié le 22/06/2023</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Protection des données : ce qui change en 2023
                  </h4>
                  <p className="text-sm text-gray-500 mb-3">
                    Les nouvelles obligations en matière de protection des données
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button variant="text" size="sm" icon={<BookOpen size={16} />}>
                        Lire
                      </Button>
                      <Button variant="text" size="sm" icon={<Bookmark size={16} />}>
                        Sauvegarder
                      </Button>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>12 min de lecture</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Resources */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Ressources utiles</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText size={24} className="text-primary" />
            </div>
            <h4 className="font-medium">Guides pratiques</h4>
            <p className="text-sm text-gray-500 mt-1">Téléchargez nos guides</p>
            <Button variant="text" size="sm" className="mt-3">
              Accéder
            </Button>
          </Card>
          
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Download size={24} className="text-success" />
            </div>
            <h4 className="font-medium">Modèles</h4>
            <p className="text-sm text-gray-500 mt-1">Documents types</p>
            <Button variant="text" size="sm" className="mt-3">
              Télécharger
            </Button>
          </Card>
          
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen size={24} className="text-warning" />
            </div>
            <h4 className="font-medium">Formation</h4>
            <p className="text-sm text-gray-500 mt-1">Tutoriels vidéo</p>
            <Button variant="text" size="sm" className="mt-3">
              Voir
            </Button>
          </Card>
          
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertTriangle size={24} className="text-accent" />
            </div>
            <h4 className="font-medium">Actualités</h4>
            <p className="text-sm text-gray-500 mt-1">Dernières news</p>
            <Button variant="text" size="sm" className="mt-3">
              Consulter
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Knowledge;