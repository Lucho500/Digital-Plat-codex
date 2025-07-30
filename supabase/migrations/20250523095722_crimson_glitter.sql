/*
  # Initial Schema Setup for Forvis Platform

  1. New Tables
    - `companies`
      - Core company information
      - Stores business details and preferences
    
    - `users`
      - User profiles and authentication
      - Links to companies for multi-company support
    
    - `invoices`
      - Customer invoices
      - Tracks all invoice-related data
    
    - `suppliers`
      - Supplier management
      - Stores supplier information and preferences
    
    - `supplier_invoices`
      - Supplier invoices/bills
      - Tracks all supplier invoice data
    
    - `employees`
      - Employee management
      - Stores employee information
    
    - `payrolls`
      - Payroll records
      - Tracks salary payments and calculations
    
    - `tax_declarations`
      - Tax declarations and submissions
      - Tracks all tax-related filings
    
  2. Security
    - Enable RLS on all tables
    - Add policies for data access based on company_id
    - Ensure proper data isolation between companies

  3. Relationships
    - All tables linked to companies via company_id
    - Proper foreign key constraints and cascading
*/

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  legal_name text,
  siren text UNIQUE,
  vat_number text,
  address text,
  postal_code text,
  city text,
  country text DEFAULT 'France',
  phone text,
  email text,
  fiscal_year_start date,
  fiscal_year_end date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  company_id uuid REFERENCES companies(id),
  first_name text,
  last_name text,
  role text DEFAULT 'user',
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id),
  number text NOT NULL,
  date date NOT NULL,
  due_date date NOT NULL,
  client_name text NOT NULL,
  client_email text,
  client_address text,
  client_vat_number text,
  subtotal decimal(12,2) NOT NULL DEFAULT 0,
  vat_amount decimal(12,2) NOT NULL DEFAULT 0,
  total decimal(12,2) NOT NULL DEFAULT 0,
  status text DEFAULT 'draft',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id),
  name text NOT NULL,
  legal_name text,
  vat_number text,
  address text,
  postal_code text,
  city text,
  country text DEFAULT 'France',
  email text,
  phone text,
  payment_terms integer DEFAULT 30,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Supplier invoices table
CREATE TABLE IF NOT EXISTS supplier_invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id),
  supplier_id uuid REFERENCES suppliers(id),
  number text NOT NULL,
  date date NOT NULL,
  due_date date NOT NULL,
  subtotal decimal(12,2) NOT NULL DEFAULT 0,
  vat_amount decimal(12,2) NOT NULL DEFAULT 0,
  total decimal(12,2) NOT NULL DEFAULT 0,
  status text DEFAULT 'pending',
  payment_date date,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text,
  phone text,
  position text,
  hire_date date,
  contract_type text DEFAULT 'CDI',
  base_salary decimal(12,2) NOT NULL DEFAULT 0,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Payrolls table
CREATE TABLE IF NOT EXISTS payrolls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id),
  employee_id uuid REFERENCES employees(id),
  period_start date NOT NULL,
  period_end date NOT NULL,
  gross_amount decimal(12,2) NOT NULL DEFAULT 0,
  net_amount decimal(12,2) NOT NULL DEFAULT 0,
  charges_amount decimal(12,2) NOT NULL DEFAULT 0,
  status text DEFAULT 'draft',
  payment_date date,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tax declarations table
CREATE TABLE IF NOT EXISTS tax_declarations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id),
  type text NOT NULL,
  period_start date NOT NULL,
  period_end date NOT NULL,
  due_date date NOT NULL,
  amount decimal(12,2) NOT NULL DEFAULT 0,
  status text DEFAULT 'draft',
  submission_date date,
  reference_number text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE payrolls ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_declarations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own company data"
  ON companies
  FOR ALL
  TO authenticated
  USING (id IN (
    SELECT company_id FROM users WHERE users.id = auth.uid()
  ));

CREATE POLICY "Users can view their own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can view company invoices"
  ON invoices
  FOR ALL
  TO authenticated
  USING (company_id IN (
    SELECT company_id FROM users WHERE users.id = auth.uid()
  ));

CREATE POLICY "Users can view company suppliers"
  ON suppliers
  FOR ALL
  TO authenticated
  USING (company_id IN (
    SELECT company_id FROM users WHERE users.id = auth.uid()
  ));

CREATE POLICY "Users can view company supplier invoices"
  ON supplier_invoices
  FOR ALL
  TO authenticated
  USING (company_id IN (
    SELECT company_id FROM users WHERE users.id = auth.uid()
  ));

CREATE POLICY "Users can view company employees"
  ON employees
  FOR ALL
  TO authenticated
  USING (company_id IN (
    SELECT company_id FROM users WHERE users.id = auth.uid()
  ));

CREATE POLICY "Users can view company payrolls"
  ON payrolls
  FOR ALL
  TO authenticated
  USING (company_id IN (
    SELECT company_id FROM users WHERE users.id = auth.uid()
  ));

CREATE POLICY "Users can view company tax declarations"
  ON tax_declarations
  FOR ALL
  TO authenticated
  USING (company_id IN (
    SELECT company_id FROM users WHERE users.id = auth.uid()
  ));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_invoices_company ON invoices(company_id);
CREATE INDEX IF NOT EXISTS idx_suppliers_company ON suppliers(company_id);
CREATE INDEX IF NOT EXISTS idx_supplier_invoices_company ON supplier_invoices(company_id);
CREATE INDEX IF NOT EXISTS idx_employees_company ON employees(company_id);
CREATE INDEX IF NOT EXISTS idx_payrolls_company ON payrolls(company_id);
CREATE INDEX IF NOT EXISTS idx_tax_declarations_company ON tax_declarations(company_id);