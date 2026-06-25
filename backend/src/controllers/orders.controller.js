const { ProductsInOrderServices } = require('../services');

const getAllOrders = async (req, res, next) => {
  try {
    if (!req.user || req.user.roleId !== 1) return res.status(403).json({ message: 'Not allowed' });
    const result = await ProductsInOrderServices.getAllOrders();
    res.status(200).json(result);
  } catch (error) {
    next({ status: 400, message: error.message, errorContent: error });
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    if (!req.user || req.user.roleId !== 1) return res.status(403).json({ message: 'Not allowed' });
    const { id } = req.params;
    const { status } = req.body;
    const result = await ProductsInOrderServices.updateOrderStatus(id, status);
    // Emit real-time update via socket.io
    const io = req.app.get('io');
    if (io && result && result.userId) {
      io.emit('orderStatusUpdated', { orderId: result.id, status: result.status, userId: result.userId });
    }
    res.status(200).json(result);
  } catch (error) {
    next({ status: 400, message: error.message, errorContent: error });
  }
};

module.exports = { getAllOrders, updateOrderStatus };
