insert into feature_flags (id, is_enabled)
values ('onboardingQR', false)
on conflict (id) do nothing;
