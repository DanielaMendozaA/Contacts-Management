export interface IContactDevice {
    phoneNumbers: PhoneNumber[];
    isStarred: boolean;
    postalAddresses: PostalAddress[];
    thumbnailPath: string;
    department: string;
    jobTitle: string;
    emailAddresses: EmailAddress[];
    urlAddresses: UrlAddress[];
    suffix: string | null;
    company: string;
    imAddresses: ImAddress[];
    note: string | null;
    middleName: string;
    displayName: string;
    familyName: string;
    givenName: string;
    prefix: string | null;
    hasThumbnail: boolean;
    rawContactId: string;
    recordID: string;
  }
  
  interface PhoneNumber {
    id: string;
    label: string;
    number: string;
  }
  
  interface PostalAddress {
    // Define properties if needed
  }
  
  interface EmailAddress {
    id: string;
    label: string;
    email: string;
  }
  
  interface UrlAddress {
    id: string;
    url: string;
  }
  
  interface ImAddress {
    // Define properties if needed
  }
  