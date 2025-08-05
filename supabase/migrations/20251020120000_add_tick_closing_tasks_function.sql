-- Function to mark a closing task as done
create or replace function tick_closing_tasks(
  p_account uuid,
  p_period date,
  p_code text
) returns void as $$
begin
  update closing_tasks
  set status = 'done', updated_at = now()
  where account_id = p_account
    and period = p_period
    and template_id = (
      select id from closing_task_templates where code = p_code
    );
end;
$$ language plpgsql;
