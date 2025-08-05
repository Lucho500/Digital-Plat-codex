-- 1.1 Tables connexions & tokens
create table if not exists erp_tokens (
  accountId uuid primary key,
  provider text,         -- 'abacus' | 'bexio'
  accessToken text,
  refreshToken text,
  expiresAt timestamptz,
  encrypted boolean default true
);

create table if not exists bank_connections (
  accountId uuid primary key,
  sftpHost text,
  sftpUser text,
  sftpPassEnc text,        -- chiffrement KMS
  lastSync timestamptz
);

-- 1.2 Journal & sous-livres
create table if not exists journal_entries (
  id uuid primary key,
  accountId uuid,
  date date,
  glAccount text,
  contra text,
  amount numeric,
  vatCode text,
  source text,           -- 'abacus' | 'bexio'
  extId text
);

create table if not exists subledger_entries (
  id uuid primary key,
  accountId uuid,
  type text,           -- 'AR' | 'AP'
  extId text,
  date date,
  amount numeric,
  status text
);

-- 1.3 Transactions bancaires
create table if not exists bank_transactions (
  id uuid primary key,
  accountId uuid,
  valDate date,
  text text,
  amount numeric,
  balance numeric,
  reconciled boolean default false
);
