export const formatCardNumber = (value: any) => {
	const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g
	const onlyNumbers = (value || '').toString().replace(/[^\d]/g, '')

	return onlyNumbers.replace(regex, (regex: any, $1: any, $2: any, $3: any, $4: any) =>
		[$1, $2, $3, $4].filter(group => !!group).join(' ')
	)
}
