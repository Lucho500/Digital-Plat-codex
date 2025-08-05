import { db } from './cash-db';
import * as python from './python';

export async function predictCash(accountId: string) {
  const data = await db.getCashSeries(accountId, 36);
  return await python.invoke('predict.py', { data });
}
