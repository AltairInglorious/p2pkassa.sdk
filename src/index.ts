import {createHash} from "node:crypto";
import type {Invoice} from "./types/Invoice";

export class P2PKassaSDK {
	private readonly projectId: number;
	private readonly apiKey: string;

	constructor(projectId: number, apiKey: string) {
		this.projectId = projectId;
		this.apiKey = apiKey;
	}

	public async createInvoice(
		orderId: number,
		amount: number,
		currency: string,
	): Promise<Invoice> {
		const data = {
			project_id: this.projectId,
			order_id: orderId,
			amount: amount,
			currency: currency,
		};

		const joinString = `${this.apiKey}${orderId}${
			this.projectId
		}${amount.toFixed(2)}${currency}`;
		const authToken = createHash("sha512").update(joinString).digest("hex");

		const res = await fetch("https://p2pkassa.online/api/v2/link", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken}`,
			},
			body: JSON.stringify(data),
		});

		return res.json();
	}

	public async createInvoiceUuid(
		orderId: string,
		amount: number,
		currency: string,
	): Promise<Invoice> {
		const data = {
			project_id: this.projectId,
			order_id: Date.now() + Math.floor(Math.random() * 99999),
			amount: amount,
			currency: currency,
			data: JSON.stringify({
				uuid: orderId,
			})
		};

		const joinString = `${this.apiKey}${orderId}${
			this.projectId
		}${amount.toFixed(2)}${currency}`;
		const authToken = createHash("sha512").update(joinString).digest("hex");

		const res = await fetch("https://p2pkassa.online/api/v2/link", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken}`,
			},
			body: JSON.stringify(data),
		});

		return res.json();
	}

	public checkWebhook(data: any): boolean {
		if (
			!data?.sign ||
			!data?.id ||
			!data?.order_id ||
			!data?.amount ||
			Number.isNaN(data.amount) ||
			!data?.currency
		) {
			return false;
		}

		const joinString = `${this.apiKey}${data.id}${data.order_id}${
			this.projectId
		}${data.amount.toFixed(2)}${data.currency}`;
		const checkSign = createHash("sha256").update(joinString).digest("hex");

		return checkSign === data.sign;
	}
}
