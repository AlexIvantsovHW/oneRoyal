export interface Casino {
  casino_id: number; // Casino ID
  title: string; // Casino name
  link: string; // Casino link
  logo_img: string; // Casino logo URL
  casino_rate: number; // Casino rating (как строка, так как в примере это строка)
  bonuses: Bonus[]; // List of bonuses
  features: Feature[]; // List of features
  country_code_id: number; // Country code ID
  country_code: string; // Country code
  country_id: number; // Country ID
  country: string; // Country name
  payments: Payments[];
}
export interface User {
  id: number;
  email: string;
  password: string;
  user_name: string;
  role: boolean;
}
export interface Bonus {
  id: number; // Bonus ID
  bonus: string; // Bonus title
}

export interface Feature {
  id: number; // Feature ID
  feature: string; // Feature description
}

export interface Country {
  id: string; // Country ID as string
  country: string; // Country name
}

export interface CountryCode {
  id: string; // Country code ID as string
  country_code: string; // Country code
}
export interface Payments {
  id: string; // Country code ID as string
  payment: string; // Country code
  payment_link: string; // Country code
}

export interface Logs {
  id: number;
  status: boolean;
  created_at: string | Date;
  ip: string;
  hostname: string;
  city: string;
  country: string;
  region: string;
  org: string;
  timezone: string;
  domain: string;
}
