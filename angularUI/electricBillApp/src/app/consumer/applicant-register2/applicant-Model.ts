export interface Address {
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
  dob: string;
  gender: string;
  category: string;
  aadhaarCardNo: string;
  address: Address;
  aadhaarCardPhoto: string;
  rashanCardPhoto: string;
  applicantPhoto: string;
  termCondition: boolean;
  status: string;

}
