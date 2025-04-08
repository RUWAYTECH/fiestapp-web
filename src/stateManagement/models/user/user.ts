export interface CreateUserRequestDto {
    firstName: string,
    lastName: string,
    email: string,
}
export interface UserResponseDto {
	id: string,
	documentId: string,
    firstName: string,
    lastName: string,
    email: string,
}