export interface FixStep {
  step: number;
  instruction: string;
  sensory_cue: string;
  sound_cue?: string;
  touch_cue?: string;
  smell_cue?: string;
  safety_level?: string;
}

export interface DecisionTree {
  question: string;
  yes: string | DecisionTree;
  no: string | DecisionTree;
}

export interface Technician {
  name: string;
  location: string;
  verified: boolean;
  years_exp: number;
  avatar?: string;
}

export interface RepairCase {
  id: string;
  title: string;
  category: 'water_pumps' | 'inverters' | 'household_appliances';
  category_name?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  language: 'hi' | 'mr' | 'en';
  technician: Technician;
  symptom: string;
  probable_cause: string;
  fix_steps: FixStep[];
  decision_tree?: DecisionTree;
  parts: string[];
  tools: string[];
  estimated_time: string;
  estimated_cost: string;
  safety_warnings: string[];
  confidence: number;
  success_rate: number;
  repair_count: number;
  e_waste_kg_saved: number;
  money_saved?: number;
  mentor_verified: boolean;
}

export interface Booking {
  id: number;
  customer_name: string;
  phone: string;
  issue: string;
  appointment_time: string;
  estimated_price: string;
  status: string;
}

export interface ImpactData {
  repairs_documented: number;
  repairs_completed: number;
  learners_trained: number;
  e_waste_avoided_kg: number;
  money_saved_inr: number;
  active_languages: string[];
  call_relays_handled: number;
}
