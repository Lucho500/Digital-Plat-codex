-- AI training entries for journal suggestion model
create table if not exists ai_training_entries (
  id bigserial primary key,
  vatCode text,
  accountDebit text,
  accountCredit text,
  amount numeric,
  description text
);

-- seed with a couple of examples
insert into ai_training_entries (vatCode, accountDebit, accountCredit, amount, description) values
  ('VAT20', '601', '44566', 120.50, 'Office supplies purchase'),
  ('VAT0', '512', '706', 2000, 'Bank interest');
