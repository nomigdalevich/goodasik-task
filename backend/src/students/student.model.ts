
export interface studentModel
{
  id: number;              
  classId: number;         
  identityNumber: string; 
  firstName: string;       
  lastName: string;        
  parentPhone: string;    
  status: StudentStatus;   

}

export enum StudentStatus
{
    Active = 'ACTIVE',
    Inactive = 'INACTIVE',
}