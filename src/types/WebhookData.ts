export type WebhookData = {
	id: unknown; // ID платежа в нашей системе
	order_id: unknown; // ID платежа в вашей системе
	project_id: unknown; // ID вашего проекта
	amount: unknown; // Сумма платежа (начальная)
	currency: string; // Валюта платежа (начальная)
	amount_pay: unknown; // Сумма, которую оплатили
	currency_pay: string; // Валюта в которой оплатили
	paid_less: unknown; // Проверка на точную сумму. Возвращает 1 если сумма оплаты меньше, чем нужно.
	createDateTime: string; // Дата платежа в формате 2024-01-01 00:00:00
	data: unknown; // Возвращает json массив ваших данных, если они были созданы при платеже в виде {"name_1":"value_1","name_2":"value_2"}
};
