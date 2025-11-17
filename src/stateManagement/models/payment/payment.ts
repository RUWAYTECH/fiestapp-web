export interface CreatePaymentReqDto {
	// amount: string,
	// request_service: string,
	transferNumber: string,
	paymentImage: [],

}

export interface PaymentResponse {
  data: PaymentResDto;
}

export interface PaymentResDto {
  id: number;
  documentId: string;
  amount: number;
  paymentDate: string;
  request_service: RequestService;
}

export interface RequestService {
  id: number;
  documentId: string;
  message: string;
  totalPrice: number;
  registerDate: string;
  entityStatus: string;
  provider: Provider;
  user: BasicEntity;
  numberInvite: number;
  approximateBudget: number;
  totalPriceFinal: number;
  service_payments: ServicePayment[];
}

export interface Provider {
  id: number;
  documentId: string;
  name: string;
  description: string;
  address: string;
  email: string;
  isActive: boolean;
  user: User;
  facebookUrl: string;
  website: string;
  phone: number;
  businessAddress: string;
  instagramUrl: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: BasicEntity;
  updatedBy: BasicEntity;
  locale: string;
  localizations: BasicEntity[];
}

export interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  resetPasswordToken: string;
  confirmationToken: string;
  confirmed: boolean;
  blocked: boolean;
  role: Role;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: BasicEntity;
  updatedBy: BasicEntity;
  locale: string;
  localizations: BasicEntity[];
}

export interface Role {
  id: number;
  documentId: string;
  name: string;
  description: string;
  type: string;
  permissions: Permission[];
  users: BasicEntity[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: BasicEntity;
  updatedBy: BasicEntity;
  locale: string;
  localizations: BasicEntity[];
}

export interface Permission {
  id: number;
  documentId: string;
  action: string;
  role: BasicEntity;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: UserExtended;
  updatedBy: BasicEntity;
  locale: string;
  localizations: BasicEntity[];
}

export interface UserExtended extends BasicEntity {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  resetPasswordToken: string;
  registrationToken: string;
  isActive: boolean;
  roles: RoleExtended[];
  blocked: boolean;
  preferedLanguage: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: BasicEntity;
  updatedBy: BasicEntity;
  locale: string;
  localizations: BasicEntity[];
}

export interface RoleExtended extends BasicEntity {
  name: string;
  code: string;
  description: string;
  users: BasicEntity[];
  permissions: ExtendedPermission[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: BasicEntity;
  updatedBy: BasicEntity;
  locale: string;
  localizations: BasicEntity[];
}

export interface ExtendedPermission extends Permission {
  actionParameters: string;
  subject: string;
  properties: string;
  conditions: string;
}

export interface ServicePayment {
  id: number;
  documentId: string;
  amount: number;
  paymentDate: string;
  request_service: BasicEntity;
  transferNumber: number;
  paymentImage: MediaFile[];
}

export interface MediaFile {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: string;
  related: BasicEntity[];
  folder: Folder;
  folderPath: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Folder {
  id: number;
  documentId: string;
  name: string;
  pathId: number;
  parent: BasicEntity;
  children: BasicEntity[];
  files: MediaFile[];
}

export interface BasicEntity {
  id: number;
  documentId: string;
}