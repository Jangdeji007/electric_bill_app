export interface Address {
  address:string
  housePlotPremiseNo: string;
  street: string;
  areaColony: string;
  townVillage: string;
  district: string;
  block: string;
  pincode: string;
}

export interface ApplicantDetails {
  title:String
  connectionType:string;
  userId: string;
  email: string;
  mobile: number;
  firstName: string;
  lastName: string;
  dob: any;
  gender: string;
  category: string;
  aadhaarCardNo: string;
  address: Address;
  aadhaarCardPhoto: string;
  rashanCardPhoto: string;
  applicantPhoto: string;
  termCondition: boolean;
  status: string;
  document:Documents
}
export interface Documents{
  name:string,
  type:string,
  content:string
}
