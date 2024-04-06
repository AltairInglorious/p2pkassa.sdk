export type WebhookData = {
	id: string; // ID платежа в нашей системе
	order_id: string; // ID платежа в вашей системе
	project_id: string; // ID вашего проекта
	amount: string; // Сумма платежа (начальная) "100.00"
	currency: string; // Валюта платежа (начальная)
	amount_pay: string; // Сумма, которую оплатили "104.00"
	currency_pay: string; // Валюта в которой оплатили
	paid_less: 1 | null; // Проверка на точную сумму. Возвращает 1 если сумма оплаты меньше, чем нужно.
	createDateTime: string; // Дата платежа в формате "2024-01-01 00:00:00"
	data: unknown; // Возвращает json ваших данных в виде {"name_1":"value_1","name_2":"value_2"}
};
