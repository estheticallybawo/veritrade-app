// Mock CAC Database - In production, this would be an API call
// Based on suppliers_data.csv

export interface CACRecord {
  supplier_id: string;
  business_name: string;
  registration_number: string;
  status: string;
  registration_date: string;
  business_type: string;
  industry_category: string;
  state: string;
  verification_status: 'VERIFIED' | 'REJECTED' | 'FLAGGED';
  verification_reason: string;
}

// Sample data from CSV for demo purposes
const cacDatabase: CACRecord[] = [
  {
    supplier_id: 'BUS0000001',
    business_name: 'Sunbeam Electricals',
    registration_number: 'RC856259',
    status: 'registered',
    registration_date: '2019-09-02',
    business_type: 'Non-Profit Organization',
    industry_category: 'Consulting',
    state: 'Delta',
    verification_status: 'VERIFIED',
    verification_reason: 'Business passed basic verification'
  },
  {
    supplier_id: 'BUS0000003',
    business_name: 'Sunbeam Electricals',
    registration_number: 'RC742053',
    status: 'registered',
    registration_date: '2016-07-04',
    business_type: 'Partnership',
    industry_category: 'Waste Management',
    state: 'Benue',
    verification_status: 'VERIFIED',
    verification_reason: 'Business passed basic verification'
  },
  {
    supplier_id: 'BUS0000004',
    business_name: 'Vertex Global Services',
    registration_number: 'RC901757',
    status: 'registered',
    registration_date: '2025-03-08',
    business_type: 'Non-Profit Organization',
    industry_category: 'Microfinance',
    state: 'Kogi',
    verification_status: 'FLAGGED',
    verification_reason: 'Recently registered business'
  },
  {
    supplier_id: 'BUS0000009',
    business_name: 'BrightWave Technologies',
    registration_number: 'RC880926',
    status: 'registered',
    registration_date: '2015-02-06',
    business_type: 'Limited Liability Company',
    industry_category: 'Entertainment',
    state: 'Jigawa',
    verification_status: 'VERIFIED',
    verification_reason: 'Business passed basic verification'
  },
  {
    supplier_id: 'BUS0000010',
    business_name: 'Elite Cleaning Co',
    registration_number: 'RC300641',
    status: 'registered',
    registration_date: '2018-06-05',
    business_type: 'Enterprise',
    industry_category: 'Hospitality',
    state: 'Benue',
    verification_status: 'VERIFIED',
    verification_reason: 'Business passed basic verification'
  },
  {
    supplier_id: 'BUS0000017',
    business_name: 'Nova Industrial Works',
    registration_number: 'RC236849',
    status: 'registered',
    registration_date: '2020-12-07',
    business_type: 'Partnership',
    industry_category: 'Fintech',
    state: 'Rivers',
    verification_status: 'VERIFIED',
    verification_reason: 'Business passed basic verification'
  }
];

export const lookupCAC = (registrationNumber: string): CACRecord | null => {
  const record = cacDatabase.find(
    rec => rec.registration_number.toLowerCase() === registrationNumber.toLowerCase()
  );
  return record || null;
};

export const lookupByBusinessName = (businessName: string): CACRecord[] => {
  return cacDatabase.filter(
    rec => rec.business_name.toLowerCase().includes(businessName.toLowerCase())
  );
};

export const verifyBusiness = (
  businessName: string,
  registrationNumber: string
): {
  found: boolean;
  match: boolean;
  record?: CACRecord;
  reason?: string;
} => {
  const record = lookupCAC(registrationNumber);
  
  if (!record) {
    return {
      found: false,
      match: false,
      reason: 'Registration number not found in CAC database'
    };
  }
  
  const nameMatch = record.business_name.toLowerCase() === businessName.toLowerCase();
  
  return {
    found: true,
    match: nameMatch,
    record,
    reason: nameMatch 
      ? record.verification_reason 
      : 'Business name does not match CAC records'
  };
};
