import { supabase } from '../supabase';

export async function updateClosingTaskStatus(taskId: string, status: string) {
  const { error } = await supabase
    .from('closing_tasks')
    .update({ status })
    .eq('id', taskId);

  if (error) throw error;
}
