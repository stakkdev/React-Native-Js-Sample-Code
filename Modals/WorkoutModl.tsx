export interface WorkoutCat {
  id: number;
  title: string;
  duration: number;
  pace: number;
  equipment_req: string;
  enabled: number;
  image: string;
}

export interface RecWorkout {
  id: number;
  title: string;
  about: string;
  three_months_description: string;
  six_months_description: string;
  year_description: string;
  three_months_price: number;
  six_months_price: number;
  year_price: number;
  min_bmi: number;
  max_bmi: number;
  enabled: number;
  image: string;
}

export interface Workouts {
  id: number;
  title: string;
  about: string;
  instructions: string;
  precautions: string;
  level: number;
  equipment_req: string;
  enabled: number;
  pace?: any;
  image: string;
  video: string;
}

export interface RecWorkoutDtls {
  id: number;
  title: string;
  about: string;
  tags: any[],
  three_months_description: string;
  six_months_description: string;
  year_description: string;
  three_months_price: number;
  six_months_price: number;
  year_price: number;
  min_bmi: number;
  max_bmi: number;
  enabled: number;
  image: string;
  video: string;
  count: number;
}

export interface Excercise {
  title: string;
  id: number;
  repitition: number;
  image: string;
}

export interface ExerciseCatDtls {
  title: string;
  id: number;
  image: string;
  equipment_req: string;
  level: string;
  duration: number;
  duration_type: string;
  excercises: Excercise[];
}
//----------------------------------------
//----------------------------------------
//User Workout Modal
export interface PlanData {
  plan_title: string;
  week_title: string;
  week_no: number;
  current_day: string;
  image: string;
}

export interface Excercis {
  title: string;
  id: number;
  repitition: number;
  image: string;
  video: string;
  completed: number;
  end_time: number;
  idle_time_duration: number;
}

export interface CategoryData {
  category_id: number;
  category_title: string;
  duration_type: string;
  duration: string;
  total_session_time: string;
  excercises: Excercis[];
}

export interface UserWorkout {
  planData: PlanData;
  categoryData: CategoryData[];
}
