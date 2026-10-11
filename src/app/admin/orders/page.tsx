'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Hammer,
  ExternalLink
} from 'lucide-react';
import { MOCK_ORDERS } from '@/data/mockData';
import { OrderRequest } from '@/types';
import { WhatsAppIcon } from '@/components/ui/Icons';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRequest[]>(MOCK_ORDERS);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleUpdateStatus = (orderId: string, newStatus: OrderRequest['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery) ||
      order.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: OrderRequest['status']) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pending',
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
        };
      case 'crafting':
        return {
          label: 'Crafting',
          bg: 'bg-purple-50 text-purple-700 border-purple-200',
        };
      case 'dispatched':
        return {
          label: 'Dispatched',
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
        };
      case 'delivered':
        return {
          label: 'Delivered',
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        };
      default:
        return {
          label: status,
          bg: 'bg-neutral-100 text-neutral-700 border-neutral-200',
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
          Customer Orders
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
          {orders.length} total festive orders and customer inquiries.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {['all', 'pending', 'crafting', 'dispatched', 'delivered'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors whitespace-nowrap cursor-pointer ${
                filterStatus === st
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-60">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, ID, city..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white border border-neutral-200 focus:border-neutral-400 outline-none text-neutral-800 placeholder:text-neutral-400"
          />
        </div>
      </div>

      {/* Orders List / Cards */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-xl p-8 text-center text-xs text-neutral-500">
            No orders match the current filter.
          </div>
        ) : (
          filteredOrders.map((order) => {
            const badge = getStatusBadge(order.status);
            const cleanPhone = order.phone.replace(/[^0-9]/g, '');

            const waMessage = encodeURIComponent(
              `Namaskar ${order.customerName}! Greetings from kalashrusti Pune. Regarding your festive order #${order.id} (${order.items.map((i) => i.product.name).join(', ')}), your order status is now: ${badge.label.toUpperCase()}. Thank you for supporting authentic handmade crafts!`
            );

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-5 shadow-2xs space-y-4 hover:border-neutral-300 transition-colors"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-neutral-100 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-neutral-900">
                      #{order.id}
                    </span>
                    <span className="text-neutral-400">•</span>
                    <span className="font-medium text-neutral-800">
                      {order.customerName}
                    </span>
                    <span className="text-neutral-500 text-[11px]">
                      ({order.city})
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${badge.bg}`}>
                      {badge.label}
                    </span>
                    <span className="text-neutral-400 text-[11px]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Items & Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Items Ordered */}
                  <div className="md:col-span-2 space-y-1.5">
                    <span className="text-[11px] text-neutral-400 font-medium uppercase tracking-wider block">
                      Items Ordered
                    </span>
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-neutral-800">
                          <span>
                            {item.quantity}x {item.product.name}
                          </span>
                          <span className="font-medium text-neutral-900">
                            ₹{item.product.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    {order.specialInstructions && (
                      <div className="mt-2 text-[11px] text-neutral-600 bg-neutral-50 p-2 rounded-lg border border-neutral-100">
                        <span className="font-semibold text-neutral-700">Note: </span>
                        {order.specialInstructions}
                      </div>
                    )}
                  </div>

                  {/* Customer Contact & Total */}
                  <div className="space-y-3 md:border-l md:border-neutral-100 md:pl-4">
                    <div>
                      <span className="text-[11px] text-neutral-400 font-medium uppercase tracking-wider block">
                        Total Amount
                      </span>
                      <span className="text-base font-bold text-neutral-900">
                        ₹{order.total.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="text-[11px] text-neutral-600 space-y-0.5">
                      <p>{order.phone}</p>
                      <p>{order.email}</p>
                    </div>
                  </div>
                </div>

                {/* Status Update & WhatsApp Notification Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-neutral-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500 text-[11px]">Update Status:</span>
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value as OrderRequest['status'])}
                      className="px-2.5 py-1 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-800 text-xs outline-none cursor-pointer"
                    >
                      <option value="pending">Pending</option>
                      <option value="crafting">Crafting</option>
                      <option value="dispatched">Dispatched</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>

                  <a
                    href={`https://wa.me/${cleanPhone}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-colors self-start sm:self-auto"
                  >
                    <WhatsAppIcon size={13} />
                    <span>Send WhatsApp Update</span>
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
