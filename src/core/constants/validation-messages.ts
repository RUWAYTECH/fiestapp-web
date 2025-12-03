export const validationMessages = {
	string: 'Por favor, introduce un valor de texto válido.',
	number: 'Por favor, introduce un número válido.',
	date: 'Por favor, introduce una fecha válida.',
	required: 'Este campo es obligatorio.',
	email: 'Por favor, introduce una dirección de correo electrónico válida.',
	integer: 'Por favor, introduce un número entero válido.',
	url: 'Por favor, introduce una URL válida.',
	minLength: (min: number) => `Por favor, introduce al menos ${min} caracteres.`,
	maxLength: (max: number) => `Por favor, no introduzcas más de ${max} caracteres.`,
	minValue: (min: number) => `El valor debe ser al menos ${min}.`,
	maxValue: (max: number) => `El valor no debe ser mayor que ${max}.`,
	dateLessThan: (date: string) => `La fecha debe ser igual o posterior a ${date}.`,
	passwordMismatch: 'Las contraseñas no coinciden.',
	password:
		'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.'
};

export const messages = {
	invalidCredentials: 'Credenciales inválidas. Por favor, inténtalo de nuevo.',
	errorLogin: 'Ocurrió un error durante el inicio de sesión. Por favor, inténtalo más tarde.'
};
