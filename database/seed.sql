insert into feature_flags (id, is_enabled)
values ('onboardingQR', false)
on conflict (id) do nothing;

insert into relance_profiles (name, tone, min_days_late, max_days_late, payment_score_min) values
  ('Courtois', 'courtois', 1, 14, 80),
  ('Ferme', 'ferme', 15, 45, 40),
  ('Humoristique', 'humoristique', 1, 30, 90);
