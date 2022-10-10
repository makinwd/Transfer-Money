import { IUser } from '../types/user.interface'
import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json'
}
})

export interface ITransferMoney {
	amount:number, card:number, fromCard:number
}

export const UserService = {
	async getProfile() {
		const response = await instance.get<IUser>('/users/1')
		return response.data
	},

	async getUsers() {
		const response = await instance.get<IUser[]>('/users')
		return response.data.filter(user => user.id !== 1)
	},

	async getUserByCard(card: number) {
		const response = await instance.get<IUser>('/users/', {
			params: { card }
		})
		return response.data
	},

	async transferMoney({ amount, card, fromCard }: ITransferMoney) {
        const userFrom = await this.getUserByCard(fromCard)
        const UserTo = await this.getUserByCard(card)


        await instance.patch('/users/${userFrom.id}', {
            balance: userFrom.balance - amount
        })

        await instance.patch('/users/${userFrom.id}', {
            balance: UserTo.balance + amount
        })
	},
}
