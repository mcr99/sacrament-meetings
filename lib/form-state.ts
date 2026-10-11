export type State = {
  message?: string;
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    openingHymnNumber?: string[];
    openingHymnTitle?: string[];
    openingPrayer?: string[];
    sacramentHymnNumber?: string[];
    sacramentHymnTitle?: string[];
    closingHymnNumber?: string[];
    closingHymnTitle?: string[];
    closingPrayer?: string[];
    announcements?: string[];
    wardBusiness?: string[];
    stakeBusiness?: string[];
    speakers?: string[];
  };
};

export const initialState: State = {
  message: "",
  errors: {},
};
