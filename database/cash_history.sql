create table if not exists cash_history (
  account_id uuid references companies(id),
  date date not null,
  inflow numeric not null,
  outflow numeric not null,
  balance numeric not null,
  primary key(account_id, date)
);
