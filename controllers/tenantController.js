import prisma from "../prisma/client.js";

// Create a new tenant
export const createTenant = async (req, res) => {
	try {
		const { name, email, phone, leaseStart, leaseEnd } = req.body;

		if (!name || !email) {
			return res.status(400).json({ success: false, message: "'name' and 'email' are required" });
		}

		const existing = await prisma.tenant.findUnique({ where: { email } });
		if (existing) {
			return res.status(409).json({ success: false, message: "Email already in use" });
		}

		const tenant = await prisma.tenant.create({
			data: {
				name,
				email,
				phone: phone || null,
				leaseStart: leaseStart ? new Date(leaseStart) : null,
				leaseEnd: leaseEnd ? new Date(leaseEnd) : null,
			},
		});

		return res.status(201).json({ success: true, data: tenant });
	} catch (error) {
		console.error("createTenant error", error);
		return res.status(500).json({ success: false, message: "Failed to create tenant" });
	}
};

// Get all tenants
export const getTenants = async (req, res) => {
	try {
		const tenants = await prisma.tenant.findMany({ orderBy: { createdAt: "desc" } });
		return res.status(200).json({ success: true, data: tenants });
	} catch (error) {
		console.error("getTenants error", error);
		return res.status(500).json({ success: false, message: "Failed to fetch tenants" });
	}
};

// Get a single tenant by ID
export const getTenantById = async (req, res) => {
	try {
		const id = Number(req.params.id);
		if (Number.isNaN(id)) {
			return res.status(400).json({ success: false, message: "Invalid tenant id" });
		}

		const tenant = await prisma.tenant.findUnique({ where: { id } });
		if (!tenant) {
			return res.status(404).json({ success: false, message: "Tenant not found" });
		}
		return res.status(200).json({ success: true, data: tenant });
	} catch (error) {
		console.error("getTenantById error", error);
		return res.status(500).json({ success: false, message: "Failed to fetch tenant" });
	}
};

// Update a tenant
export const updateTenant = async (req, res) => {
	try {
		const id = Number(req.params.id);
		if (Number.isNaN(id)) {
			return res.status(400).json({ success: false, message: "Invalid tenant id" });
		}

		const { name, email, phone, leaseStart, leaseEnd } = req.body;

		const existing = await prisma.tenant.findUnique({ where: { id } });
		if (!existing) {
			return res.status(404).json({ success: false, message: "Tenant not found" });
		}

		// If email is changing, ensure uniqueness
		if (email && email !== existing.email) {
			const emailOwner = await prisma.tenant.findUnique({ where: { email } });
			if (emailOwner) {
				return res.status(409).json({ success: false, message: "Email already in use" });
			}
		}

		const updated = await prisma.tenant.update({
			where: { id },
			data: {
				name: typeof name === "string" ? name : existing.name,
				email: typeof email === "string" ? email : existing.email,
				phone: phone === undefined ? existing.phone : phone || null,
				leaseStart: leaseStart === undefined ? existing.leaseStart : leaseStart ? new Date(leaseStart) : null,
				leaseEnd: leaseEnd === undefined ? existing.leaseEnd : leaseEnd ? new Date(leaseEnd) : null,
			},
		});

		return res.status(200).json({ success: true, data: updated });
	} catch (error) {
		console.error("updateTenant error", error);
		return res.status(500).json({ success: false, message: "Failed to update tenant" });
	}
};

// Delete a tenant
export const deleteTenant = async (req, res) => {
	try {
		const id = Number(req.params.id);
		if (Number.isNaN(id)) {
			return res.status(400).json({ success: false, message: "Invalid tenant id" });
		}

		await prisma.tenant.delete({ where: { id } });
		return res.status(204).send();
	} catch (error) {
		if (error?.code === 'P2025') {
			return res.status(404).json({ success: false, message: "Tenant not found" });
		}
		console.error("deleteTenant error", error);
		return res.status(500).json({ success: false, message: "Failed to delete tenant" });
	}
}; 