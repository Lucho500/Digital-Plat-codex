import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import DataTable from '../components/ui/DataTable';
import SearchInput from '../components/ui/SearchInput';
import Dropdown from '../components/ui/Dropdown';
import { 
  FileText,
  Plus,
  Download,
  Filter,
  Calendar,
  Search,
  Folder,
  File,
  MoreVertical,
  Upload,
  ArrowRight,
  FolderPlus
} from 'lucide-react';

const Documents: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');

  // Sample data for documents
  const documents = [
    {
      id: 'doc1',
      name: 'Facture_2023_06.pdf',
      type: 'PDF',
      size: '1.2 MB',
      folder: 'Factures',
      lastModified: '2023-06-28',
      status: 'active'
    },
    {
      id: 'doc2',
      name: 'Contrat_Client.docx',
      type: 'DOCX',
      size: '458 KB',
      folder: 'Contrats',
      lastModified: '2023-06-25',
      status: 'active'
    },
    {
      id: 'doc3',
      name: 'Rapport_Mensuel.xlsx',
      type: 'XLSX',
      size: '2.1 MB',
      folder: 'Rapports',
      lastModified: '2023-06-22',
      status: 'archived'
    }
  ];

  const documentColumns = [
    {
      header: 'Document',
      accessor: (row: any) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded bg-primary/10 flex items-center justify-center text-primary">
            <File size={20} />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{row.name}</div>
            <div className="text-sm text-gray-500">{row.folder}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Type',
      accessor: (row: any) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {row.type}
        </span>
      )
    },
    {
      header: 'Taille',
      accessor: (row: any) => (
        <div className="text-sm text-gray-900">{row.size}</div>
      )
    },
    {
      header: 'Dernière modification',
      accessor: (row: any) => (
        <div className="text-sm text-gray-900">
          {new Date(row.lastModified).toLocaleDateString('fr-FR')}
        </div>
      )
    },
    {
      header: 'Actions',
      accessor: (row: any) => (
        <div className="flex justify-end space-x-2">
          <Button variant="text" size="sm" icon={<Download size={16} />} />
          <Dropdown
            trigger={
              <Button variant="text" size="sm" icon={<MoreVertical size={16} />} />
            }
            items={[
              { label: 'Télécharger', value: 'download', icon: <Download size={16} /> },
              { label: 'Renommer', value: 'rename', icon: <FileText size={16} /> },
              { label: 'Déplacer', value: 'move', icon: <Folder size={16} /> },
              { label: 'Supprimer', value: 'delete', icon: <FileText size={16} /> }
            ]}
            align="right"
          />
        </div>
      ),
      align: 'right'
    }
  ];

  return (
    <div className="animate-slide-in-up">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">Documents</h2>
            <p className="text-gray-500 mt-1">Gérez vos documents et fichiers</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button 
              variant="secondary" 
              icon={<Upload size={16} />}
            >
              Importer
            </Button>
            <Button 
              variant="accent" 
              icon={<FolderPlus size={16} />}
            >
              Nouveau dossier
            </Button>
          </div>
        </div>
      </div>

      {/* Document List */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Documents récents</h3>
          <div className="flex items-center space-x-2">
            <SearchInput
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={setSearchQuery}
              size="sm"
            />
            <Button 
              variant="secondary" 
              size="sm"
              icon={<Calendar size={16} />}
            >
              Période
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              icon={<Filter size={16} />}
            >
              Filtrer
            </Button>
          </div>
        </div>

        {documents.length > 0 ? (
          <DataTable
            columns={documentColumns}
            data={documents}
            pageSize={10}
          />
        ) : (
          <EmptyState
            title="Aucun document"
            description="Commencez par importer ou créer votre premier document"
            icon={<FileText size={40} className="text-gray-400" />}
            action={{
              label: "Importer un document",
              onClick: () => {},
              icon: <Upload size={16} />
            }}
          />
        )}
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <Card className="text-center p-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Upload size={24} className="text-primary" />
          </div>
          <h4 className="font-medium">Importer</h4>
          <p className="text-sm text-gray-500 mt-1">Ajouter des fichiers</p>
          <Button variant="text" size="sm" className="mt-3">
            Importer
          </Button>
        </Card>
        
        <Card className="text-center p-4">
          <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Folder size={24} className="text-success" />
          </div>
          <h4 className="font-medium">Dossiers</h4>
          <p className="text-sm text-gray-500 mt-1">Gérer les dossiers</p>
          <Button variant="text" size="sm" className="mt-3">
            Gérer
          </Button>
        </Card>
        
        <Card className="text-center p-4">
          <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Download size={24} className="text-warning" />
          </div>
          <h4 className="font-medium">Exports</h4>
          <p className="text-sm text-gray-500 mt-1">Exporter des documents</p>
          <Button variant="text" size="sm" className="mt-3">
            Exporter
          </Button>
        </Card>
        
        <Card className="text-center p-4">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <FileText size={24} className="text-accent" />
          </div>
          <h4 className="font-medium">Modèles</h4>
          <p className="text-sm text-gray-500 mt-1">Gérer les modèles</p>
          <Button variant="text" size="sm" className="mt-3">
            Voir
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Documents;