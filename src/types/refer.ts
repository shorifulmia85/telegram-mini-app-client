export interface IRefer {
  _id: string;
  referrerId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  lockedAmount: number;
  unlockedAmount?: number;
  referred: Referred;
}

export interface Referred {
  _id: string;
  firstName: string;
  lastName: string;
  photo: string;
  balance: string;
}
