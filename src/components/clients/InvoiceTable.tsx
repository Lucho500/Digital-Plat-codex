import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import { Search, Filter, MoreVertical, ArrowRight } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useInvoices } from '../../lib/hooks/useInvoices';

const InvoiceTable: React.FC = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const { company } = useAuthContext();
  const { data: invoices, loading } = useInvoices(company?.id);

  const formatStatus = (status: string | null) => {
    switch (status) {
      case 'paid':
        return 'badge-success';
      case 'pending':
        return 'badge-warning';
      case 'overdue':
        return 'badge-error';
      default:
        return 'badge-secondary';
    }
  };

  return (
    <div className="mb-8">
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Factures récentes</h3>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="form-input py-1.5 pl-8 pr-3 text-sm"
              />
              <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <Button
              variant="secondary"
              size="sm"
              icon={<Filter size={16} />}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              Filtrer
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Numéro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading || !invoices ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    Chargement...
                  </td>
                </tr>
              ) : (
                invoices.slice(0, 3).map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {invoice.number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar size="sm" fallback={invoice.client_name} />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {invoice.client_name}
                          </div>
                          {invoice.client_email && (
                            <div className="text-sm text-gray-500">{invoice.client_email}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(invoice.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge ${formatStatus(invoice.status)}`}>{invoice.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {(invoice.total ?? 0).toLocaleString()} €
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button className="text-gray-400 hover:text-gray-500">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {invoices ? `Affichage de ${Math.min(3, invoices.length)} factures sur ${invoices.length}` : 'Aucune facture'}
          </p>
          <Button
            variant="text"
            size="sm"
            icon={<ArrowRight size={16} />}
            iconPosition="right"
          >
            Voir toutes les factures
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default InvoiceTable;
