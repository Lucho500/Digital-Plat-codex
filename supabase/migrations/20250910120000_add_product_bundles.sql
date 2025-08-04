-- Table for product bundles including advisory sessions
create table if not exists product_bundles (
  id text primary key,
  moduleId text references modules(id),
  advisoryIncluded boolean default false,
  priceCents int not null,
  discountPct int default 0,
  active boolean default true
);

-- Enable RLS and allow public read access
alter table product_bundles enable row level security;
create policy "product bundles are public" on product_bundles
  for select using (true);

-- Seed initial module + advisory bundle
insert into product_bundles (id, moduleId, advisoryIncluded, priceCents, discountPct, active)
values (
  'bundle_modX_adv',
  'moduleX',
  true,
  (select priceCents * 1.9 from modules where id = 'moduleX'),
  10,
  true
)
on conflict (id) do nothing;
