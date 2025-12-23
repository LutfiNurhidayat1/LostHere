// src/services/reportService.ts
import { supabase } from '../lib/supabase';
import { calculateMatchScore } from './matchService';

export const createReport = async (
  payload: any,
  userId: string,
  type: 'lost' | 'found'
) => {
  const { data, error } = await supabase
    .from('reports')
    .insert({
      ...payload,
      user_id: userId,
      type,
      status: 'pending'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const findMatchingReports = async (
  report: any,
  userId: string
) => {
  const oppositeType = report.type === 'lost' ? 'found' : 'lost';

  const { data } = await supabase
    .from('reports')
    .select('*')
    .eq('type', oppositeType)
    .eq('category', report.category)
    .neq('user_id', userId);

  if (!data) return [];

  return data.filter(r => calculateMatchScore(report, r) >= 4);
};
