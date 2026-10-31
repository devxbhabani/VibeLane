import { supabase } from "../config/db.js";
import { cacheService } from "../services/cacheService.js";

// GET /api/admin/orders - Get all orders across all customers
export const getAllOrders = async (req, res, next) => {
	try {
		if (supabase) {
			const { data: orders, error } = await supabase
				.from("orders")
				.select("*")
				.order("created_at", { ascending: false });

			if (error) throw error;
			return res.status(200).json({ success: true, count: orders?.length || 0, orders: orders || [] });
		}

		return res.status(200).json({ success: true, count: 0, orders: [] });
	} catch (error) {
		next(error);
	}
};

// PUT /api/admin/orders/:id/status - Update order status and clear cache if applicable
export const updateOrderStatus = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { status } = req.body;

		if (!status) {
			return res.status(400).json({
				success: false,
				message: "Status field is required",
			});
		}

		if (supabase) {
			const { data: updatedOrder, error } = await supabase
				.from("orders")
				.update({
					status,
					updated_at: new Date(),
				})
				.eq("id", id)
				.select()
				.single();

			if (error) throw error;

			// Clear user order cache in Redis if cached
			if (updatedOrder?.user_id) {
				await cacheService.del(`user:orders:${updatedOrder.user_id}`);
			}

			return res.status(200).json({
				success: true,
				message: `Order status updated to '${status}' successfully`,
				order: updatedOrder,
			});
		}

		return res.status(200).json({
			success: true,
			message: `Order status updated to '${status}' (mock mode)`,
			order: { id, status },
		});
	} catch (error) {
		next(error);
	}
};

