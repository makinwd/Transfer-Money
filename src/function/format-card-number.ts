export const formatCardNumber = (value: any) => {
	const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g
	const onlyNumbers = (value || '').toString().replace(/[^\d]/g, '')

	return onlyNumbers.replace(regex, (regex, $1, $2, $3, $4) =>
		[$1, $2, $3, $4].filter(group => !!group).join(' ')
	)
}
