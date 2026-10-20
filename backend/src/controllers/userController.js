import { supabase } from "../config/db.js";

//get user profile
export const getProfile = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const { data: user, error } = await supabase
			.from("users")
			.select(
				"id, name, email, phone, address, city, state, postal_code, country",
			)
			.eq("id", userId)
			.single();

		if (error) throw error;
		res.status(200).json({ success: true, user });
	} catch (error) {
		next(error);
	}
};

export const updateProfile = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const { name, phone, address, city, state, postal_code, country } =
			req.body;

		const { data: updated, error } = await supabase
			.from("users")
			.update({
				name,
				phone,
				address,
				city,
				state,
				postal_code,
				country,
				updated_at: new Date(),
			})
			.eq("id", userId)
			.select(
				"id, name, email, phone, address, city, state, postal_code, country",
			)
			.single();

		if (error) throw error;
		res.status(200).json({
			success: true,
			message: "Profile Updated successfully",
			user: updated,
		});
	} catch (error) {
		next(error);
	}
};

//get orders for specific user
export const getUserOrders = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const { data: orders, error } = await supabase
			.from("orders")
			.select("*")
			.eq("user_id", userId)
			.order("created_at", { ascending: false });

		if (error) throw error;
		res.status(200).json({ success: true, orders: orders || [] });
	} catch (error) {
		next(error);
	}
};

// create new order (called by checkout)
export const createOrder = async (req, res, next) => {
	try {
		const {
			order_ref,
			user_id,
			email,
			items,
			subtotal,
			shipping_fee,
			tax,
			total,
			payment_method,
			shipping_address,
		} = req.body;

		const { data: order, error } = await supabase
			.from("orders")
			.insert([
				{
					order_ref,
					user_id: user_id || null,
					email: email.toLowerCase(),
					items,
					subtotal,
					shipping_fee,
					tax,
					total,
					payment_method,
					shipping_address,
				},
			])
			.select()
			.single();

		if (error) throw error;

		res.status(200).json({ success: true, order });
	} catch (error) {
		next(error);
	}
};
