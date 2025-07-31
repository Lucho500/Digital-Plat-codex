import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Check } from 'lucide-react';

export interface CompanyActivityProps {
  companySize: string;
  setCompanySize: (v: string) => void;
  sector: string;
  setSector: (v: string) => void;
  legalName: string;
  setLegalName: (v: string) => void;
  siren: string;
  setSiren: (v: string) => void;
  address: string;
  setAddress: (v: string) => void;
  postalCode: string;
  setPostalCode: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  activityDesc: string;
  setActivityDesc: (v: string) => void;
  taxRegime: string;
  setTaxRegime: (v: string) => void;
  onAutoFill: () => void;
  activitySectors: { id: string; label: string }[];
  companySizes: { id: string; label: string; description: string; icon: React.ReactNode }[];
}

const CompanyActivityStep: React.FC<CompanyActivityProps> = ({
  companySize,
  setCompanySize,
  sector,
  setSector,
  legalName,
  setLegalName,
  siren,
  setSiren,
  address,
  setAddress,
  postalCode,
  setPostalCode,
  city,
  setCity,
  activityDesc,
  setActivityDesc,
  taxRegime,
  setTaxRegime,
  onAutoFill,
  activitySectors,
  companySizes
}) => (
  <div className="space-y-6">
    <Card>
      <h3 className="text-lg font-medium text-gray-900 mb-6">Informations sur votre entreprise</h3>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Taille de votre entreprise
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {companySizes.map(size => (
            <div
              key={size.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${companySize === size.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'}`}
              onClick={() => setCompanySize(size.id)}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3 text-primary">{size.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{size.label}</h4>
                    {companySize === size.id && (
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{size.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Informations légales</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="legal-name" className="block text-sm text-gray-500 mb-1">
              Raison sociale
            </label>
            <input
              id="legal-name"
              type="text"
              className="form-input"
              value={legalName}
              onChange={e => setLegalName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="siren" className="block text-sm text-gray-500 mb-1">
              SIREN
            </label>
            <div className="flex space-x-2">
              <input
                id="siren"
                type="text"
                className="form-input flex-1"
                value={siren}
                onChange={e => setSiren(e.target.value)}
              />
              <Button type="button" variant="secondary" size="sm" onClick={onAutoFill}>
                Auto-remplir
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          Adresse du siège social
        </label>
        <input
          id="address"
          type="text"
          className="form-input mb-3"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-1">
            <input
              id="postal-code"
              type="text"
              className="form-input"
              value={postalCode}
              onChange={e => setPostalCode(e.target.value)}
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <input
              id="city"
              type="text"
              className="form-input"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <input id="country" type="text" className="form-input" value="France" readOnly />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Secteur d'activité principal</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activitySectors.map(sectorItem => (
            <div
              key={sectorItem.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${sector === sectorItem.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'}`}
              onClick={() => setSector(sectorItem.id)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{sectorItem.label}</span>
                {sector === sectorItem.id && (
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="activity-desc" className="block text-sm font-medium text-gray-700 mb-2">
          Description de votre activité
        </label>
        <textarea
          id="activity-desc"
          className="form-input h-24"
          value={activityDesc}
          onChange={e => setActivityDesc(e.target.value)}
          placeholder="Décrivez brièvement votre activité..."
        />
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Régime fiscal</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="taxRegime"
                value="is"
                checked={taxRegime === 'is'}
                onChange={() => setTaxRegime('is')}
                className="h-4 w-4 text-primary border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Impôt sur les sociétés (IS)</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="taxRegime"
                value="ir"
                checked={taxRegime === 'ir'}
                onChange={() => setTaxRegime('ir')}
                className="h-4 w-4 text-primary border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Impôt sur le revenu (IR)</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="taxRegime"
                value="micro"
                checked={taxRegime === 'micro'}
                onChange={() => setTaxRegime('micro')}
                className="h-4 w-4 text-primary border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Micro-entreprise</span>
            </label>
          </div>
        </div>
      </div>
    </Card>
  </div>
);

export default CompanyActivityStep;
